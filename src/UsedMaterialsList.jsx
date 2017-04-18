import React from "react";
import {connect} from "react-redux";
import CSSModules from "react-css-modules";
import * as styles from "./UsedMaterialsList.less";

type Props = {
	usedMaterials: object,
	compositeMaterials: object
};


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
		const materialUsage = usedMaterials.reduce((allUsedMaterials, usedMaterial) => {
			const compMaterial = compositeMaterials.filter(filterMaterial=> filterMaterial.id === usedMaterial.used_has_material_id)[0];

			if (compMaterial && usedMaterial.material_type_id === 2) {
				//This is a composite material, loop through child materials.
				compMaterial.composite_has_materials.map(rawMaterial => {
					const materialName = rawMaterial.material_name;
					const recycleName = rawMaterial.recycle_type_name;
					if (materialName in allUsedMaterials) {
						if (recycleName in allUsedMaterials[materialName]) {
							allUsedMaterials[materialName][recycleName] += usedMaterial.amount * rawMaterial.amount;
						}
						else {
							allUsedMaterials[materialName][recycleName] = usedMaterial.amount * rawMaterial.amount;
						}
					}
					else {
						allUsedMaterials[materialName] = {[recycleName]: usedMaterial.amount * rawMaterial.amount};
					}
				});
			}else if(materials.filter(filterMaterial=> filterMaterial.id === usedMaterial.used_has_material_id)[0]){
				//This is a used Material
				const materialName = usedMaterial.used_has_material_name;
				const recycleName = usedMaterial.recycle_type_name;
				if (materialName in allUsedMaterials) {
					if (recycleName in allUsedMaterials[materialName]) {
						allUsedMaterials[materialName][recycleName] += usedMaterial.amount;
					}
					else {
						allUsedMaterials[materialName][recycleName] = usedMaterial.amount;
					}
				}
				else {
					allUsedMaterials[materialName] = {[recycleName]: usedMaterial.amount};
				}
			}else{
				throw(e);
				console.log("Material dosen't exist: ", e);

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


