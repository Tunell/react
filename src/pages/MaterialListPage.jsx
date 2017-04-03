import React from "react";
import {connect} from "react-redux";
import Material from "../Material.jsx";
import UsedMaterialsList from "../UsedMaterialsList.jsx";
import UsedMaterialsLog from "../UsedMaterialsLog.jsx";

@connect(
	(state) => ( {
		compositeMaterials: state.resources.compositeMaterials.json ? state.resources.compositeMaterials.json : [],
		materials: state.resources.materials.json ? state.resources.materials.json : [],
	})
)
export default class MaterialListPage extends React.Component {

	state = {
		compositeList: this.props.allowComposite || ( this.props.location.query && this.props.location.query.compositeList),
		materialUsageList: this.props.materialUsageList || ( this.props.route && this.props.route.materialUsageList),
		showLog: false
	};

	handleListChange = (listType) => {
		switch (listType) {
			case 'building':
				this.setState({
					materialUsageList: true,
					compositeList: false,
					showLog: false
				});
				break;
			case 'usedMaterials':
				this.setState({
					materialUsageList: true,
					compositeList: true,
					showLog: true
				});
				break;
			case 'prefab':
				this.setState({
					materialUsageList: false,
					compositeList: true,
				});
				break;
			case 'material_id':
				this.setState({
					materialUsageList: false,
					compositeList: false,
				});
				break;
		}
	};

	render() {
		const {materialUsageList, compositeList, showLog} = this.state;
		const {compositeMaterials, materials} = this.props;
		return (
			<div className="materialList">
				<br/>
				<button onClick={ e => this.handleListChange('material_id')}>Material och Produkter</button>
				<button onClick={ e => this.handleListChange('prefab')}>Byggdelar</button>
				<button onClick={ e => this.handleListChange('usedMaterials')}>Materialrapporterings logg</button>
				<button onClick={ e => this.handleListChange('building')}>Använt material</button>
				{
					(() => {
						if (materialUsageList && !showLog) {
							return <UsedMaterialsList/>
						} else if (materialUsageList && showLog) {
							return <UsedMaterialsLog/>
						} else if (compositeList) {
							return <div>
								<h1>Byggdelar:</h1>
								{compositeMaterials.filter(material=> material.user_id !== 1)
									.map(material => (
									<Material key={material.id} material={material} composite={ true }/>
								))}
							</div>

						} else {
							return <div>
								<h1>Material och Produkter</h1>
								{materials.map(material => (
									<Material key={material.id} material={material} composite={ true }/>
								))}
							</div>

						}
					})()
				}
			</div>
		);
	}
}