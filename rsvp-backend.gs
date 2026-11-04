// Google Apps Script backend for the wedding RSVP form.
// 1. Open https://script.google.com -> New project.
// 2. Paste this file, then Save.
// 3. Deploy > New deployment > Web app:
//      Execute as: Me
//      Who has access: Anyone
// 4. Authorize, then copy the /exec URL.
// 5. Paste that URL into RSVP_ENDPOINT in script.js.

var SHEET_ID = '1MhmxGjHO6LG8vQNo7vw3KJc2kR4uUw6jl3oNxdbXg_k';
// Leave empty to use the first tab (gid=0). Or set the tab name, e.g. 'RSVP'.
var SHEET_NAME = '';
var HEADERS = ['Full Name', 'Will you attent?', 'Number of guests', 'Messages'];

function getRsvpSheet_() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  return SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  var locked = false;

  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var name = String(data.name || '').trim();
    var attendance = String(data.attendance || '').trim();
    var guests = parseInt(data.guests, 10) || 0;
    var message = String(data.message || '').trim();

    if (!name || name.length > 100) throw new Error('Invalid name');
    if (attendance !== "Yes, I'll be there" && attendance !== "No, I can't make it") {
      throw new Error('Invalid attendance');
    }
    if (attendance === "Yes, I'll be there" && (guests < 1 || guests > 10)) {
      throw new Error('Invalid guest count');
    }
    if (message.length > 500) throw new Error('Message too long');

    lock.waitLock(10000);
    locked = true;

    var sheet = getRsvpSheet_();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }
    sheet.appendRow([name, attendance, guests, message]);

    return json_({ result: 'success' });
  } catch (err) {
    return json_({ result: 'error', message: err.message });
  } finally {
    if (locked) lock.releaseLock();
  }
}

function doGet() {
  return json_({ result: 'ok' });
}
