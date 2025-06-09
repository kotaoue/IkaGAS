function addRowMetaData() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("results");
  const lastRowNo = sheet.getLastRow();
  const lastRow = sheet.getRange(lastRowNo, 1, 1, sheet.getLastColumn()).getValues()[0];

  if (isNotFormattedRow(lastRow)) {
    sheet.getRange(lastRowNo, 1).setValue(maxID(sheet) + 1);
    sheet.getRange(lastRowNo, 2).setValue(currrentTime());
    // 上手く入力規則がコピーできないのでコメントアウト
    // copyDataValidation(sheet);
  }
}

function isNotFormattedRow(row) {
  // A列 = IDが空の場合
  return row[0] == "";
}

function maxID(sheet) {
  return sheet.getRange(sheet.getLastRow() - 1, 1).getValue();
}

function currrentTime() {
  const date = new Date();
  return Utilities.formatDate(date, 'JST', 'yyyy/MM/dd HH:mm:ss');
}

function copyDataValidation(sheet) {
  // 以下のコードでやると入力規則だけがコピーされて。項目ごとのカラーなどがコピーされない
  // https://developers.google.com/apps-script/reference/spreadsheet/data-validation?hl=ja
  const rule = sheet.getRange(2, 3, 1, 4).getDataValidations();
  sheet.getRange(3, 3, 1, 4).setDataValidations(rule);
}
