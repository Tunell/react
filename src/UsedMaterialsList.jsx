import React from "react";
import {connect} from "react-redux";

type Props = {
	usedMaterials: object,
	compositeMaterials: object
};

class UsedMaterialsList extends React.Component {
	props: Props;

	constructor(props) {
		super(props);
	}

	render() {
		const {usedMaterials, compositeMaterials} = this.props;
		//calculate the sum of all materials
		const materialUsage = usedMaterials.reduce((allCompositeMaterials, compositeMaterial) => {
			const compMaterial = compositeMaterials.filter(filterMaterial=> filterMaterial.id == compositeMaterial.composite_material_id)[0];
			if(compMaterial){
				compMaterial.composite_has_materials.map(rawMaterial => {
					if (rawMaterial.material_name in allCompositeMaterials) {
						allCompositeMaterials[rawMaterial.material_name] += compositeMaterial.amount;
					}
					else {
						allCompositeMaterials[rawMaterial.material_name] = compositeMaterial.amount;
					}
				});
			}
			return allCompositeMaterials;
		}, {});

		let i = 0;
		let materialUsageArr = [];
		Object.keys(materialUsage).map((k) => {
			materialUsageArr[i++] = {name: k, amount: materialUsage[k]}
		});
		return (
			<div>
				{materialUsageArr.map(material => (
					<div key={material.id}>
						{material.name} : {material.amount}
					</div>
				))}
			</div>
		)
	}
}

export default connect(
	(state) => ( {
		usedMaterials: state.resources.usedMaterials.json,
		compositeMaterials: state.resources.compositeMaterials.json,
	})
)(UsedMaterialsList)