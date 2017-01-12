import React from 'react';
import Material from '../Material.jsx';
import UsedMaterialsList from '../UsedMaterialsList.jsx';
import UsedMaterialsLog from '../UsedMaterialsLog.jsx';

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
					showLog: false
				});
				break;
			case 'material':
				this.setState({
					materialUsageList: false,
					compositeList: false,
					showLog: false
				});
				break;
		}

	}

	render() {
		const {materialUsageList, compositeList, showLog} = this.state;
		const {materials} = this.props;
		let materialObjects = {};
		materials.map(d => (Object.assign(materialObjects, {[d.id]: d})));
		const materialNodes = materials.map(material => {
			// Lista Material (ConstructionPart)
			if (compositeList && material.name != 'byggnad01') {
				if (typeof material.materialComposition == 'undefined') {
					return;
				}
				return (
					<Material name={ material.name }
										key={ material.id }
										composite={ true }
										materialComposition={ material.materialComposition }
										materialObjects={ materialObjects }
										unit={material.unit}/>
				);
			}

			// Lista grund-material
			if (!materialUsageList && typeof material.materialComposition == 'undefined') {
				return (
					<Material name={material.name} unit={material.unit} key={material.id}/>
				);
			}
		});
		return (
			<div className="materialList">
				<br/>
				<button onClick={ e => this.handleListChange('material')}>Material</button>
				<button onClick={ e => this.handleListChange('prefab')}>Byggdelar</button>
				<button onClick={ e => this.handleListChange('building')}>Inrapporterat material</button>
				<button onClick={ e => this.handleListChange('usedMaterials')}>Använt material</button>
				{compositeList ?
					<h1>Byggdelar:</h1> :
					<h1>Material och Produkter</h1>
				}
				{materialNodes}
				{ (materialUsageList && showLog) && <UsedMaterialsList materials={materials}/>}
				{ (materialUsageList && !showLog) && <UsedMaterialsLog materials={materials}/>}
			</div>
		);
	}
}
export default MaterialListPage;