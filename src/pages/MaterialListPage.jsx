import React from "react";
import {connect} from "react-redux";
import CSSModules from "react-css-modules";
import Material from "../Material.jsx";
import UsedMaterialsList from "../UsedMaterialsList.jsx";
import * as styles from "./MaterialListPage.less";
import {arrayToObject} from "../functions/arrayToObject";

@connect(
	(state) => ( {
		compositeMaterials: state.resources.compositeMaterials.json ? state.resources.compositeMaterials.json : [],
		materials: state.resources.materials.json ? state.resources.materials.json : [],
		user: state.user,
		users: state.resources.users.json,
		recycleTypes: state.resources.recycleTypes.json
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
		gtag('event', 'change_list_type', {
			'list_type': listType,
			'event_label': listType,
			'event_category': 'click'
		});
		switch (listType) {
			case 'building':
				this.setState({
					materialUsageList: true,
					compositeList: false,
					showLog: false,
					list: 'building'
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
		const {compositeMaterials, users, user, recycleTypes} = this.props;
		console.log(recycleTypes)
    const usersMap = users ? arrayToObject(users, 'id') : {}

		return (
			<div className="materialList">
				<div styleName="tabs">
					<button styleName={list === 'prefab' ? 'tab-selcted' : 'tab'}  onClick={ e => this.handleListChange('prefab')}>Byggdelar</button>
					<button styleName={list === 'building' ? 'tab-selcted' : 'tab'}  onClick={ e => this.handleListChange('building')}>Använt material</button>
				</div>
				{
					(() => {
						if (materialUsageList && !showLog) {
							return <div>
								<h1>Använt material</h1>
								<h2>{usersMap[user] ? usersMap[user].name : null}</h2>
								<UsedMaterialsList/>
							</div>
						} else {
							return <div>
								<h1>Byggdelar</h1>
								<h2>{usersMap[user] ? usersMap[user].name : null}</h2>
								{compositeMaterials.filter(material=> material.user_id !== 1)
									.map(material => (
									<Material key={material.id} material={material} composite={ true } recycleTypes={recycleTypes}/>
								))}
							</div>

						}
					})()
				}
			</div>
		);
	}
}
