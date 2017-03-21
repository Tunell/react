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
		const {usedMaterials, compositeMaterials} = this.props;
		const materialUsage = usedMaterials.reduce((allCompositeMaterials, compositeMaterial) => {
			const compMaterial = compositeMaterials.filter(filterMaterial=> filterMaterial.id == compositeMaterial.composite_material_id)[0];
			if (compMaterial) {
				compMaterial.composite_has_materials.map(rawMaterial => {
					const materialName = rawMaterial.material_name;
					const recycleName = rawMaterial.recycle_type_name;
					if (materialName in allCompositeMaterials) {
						if (recycleName in allCompositeMaterials[materialName]) {
							allCompositeMaterials[materialName][recycleName] += compositeMaterial.amount;
						}
						else {
							allCompositeMaterials[materialName][recycleName] = compositeMaterial.amount;
						}
					}
					else {
						allCompositeMaterials[materialName] = {[recycleName]: compositeMaterial.amount};
					}
				});
			}
			return allCompositeMaterials;
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
					<th styleName="cell">Material</th>
					{recycleTypes.map((recycleClass) =>
						<th styleName="cell">{recycleClass.name}</th>
					)}
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


