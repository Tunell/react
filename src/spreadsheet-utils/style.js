module.exports = {
  header: {
    font: { size: 20, bold: true },
    height: 40
  },
  subHeader: {
    font: { size: 16, bold: true },
    height: 30
  },
  tableHeader: {
    font: {
      name: 'Arial',
      color: { argb: 'FFFFFFFF' },
      family: 2,
      size: 10,
      bold: true
    },
    fill: {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'00495163'},
    },
    alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
    width: 30,
    height: 40
  },
  tableBodyLight: {
    font: {
      name: 'Arial',
      color: { argb: '00000000' },
      size: 9.3,
      bold: false
    },
    fill: {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'00FFFFFF'},
    },
    numFmt: '#,##0',
    border: {
      top: {style:'thin', color: {argb:'00D9D9D9'}},
      left: {style:'thin', color: {argb:'00D9D9D9'}},
      bottom: {style:'thin', color: {argb:'00D9D9D9'}},
      right: {style:'thin', color: {argb:'00D9D9D9'}}
    }
  },
  tableBodyDark: {
    font: {
      name: 'Arial',
      color: { argb: '00000000' },
      size: 9.3,
      bold: false
    },
    fill: {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'00D9D9D9'},
    },
    numFmt: '#,##0',
  },
  tableFooter: {
    font: {
      name: 'Arial',
      color: { argb: '00000000' },
      family: 2,
      size: 11,
      bold: true
    },
    fill: {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'00A6A6A6'},
    },
    width: 30,
    height: 30,
    numFmt: '#,##0',
  },
}