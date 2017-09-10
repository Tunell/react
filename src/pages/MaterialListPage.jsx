import React from "react";
import {connect} from "react-redux";
import CSSModules from "react-css-modules";
import Material from "../Material.jsx";
import UsedMaterialsList from "../UsedMaterialsList.jsx";
import UsedMaterialsLog from "../UsedMaterialsLog.jsx";
import * as styles from "./MaterialListPage.less"

@connect(
	(state) => ( {
		compositeMaterials: state.resources.compositeMaterials.json ? state.resources.compositeMaterials.json : [],
		materials: state.resources.materials.json ? state.resources.materials.json : [],
	})
)
@CSSModules(styles)
export default class MaterialListPage extends React.Component {

	state = {
		compositeList: this.props.allowComposite || ( this.props.location.query && this.props.location.query.compositeList),
		materialUsageList: this.props.materialUsageList || ( this.props.route && this.props.route.materialUsageList),
		showLog: false,
		list: 'prefab'
	};

	handleListChange = (listType) => {
		switch (listType) {
			case 'building':
				this.setState({
					materialUsageList: true,
					compositeList: false,
					showLog: false,
					list: 'building'
				});
				break;
			case 'usedMaterials':
				this.setState({
					materialUsageList: true,
					compositeList: true,
					showLog: true,
					list: 'usedMaterials'
				});
				break;
			case 'prefab':
				this.setState({
					materialUsageList: false,
					compositeList: true,
					list: 'prefab'
				});
				break;
		}
	};

	render() {
		const {materialUsageList, showLog, list} = this.state;
		const {compositeMaterials} = this.props;
		return (
			<div className="materialList">
				<div styleName="tabs">
					<button styleName={list === 'prefab' ? 'tab-selcted' : 'tab'}  onClick={ e => this.handleListChange('prefab')}>Byggdelar</button>
					<button styleName={list === 'usedMaterials' ? 'tab-selcted' : 'tab'}  onClick={ e => this.handleListChange('usedMaterials')}>Rapporterade material</button>
					<button styleName={list === 'building' ? 'tab-selcted' : 'tab'}  onClick={ e => this.handleListChange('building')}>Använt material</button>
				</div>
				{
					(() => {
						if (materialUsageList && !showLog) {
							return <div>
								<h1>Använt material</h1>
								<UsedMaterialsList/>
							</div>
						} else if (materialUsageList && showLog) {
							return <div>
								<h1>Rapporterade material</h1>
								<UsedMaterialsLog/>
							</div>
						} else {
							return <div>
								<h1>Byggdelar</h1>
								{compositeMaterials.filter(material=> material.user_id !== 1)
									.map(material => (
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