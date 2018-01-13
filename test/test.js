const chai = require('chai')
const expect = chai.expect

const { getMaterialUsage } = require('../src/functions/amountCalculation')

console.log(getMaterialUsage)

describe('Unit tests', () => {
  let usedMaterialAluminium,
    usedMaterialProvare,
    materials,
    materialsMap,
    compositeMaterials,
    compositeMaterialsComputation,
    materialsComputation,
    materialsMapComputation,
    usedMaterialsComputation

  beforeEach(async () => {
    usedMaterialAluminium = require('./test-data/data').usedMaterialAluminium
    usedMaterialProvare = require('./test-data/data').usedMaterialProvare
    compositeMaterials = require('./test-data/data').compositeMaterials
    materials = require('./test-data/data').materials
    materialsMap = require('./test-data/data').materialsMap

    compositeMaterialsComputation = require('./test-data/data-material-computation').compositeMaterialsComputation
    materialsComputation = require('./test-data/data-material-computation').materialsComputation
    materialsMapComputation = require('./test-data/data-material-computation').materialsMapComputation
    usedMaterialsComputation = require('./test-data/data-material-computation').usedMaterialsComputation
  })

  it('should should compute correct with a mix of raw-material and composite-material', () => {
    const materialUsage = getMaterialUsage([usedMaterialAluminium, usedMaterialProvare], materials, compositeMaterials, materialsMap)
    expect(materialUsage.Aluminium['Ej återvunnet/återanvänt']).to.equal(8)
    expect(materialUsage.Betong['Miljöcertifierat (FSC eller Svanen)']).to.equal(2500)
    expect(materialUsage.Cellplast['Ej återvunnet/återanvänt']).to.equal(0)
    expect(materialUsage.Koppar['Återvunnet/återanvänt']).to.equal(8960)
  })
  it('should not produce any amount', () => {
    let newUsedMaterialAluminium = { ...usedMaterialAluminium }
    newUsedMaterialAluminium.amount = 0
    const materialUsage = getMaterialUsage(
      [newUsedMaterialAluminium, newUsedMaterialAluminium, newUsedMaterialAluminium],
      materials,
      compositeMaterials,
      materialsMap
      )
    expect(materialUsage.Aluminium['Ej återvunnet/återanvänt']).to.equal(0)
  })
  it('should compute correct with a simple composite-material', () => {
    usedMaterialProvare.amount = 10
    const materialUsage = getMaterialUsage([usedMaterialProvare], materials, compositeMaterials, materialsMap)
    expect(materialUsage.Betong['Miljöcertifierat (FSC eller Svanen)']).to.equal(25000)
    expect(materialUsage.Cellplast['Ej återvunnet/återanvänt']).to.equal(0)
    expect(materialUsage.Koppar['Återvunnet/återanvänt']).to.equal(89600)
  })
  it('should compute material-usage for a composite-material', () => {
    usedMaterialProvare.amount = 1

    compositeMaterials[7].composite_has_materials[0].amount = 5
    compositeMaterials[7].composite_has_materials[1].amount = 1000
    compositeMaterials[7].composite_has_materials[2].amount = 3
    const materialUsage = getMaterialUsage([usedMaterialProvare], materials, compositeMaterials, materialsMap)

    expect(materialUsage.Betong['Miljöcertifierat (FSC eller Svanen)']).to.equal(2500 * 5)
    expect(materialUsage.Cellplast['Ej återvunnet/återanvänt']).to.equal(20)
    expect(materialUsage.Koppar['Återvunnet/återanvänt']).to.equal(8960 * 3)
  })
  it('should compute correct result with three composite materials', () => {
    usedMaterialProvare.amount = 1

    compositeMaterials[7].composite_has_materials[0].amount = 5
    compositeMaterials[7].composite_has_materials[1].amount = 1000
    compositeMaterials[7].composite_has_materials[2].amount = 3
    const materialUsage = getMaterialUsage([usedMaterialProvare, usedMaterialProvare, usedMaterialProvare], materials, compositeMaterials, materialsMap)

    expect(materialUsage.Betong['Miljöcertifierat (FSC eller Svanen)']).to.equal(2500 * 5 * 3)
    expect(materialUsage.Cellplast['Ej återvunnet/återanvänt']).to.equal(20 * 3)
    expect(materialUsage.Koppar['Återvunnet/återanvänt']).to.equal(8960 * 3 * 3)
  })
  it('should compute correct result when given a complex input', () => {
    const materialUsage = getMaterialUsage(usedMaterialsComputation, materialsComputation, compositeMaterialsComputation, materialsMapComputation)

    expect(materialUsage.Aluminium['Återvunnet/återanvänt']).to.equal(2700)
    expect(materialUsage.Aluminium['Miljöcertifierat (FCS eller Svanen)']).to.equal(2700)
    expect(materialUsage.Aluminium['Ej återvunnet/återanvänt']).to.equal(2700)
    expect(materialUsage.Aluminium['Vet Ej']).to.equal(2700)

    expect(materialUsage.Gips['Återvunnet/återanvänt']).to.equal(650)
    expect(materialUsage.Gips['Miljöcertifierat (FCS eller Svanen)']).to.equal(7800)
    expect(materialUsage.Gips['Ej återvunnet/återanvänt']).to.equal(1)

    expect(materialUsage.Trä['Återvunnet/återanvänt']).to.equal(6)
    expect(materialUsage.Trä['Miljöcertifierat (FCS eller Svanen)']).to.equal(7)
    expect(materialUsage.Trä['Ej återvunnet/återanvänt']).to.equal(6)
    expect(materialUsage.Trä['Vet Ej']).to.equal(6)

    expect(materialUsage.Betong['Ej återvunnet/återanvänt']).to.equal(5000)
    expect(materialUsage.Betong['Vet Ej']).to.equal(1)

    expect(materialUsage.Glas['Återvunnet/återanvänt']).to.equal(1)
    expect(materialUsage.Glas['Miljöcertifierat (FCS eller Svanen)']).to.equal(2510)

    expect(materialUsage.Armering['Ej återvunnet/återanvänt']).to.equal(7800)

    expect(materialUsage.Stenull['Miljöcertifierat (FCS eller Svanen)']).to.equal(90)

    expect(materialUsage.Cellplast['Vet Ej']).to.equal(20)
  })

  it('Formats all used-materials into an array of arrays', () => {
    const materialUsage = getMaterialUsage(usedMaterialsComputation, materialsComputation, compositeMaterialsComputation, materialsMapComputation)
    const { formatToExcel } = require('../src/spreadsheet-utils/formatToExcel')

    const output = formatToExcel('All', materialUsage)
  })
})
