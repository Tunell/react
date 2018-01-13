process.env.NODE_ENV = 'test'
const {createAndFillSpreadsheet} = require("../../src/spreadsheet-utils/createExcelExport")

const {getMaterialUsage} = require("./../../src/functions/amountCalculation")
const { formatToExcel } = require('../../src/spreadsheet-utils/formatToExcel')

const compositeMaterialsComputation = require('./../test-data/data-material-computation').compositeMaterialsComputation
const materialsComputation = require('./../test-data/data-material-computation').materialsComputation
const materialsMapComputation = require('./../test-data/data-material-computation').materialsMapComputation
const usedMaterialsComputation = require('./../test-data/data-material-computation').usedMaterialsComputation

const run = async () => {
  const materialUsage = getMaterialUsage(usedMaterialsComputation, materialsComputation, compositeMaterialsComputation, materialsMapComputation)

  const { tableData: output } = formatToExcel('All', materialUsage)

  const spreadSheet = await createAndFillSpreadsheet(output)

  spreadSheet.xlsx.writeFile('test-sheet.xlsx')
  .then(function() {
    console.log('xlsx file written to disk')
  });
}

run().then(() => {
    console.log()
}
)

