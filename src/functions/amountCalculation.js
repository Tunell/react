// Makes sure m3 and L is converted into kilo
const getAmountInKg = (material, materialsMap) => {
  return material.unit_name === 'm3'
    ? material.amount * materialsMap[material.material_id].kg_per_m3
    : material.unit_name === 'L'
      ? material.amount * materialsMap[material.material_id].kg_per_m3 * 0.001
      : material.amount
}

const getMaterialUsage = (usedMaterials, materials, compositeMaterials, materialsMap) => {
  return usedMaterials.reduce((allUsedMaterials, usedMaterial) => {
    const compMaterial = compositeMaterials.filter(filterMaterial=> filterMaterial.id === usedMaterial.used_has_material_id)[0];

    if (compMaterial && usedMaterial.material_type_id === 2) {
      //This is a composite-material, loop through child materials.
      compMaterial.composite_has_materials.map(rawMaterial => {
        const materialName = rawMaterial.material_name;
        const recycleName = rawMaterial.recycle_type_name;

        // Make sure m3 and L is converted into kilo
        const rawMaterialAmount = getAmountInKg(rawMaterial, materialsMap)

        if (materialName in allUsedMaterials) {
          if (recycleName in allUsedMaterials[materialName]) {
            allUsedMaterials[materialName][recycleName] += Math.round(usedMaterial.amount * rawMaterialAmount);
          }
          else {
            allUsedMaterials[materialName][recycleName] = Math.round(usedMaterial.amount * rawMaterialAmount);
          }
        }
        else {
          allUsedMaterials[materialName] = {[recycleName]: Math.round(usedMaterial.amount * rawMaterialAmount)};
        }
      });
    } else if (usedMaterial.material_type_id === 1) {
      //This is a material
      const materialName = usedMaterial.used_has_material_name;
      const recycleName = usedMaterial.recycle_type_name;
      const usedMaterialAmount = getAmountInKg(usedMaterial, materialsMap)

      if (materialName in allUsedMaterials) {
        if (recycleName in allUsedMaterials[materialName]) {
          allUsedMaterials[materialName][recycleName] += usedMaterialAmount;
        }
        else {
          allUsedMaterials[materialName][recycleName] = usedMaterialAmount;
        }
      }
      else {
        allUsedMaterials[materialName] = {[recycleName]: usedMaterialAmount};
      }
    }else{
      console.log(usedMaterials)
      console.log(materialsMap)
      console.error("Material dosen't exist:");
    }
    return allUsedMaterials;
  }, {});
}

module.exports = { getMaterialUsage }