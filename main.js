function onEdit(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() !== "results") return;

  const editedColumn = e.range.getColumn();
  const editedRow = e.range.getRow();

  if (editedColumn !== 3) return;

  addRowMetaData(sheet.getName(), editedRow);
}


function addRowMetaData(sheetName, rowNumber) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  const rowValues = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()).getValues()[0];

  if (isNotFormattedRow(rowValues)) {
    sheet.getRange(rowNumber, 1).setValue(incrementID(sheet, rowNumber));
    sheet.getRange(rowNumber, 2).setValue(currrentTime());
    // copyDataValidation(sheet, rowNumber); 
  }
}

function isNotFormattedRow(row) {
  // A列 = IDが空の場合
  return row[0] == "";
}

function incrementID(sheet, rowNumber) {
  const prevID = sheet.getRange(rowNumber - 1, 1).getValue(); // 指定行の1つ上のA列 = ID
  return (prevID || 0) + 1;
}

function currrentTime() {
  const date = new Date();
  return Utilities.formatDate(date, 'JST', 'yyyy/MM/dd HH:mm:ss');
}

function copyDataValidationAndFormat(sheet, fromRow, toRow) {
  const fromRange = sheet.getRange(fromRow, 3, 1, 4); // C〜F列
  const toRange = sheet.getRange(toRow, 3, 1, 4);

  // 入力規則をコピー
  toRange.setDataValidations(fromRange.getDataValidations());

  // 書式（フォント・背景色など）をコピー
  fromRange.copyFormatToRange(sheet, 3, 6, toRow, toRow);
}
