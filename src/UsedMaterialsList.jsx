import React from "react";
import {connect} from "react-redux";
import CSSModules from "react-css-modules";
import * as styles from "./UsedMaterialsList.less";

type Props = {
	usedMaterials: object,
	compositeMaterials: object
};

const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
  }, {})

// Makes sure m3 and L is converted into kilo
const getAmountInKg = (material, materialsMap) => {
  return material.unit_name === 'm3'
    ? material.amount * materialsMap[material.material_id].kg_per_m3
    : material.unit_name === 'L'
      ? material.amount * materialsMap[material.material_id].kg_per_m3 * 0.001
      : material.amount
}

function mapStateToProps(state, ownProps) {
	return {
		usedMaterials: state.resources.usedMaterials.json,
		compositeMaterials: state.resources.compositeMaterials.json,
		materials: state.resources.materials.json,
		recycleTypes: state.resources.recycleTypes.json,
	};
}

@connect(mapStateToProps)
@CSSModules(styles)
export default class UsedMaterialsList extends React.Component {
	props: Props;

	state = {
		materialUsage: {}
	};

	componentDidMount() {
		const {usedMaterials, compositeMaterials, materials} = this.props;
		const materialsMap = arrayToObject(materials, 'id')
		const materialUsage = usedMaterials.reduce((allUsedMaterials, usedMaterial) => {
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
      } else if (materials.filter(filterMaterial=> filterMaterial.id === usedMaterial.used_has_material_id)[0]){
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
        console.error("Material dosen't exist: ");
        throw(e);
      }
      return allUsedMaterials;
    }, {});
    this.setState({
      materialUsage
    })
  }

  render() {
    const {materialUsage} = this.state;
    const {recycleTypes} = this.props;

    //calculate the sum of all materials


    let i = 0;
    let materialUsageArr = [];
    Object.keys(materialUsage).map((material) => {
      materialUsageArr[i++] = <tr styleName="row">
				<td styleName="cell">{material}</td>
        {recycleTypes.map((recycleClass) => (
					<td styleName="cell" key={recycleClass.id}>
            {materialUsage[material][recycleClass.name] ?
              materialUsage[material][recycleClass.name] :
              0
            } kg {/*: {recycleClass}*/}
					</td>
        ))}
			</tr>
    });

    return (
			<div>
				<table styleName="table">
					<thead>
					<tr>
						<th styleName="cell">Material</th>
            {recycleTypes.map((recycleClass) =>
							<th styleName="cell">{recycleClass.name}</th>
            )}
					</tr>
					</thead>
					<tbody>
          {materialUsageArr.map(material => (
            material
          ))}
					</tbody>
				</table>
			</div>
    )
  }
}


