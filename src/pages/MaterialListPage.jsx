import React from "react";
import {connect} from "react-redux";
import Material from "../Material.jsx";
import UsedMaterialsList from "../UsedMaterialsList.jsx";
import UsedMaterialsLog from "../UsedMaterialsLog.jsx";

class MaterialListPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			compositeList: this.props.allowComposite || ( this.props.route && this.props.route.allowComposite),
			materialUsageList: this.props.materialUsageList || ( this.props.route && this.props.route.materialUsageList),
			showLog: false
		};
		this.handleListChange = this.handleListChange.bind(this);
	};

	handleListChange(listType) {
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

	}

	render() {
		const {materialUsageList, compositeList, showLog} = this.state;
		const {compositeMaterials} = this.props;
		return (
			<div className="materialList">
				<br/>
				<button onClick={ e => this.handleListChange('material_id')}>Material och Produkter</button>
				<button onClick={ e => this.handleListChange('prefab')}>Byggdelar</button>
				<button onClick={ e => this.handleListChange('usedMaterials')}>Materialrapporterings logg</button>
				<button onClick={ e => this.handleListChange('building')}>Använt material</button>
				{materialUsageList ?
					<div>
						{ (!showLog) && <UsedMaterialsList/>}
						{ (showLog) && <UsedMaterialsLog/>}
					</div>
					:
					<div>
						{
							compositeList ?
								<div>
									<h1>Byggdelar:</h1>
									{compositeMaterials.map(material => (<Material material={material} composite={ true }/>))}
								</div> :
								<div>
									<h1>Material och Produkter</h1>
									{compositeMaterials.map(material => (<Material material={material} composite={ false }/>))}
								</div>
						}
					</div>
				}
			</div>
		);
	}
}

export default connect(
	(state) => ( {
		compositeMaterials: state.resources.compositeMaterials.json,
	})
)(MaterialListPage)