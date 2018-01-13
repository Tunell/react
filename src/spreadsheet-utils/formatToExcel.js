exports.formatToExcel = (contractor, materialUsage) => {
  const tableHeader = [
    'Material',
    'Ej återvunnen/återbrukad/vet ej',
    'Miljöcertifierat (FSC eller Svanen)',
    'Återbrukat',
    'Återvunnen',
    'Summa',
  ]

  let sumNotRecycled = 0
  let sumEnvironmentCertified = 0
  let sumReUsed = 0
  let sumRecycled = 0
  const rows = Object.entries(materialUsage).map(([materialName, usage]) => {
    const {
      ['Ej återvunnen/återbrukad/vet ej']: notRecycledAmount = 0,
      ['Miljöcertifierat (FCS eller Svanen)']: environmentCertifiedAmount = 0,
      ['Återvunnet/återanvänt']: reUsedAmount = 0,
      ['Återvunnen']: recycledAmount = 0
    } = usage
    const sum = notRecycledAmount + environmentCertifiedAmount + reUsedAmount + recycledAmount

    sumNotRecycled += notRecycledAmount
    sumEnvironmentCertified += environmentCertifiedAmount
    sumReUsed += reUsedAmount
    sumRecycled += recycledAmount

    return [materialName, notRecycledAmount, environmentCertifiedAmount, reUsedAmount, recycledAmount, sum]
  })

  const tableFooter = [
    '',
    sumNotRecycled,
    sumEnvironmentCertified,
    sumReUsed,
    sumRecycled,
    (sumRecycled + sumEnvironmentCertified + sumReUsed + sumRecycled)
  ]

  return {
    contractor,
    tableData: [
      tableHeader,
      ...rows,
      tableFooter
    ]
  }
}

