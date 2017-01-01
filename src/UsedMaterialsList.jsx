import React from 'react';

class UsedMaterialsList extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {materials} = this.props;
		let materialUsage = {};
		materials.map(material => {
			if (material.name == 'byggnad01') {
				material.materialComposition && material.materialComposition.map((rawMaterial) => {
					if (typeof materialUsage[rawMaterial.material] == 'undefined') {
						materialUsage[rawMaterial.material] = parseInt(rawMaterial.amount);
					} else {
						materialUsage[rawMaterial.material] += parseInt(rawMaterial.amount)
					}
				});
			}
		});
		let i = 0;
		let materialUsageArr = [];
		Object.keys(materialUsage).map((k) => {
			materialUsageArr[i++] = {id: k, amount: materialUsage[k]}
		});
		return (
			<div>
				{materialUsageArr.map(material => (
					<div key={material.id}>
						{materials.filter(
							filterMatierial => filterMatierial.id == material.id
						).map(
							filterMatierial => {
								return filterMatierial.name
							}
						)} : {material.amount}
					</div>
				))}
			</div>
		)
	}
}

export default UsedMaterialsList;