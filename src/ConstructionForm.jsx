import React from "react";
import CSSModules from "react-css-modules";
import {connect} from "react-redux";
import {fetchJsonWithSpecifiedStore} from "./materialGetters/materialGettersAction";
import styles from "./ConstructionForm.less";
import MaterialSelection from "./MaterialSelection.jsx";
import LoadJson from "./functions/LoadJson";

class ConstructionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.constructionName ? this.props.constructionName : '',
			unit_id: null,
			composite_has_materials: [],
			constructionParts: this.props.constructionParts ? this.props.constructionParts : 0,
			constructionCreation: this.props.constructionCreation ? this.props.constructionCreation : false
		};
	}

	handleNameUnitChange(e) {
		if (e.target.name === 'unit_id') {
			this.setState({
				[e.target.name]: parseInt(e.target.value)
			});
		} else {
			this.setState({
				[e.target.name]: e.target.value
			});
		}
	}

	createConstructionPartClicked(e, constructionType) {
		e.preventDefault();
		this.createConstructionPart(constructionType);
	}

	createConstructionPart(constructionType) {
		const constructionParts = constructionType == 'prefab' ? 1 : 0;
		this.setState({
			name: '',
			unit_id: 0,
			composite_has_materials: [],
			constructionParts,
			constructionCreation: constructionType
		});
	}

	addConstructionPart(e) {
		e.preventDefault();
		this.setState({
			constructionParts: this.state.constructionParts + 1
		});
	}

	removeConstructionPart(e) {
		e.preventDefault();
		this.setState({
			constructionParts: this.state.constructionParts - 1
		});
		//FIXME: This also needs to go through the state and remove the unwanted material_id
	}

	handleMaterialChange(material) {
		const {composite_has_materials} = this.state;
		if (material.material_id == 'createNew') {
			this.createConstructionPart('standard');
			return;
		}
		let materialArray = composite_has_materials;
		materialArray[material.materialIndex] = material;
		materialArray[material.materialIndex].created = Date.now();

		this.setState({
			composite_has_materials: materialArray
		});
	}

	async handleSubmit(e) {
		e.preventDefault();
		const {user, constructionCreation, fetchJsonWithSpecifiedStore} = this.props;
		const {unit_id} = this.state;
		const name = this.state.name.trim();
		//Validate form
		/*if (!user || !unit_id || !name || this.state.composite_has_materials.length == 0) {
			return;
		 }*/

		const url = constructionCreation ? '/api/composite-materials/' : '/api/used-materials';
		let response;
		if (constructionCreation) {
			//Create new composite material_id
			response = await LoadJson(url, "POST", {
				name,
				unit_id,
				composite_has_materials: this.state.composite_has_materials,
				user_id: parseInt(user)
			});
		} else {
			//add new used-material_id
			response = await LoadJson(url, "POST", {
				composite_material_id: parseInt(this.state.composite_has_materials[0].material_id),
				amount: parseInt(this.state.composite_has_materials[0].amount),
				user_id: parseInt(user),
				comment: this.state.composite_has_materials[0].comment
			});

		}
		if (response.failedValidation) {
			//console.error("Failed to save material: ", response);
			this.setState({
				error: response
			});
			response.results.errors.map(error => console.log(error.code + " on field: ", error.path[0], ". ", error.message));
		} else {
			const resourcesToLoad = [
				{key: "usedMaterials", url: 'api/used-materials'},
				{key: 'compositeMaterials', url: 'api/composite-materials'},
			];
			resourcesToLoad.map(resource => {
				fetchJsonWithSpecifiedStore(resource.key, resource.url)
			});
			this.setState({
					name: '',
					unit_id: 0,
					composite_has_materials: [],
					constructionParts: 0,
					constructionCreation: false,
					error: false
				},
				this.setState({
					constructionParts: 1
				})
			);
		}
	}

	render() {
		const {units, user} = this.props;
		const {unit_id, composite_has_materials, constructionParts, constructionCreation, name, error} = this.state;
		let subMaterials = [];
		for (var i = 0; i < this.state.constructionParts; i++) {
			subMaterials.push(
				<MaterialSelection
					key={ i }
					materialIndex={i}
					onMaterialChange={ material => this.handleMaterialChange(material) }
					materialCreation={ constructionCreation }/>
			)
		}
		const constructionSpecified = ( constructionCreation == 'standard' ||
		constructionCreation == 'prefab' );
		let submitEnabled;
		//Validate all fields before enabling submit-button
		if (constructionCreation) {
			submitEnabled = (unit_id > 0 && name && user > 0);
			if(!composite_has_materials.length > 0){
				submitEnabled = false;
			}
			composite_has_materials.map(compositeMapMaterial => {
				if(compositeMapMaterial.material_id > 0 && compositeMapMaterial.amount > 0 &&  compositeMapMaterial.recycle_type_id > 0){

				}else{
					submitEnabled = false
				}
			});
		} else {
			submitEnabled = (user > 0 &&
				composite_has_materials[0] &&
				composite_has_materials[0].amount > 0 &&
				composite_has_materials[0].comment &&
				composite_has_materials[0].recycle_type_id > 0
			);
		}
		return (
			<form className="material-form" onSubmit={ event => this.handleSubmit(event)}>

				{ error && error.results.errors.map(error =>
					<p style={{color: 'red'}}>{error.code + ' on field: ' + error.path[0] + ' ' + error.message}</p>
				)}
				{ (constructionCreation /*&& !constructionSpecified*/) && <div>
					{/*<button onClick={ e => this.createConstructionPartClicked(e, 'standard') }>Skapa material</button>*/}
					<button onClick={ e => this.createConstructionPartClicked(e, 'prefab') }>Skapa byggdel</button>
				</div>}
				{
					constructionSpecified &&
					<div>
						{ constructionParts == 0 && <p style={{color: 'red'}}>TODO: Endast för admin (läs robin)</p> }
						<input
							type="text"
							placeholder="Produktens namn"
							value={ name }
							name="name"
							onChange={ event => this.handleNameUnitChange(event) }/>
						<select
							name="unit_id"
							value={unit_id}
							onChange={ event => this.handleNameUnitChange(event) }>
							<option defaultValue>Produktens enhet</option>
							{units && units.map(unit =>
								<option key={unit.id} value={unit.id}>{unit.name} </option>
							)}
						</select>
					</div>
				}
				{ constructionParts > 0 &&
				<div>
					{ constructionCreation && <p>
						1 {units[unit_id-1] && units[unit_id-1].name} {name} Består av följande:
					</p>
					}
					{/* constructionSpecified && <h3>Bestående av:</h3> */}
					{ subMaterials }
					{ constructionCreation && <div>
						<button onClick={ event => this.addConstructionPart(event) }>Lägg till material</button>
						{ constructionParts > 1 &&
						<button onClick={ event => this.removeConstructionPart(event) }>Ta bort material</button>}
					</div>}
				</div>
				}
				<br/>
				<input
					type="submit"
					value="Spara"
					styleName="submit"
					disabled={!submitEnabled}/>
				{/*<button onClick={ this.createConstructionPartClicked }>Skapa nytt Material</button>*/}
			</form>
		);
	}
}


const mapDispatchToProps = (dispatch) => ({
	fetchJsonWithSpecifiedStore: (reduxStorageUrl, urlWithParamsuser) => dispatch(fetchJsonWithSpecifiedStore(reduxStorageUrl, urlWithParamsuser))
});

export default connect(
	(state) => ( {
		user: state.user,
		units: state.resources.units.json,
	}),
	mapDispatchToProps
)(CSSModules(ConstructionForm, styles))