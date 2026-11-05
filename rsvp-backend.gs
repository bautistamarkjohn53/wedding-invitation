// Google Apps Script backend for the wedding RSVP form.
//
// SETUP (one time):
// 1. Open https://script.google.com -> New project.
// 2. Replace the default code with this file, then Save.
// 3. Run the function "setupRsvpSheet" once and authorize it.
//    (This creates the header row if the spreadsheet is empty.)
// 4. Deploy > New deployment > Web app:
//      Description: Wedding RSVP
//      Execute as: Me
//      Who has access: Anyone
// 5. Copy the /exec Web app URL and paste it into RSVP_ENDPOINT in script.js.
// 6. If you ever change the code, Deploy > Manage deployments > Edit > Version: New version.
//
// The spreadsheet must be editable by the Google account running this script.

var SHEET_ID = '1MhmxGjHO6LG8vQNo7vw3KJc2kR4uUw6jl3oNxdbXg_k';
// Leave empty to use the first tab (gid=0). Or set the exact tab name, e.g. 'RSVP'.
var SHEET_NAME = '';
var HEADERS = ['Full Name', 'Will you attent?', 'Number of guests', 'Messages'];

var YES = "Yes, I'll be there";
var NO = "No, I can't make it";

function getRsvpSheet_() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
  if (!sheet) throw new Error('RSVP sheet tab not found');
  return sheet;
}

function ensureRsvpSheet_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

// Run this once from the Apps Script editor to create/verify the headers.
function setupRsvpSheet() {
  var sheet = getRsvpSheet_();
  ensureRsvpSheet_(sheet);
  return sheet.getName();
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function parseRequest_(e) {
  if (e && e.parameter && e.parameter.name) return e.parameter;

  var raw = (e && e.postData && e.postData.contents) || '{}';
  try {
    return JSON.parse(raw);
  } catch (err) {
    // Fallback for application/x-www-form-urlencoded submissions.
    var params = {};
    raw.split('&').forEach(function (pair) {
      if (!pair) return;
      var parts = pair.split('=');
      params[decodeURIComponent(parts[0])] = decodeURIComponent((parts[1] || '').replace(/\+/g, ' '));
    });
    return params;
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  var locked = false;

  try {
    var data = parseRequest_(e);
    var name = String(data.name || '').trim();
    var attendance = String(data.attendance || '').trim();
    var guests = parseInt(data.guests, 10) || 0;
    var message = String(data.message || '').trim();

    if (!name || name.length > 100) throw new Error('Invalid name');
    if (attendance !== YES && attendance !== NO) throw new Error('Invalid attendance');
    if (attendance === YES && (guests < 1 || guests > 10)) throw new Error('Invalid guest count');
    if (attendance === NO) guests = 0;
    if (message.length > 500) throw new Error('Message too long');

    lock.waitLock(10000);
    locked = true;

    var sheet = getRsvpSheet_();
    ensureRsvpSheet_(sheet);
    sheet.appendRow([name, attendance, guests, message]);

    return json_({ result: 'success' });
  } catch (err) {
    return json_({ result: 'error', message: err.message });
  } finally {
    if (locked) lock.releaseLock();
  }
}

function doGet() {
  return json_({ result: 'ok', message: 'Wedding RSVP endpoint is running.' });
}
