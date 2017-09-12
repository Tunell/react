const chai = require('chai')
const expect = chai.expect

const { getMaterialUsage } = require('../src/functions/amountCalculation')

console.log(getMaterialUsage)

describe('Unit tests', () => {
  let usedMaterialAluminium,
    usedMaterialProvare,
    materials,
    materialsMap,
    compositeMaterials

  beforeEach(async () => {
    usedMaterialAluminium = require('./test-data/data').usedMaterialAluminium
    usedMaterialProvare = require('./test-data/data').usedMaterialProvare
    compositeMaterials = require('./test-data/data').compositeMaterials
    materials = require('./test-data/data').materials
    materialsMap = require('./test-data/data').materialsMap
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
})
