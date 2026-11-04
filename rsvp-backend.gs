// Google Apps Script backend for the wedding RSVP form.
// Paste this into https://script.google.com -> New project -> save,
// then Deploy > New deployment > Web app:
//   Execute as: Me
//   Who has access: Anyone
// Copy the deployment URL and paste it into RSVP_ENDPOINT in script.js.

var SHEET_ID = '1MhmxGjHO6LG8vQNo7vw3KJc2kR4uUw6jl3oNxdbXg_k';
// Leave empty to use the first tab. Or set the tab name, e.g. 'RSVP'.
var SHEET_NAME = '';

function getRsvpSheet_() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  return SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
}

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var name = String(data.name || '').trim();
    var attendance = String(data.attendance || '').trim();
    var guests = String(data.guests || '').trim();
    var message = String(data.message || '').trim();

    if (!name) throw new Error('Name is required');

    var sheet = getRsvpSheet_();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Attendance', 'Guests', 'Message']);
    }
    sheet.appendRow([new Date(), name, attendance, guests, message]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
