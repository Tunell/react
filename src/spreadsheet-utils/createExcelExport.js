const Excel = process.env.NODE_ENV === 'test'
  ? require('exceljs')
  : require('exceljs/dist/exceljs.min.js')

const spreadSheetUtils = require('./addDataToSheet')

const createAndFillSpreadsheet = (materialUsageAll) => {
  var externalWorkbook = new Excel.Workbook();
  return externalWorkbook.xlsx.readFile('../../test/excel-export-tester/Plant.xlsx')
    .then(function(extWorkbook) {
      extWorkbook.creator = 'Plant';
      extWorkbook.created = new Date();
      extWorkbook.modified = new Date();
      extWorkbook.lastPrinted = new Date();

      extWorkbook.removeWorksheet('Kommentarer')
      extWorkbook.removeWorksheet('Första sidan')

      const sheetSummary = extWorkbook.addWorksheet('Sammanställning')
      spreadSheetUtils.addSummary(sheetSummary, 'HUBBEN', materialUsageAll)

      const sheetBTA = extWorkbook.addWorksheet('Per BTA-yta')
      spreadSheetUtils.addPerBTA(sheetBTA, 'HUBBEN', materialUsageAll)

      return extWorkbook
    });
}

module.exports = { createAndFillSpreadsheet }