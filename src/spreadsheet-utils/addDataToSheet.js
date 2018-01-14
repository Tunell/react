const style = require('./style')

const addHeaderToSheet = (sheet, projectName) => {
  sheet.getCell('A1').value = `Plant - redovisning av använt material  -  projekt ${projectName}`
  sheet.getCell('A1').font = style.header.font
  sheet.getRow(1).height = style.header.height
}

const styleTableBody = (sheet, data) => {
  // -1 because of table-header
  const numberOfRowsTableBody = data.length - 1
  const numberOfColumns = data[0].length;

  // Set column widths
  sheet.getColumn(1).width = 16
  sheet.getColumn(2).width = 16
  sheet.getColumn(3).width = 16
  sheet.getColumn(4).width = 16
  sheet.getColumn(5).width = 16
  sheet.getColumn(6).width = 16

  // Style header
  sheet.getRow(6).height = style.tableHeader.height;
  [...Array(numberOfColumns)].forEach((_, j) => {
    sheet.getRow(6).getCell(j+1).fill = style.tableHeader.fill
    sheet.getRow(6).getCell(j+1).font = style.tableHeader.font
    sheet.getRow(6).getCell(j+1).alignment = style.tableHeader.alignment
  });

  [...Array(numberOfRowsTableBody)].forEach((_, i) => {
    if(i === numberOfRowsTableBody -1) {
      console.log(i, 'footer');
      [...Array(numberOfColumns)].forEach((_, j) => {
        sheet.getRow(i + 7).getCell(j+1).fill = style.tableFooter.fill
        sheet.getRow(i + 7).getCell(j+1).font = style.tableFooter.font
        sheet.getRow(i + 7).getCell(j+1).numFmt = style.tableFooter.numFmt
      })
      return
    }

    if(i % 2) {
      [...Array(numberOfColumns)].forEach((_, j) => {
        console.log(i, 'dark')
        sheet.getRow(i + 7).getCell(j+1).fill = style.tableBodyDark.fill
        sheet.getRow(i + 7).getCell(j+1).font = style.tableBodyDark.font
        sheet.getRow(i + 7).getCell(j+1).numFmt = style.tableBodyDark.numFmt
      })
    }
    else {
      [...Array(numberOfColumns)].forEach((_, j) => {
        console.log(i, 'light')
        sheet.getRow(i + 7).getCell(j+1).fill = style.tableBodyLight.fill
        sheet.getRow(i + 7).getCell(j+1).font = style.tableBodyLight.font
        sheet.getRow(i + 7).getCell(j+1).numFmt = style.tableBodyLight.numFmt
        sheet.getRow(i + 7).getCell(j+1).border = style.tableBodyLight.border
      })
    }
  })
}

const addBtaValueToMaterialUsage = (BTAValue, materialUsage) => {
  return materialUsage.map(row => {
    if(row[0] === 'Material') return [...row, 'BTA']
    const [materialName, ...values] = row
    return [ materialName, ...values.map(usage => usage / BTAValue), BTAValue]
  })
}

const addSummary = (sheet, projectName, materialUsage) => {
  addHeaderToSheet(sheet, projectName)

  sheet.getCell('A4').value = 'Totalt använt material i kg'
  sheet.getCell('A4').font = style.subHeader.font
  sheet.getRow(4).height = style.subHeader.height

  sheet.getRow(5)
  sheet.addRows(materialUsage)
  styleTableBody(sheet, materialUsage)
}

const addPerBTA = (sheet, projectName, materialUsage, BTAValue) => {
  const materialUsageWithBTA = addBtaValueToMaterialUsage(BTAValue, materialUsage)

  addHeaderToSheet(sheet, projectName)
  sheet.getCell('A4').value = 'Totalt använt material i kg Per BTA'
  sheet.getCell('A4').font = style.subHeader.font
  sheet.getRow(4).height = style.subHeader.height

  sheet.getRow(5)
  sheet.addRows(materialUsageWithBTA)
  styleTableBody(sheet, materialUsageWithBTA)
}

const addContractor = (sheet, contractor, materialUsageContractor) => {
  sheet.getCell('A1').value = contractor
  sheet.getCell('A1').font = style.header.font
  sheet.getRow(1).height = style.header.height

  sheet.getCell('A4').value = 'Totalt använt material i kg'
  sheet.getCell('A4').font = style.subHeader.font
  sheet.getRow(4).height = style.subHeader.height

  sheet.getRow(5)
  sheet.addRows(materialUsageContractor)
  styleTableBody(sheet, materialUsageContractor)
}

module.exports = {
 addSummary,
 addPerBTA,
  addContractor
}
