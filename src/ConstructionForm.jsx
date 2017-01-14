import React from "react";
import CSSModules from "react-css-modules";
import {connect} from "react-redux";
import styles from "./ConstructionForm.less";
import MaterialSelection from "./MaterialSelection.jsx";
import LoadJson from "./functions/LoadJson";

class ConstructionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.constructionName ? this.props.constructionName : '',
			unit: '',
			materialComposition: [],
			constructionParts: this.props.constructionParts ? this.props.constructionParts : 0,
			constructionCreation: this.props.constructionCreation ? this.props.constructionCreation : false
		};
	}

	handleNameUnitChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	createConstructionPartClicked(e, constructionType) {
		e.preventDefault();
		this.createConstructionPart(constructionType);
	}

	createConstructionPart(constructionType) {
		const constructionParts = constructionType == 'prefab' ? 1 : 0;
		this.setState({
			name: '',
			unit: '',
			materialComposition: [],
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
		const {materialComposition} = this.state;
		if (material.material_id == 'createNew') {
			this.createConstructionPart('standard');
			return;
		}
		let materialArray = materialComposition;
		materialArray[material.materialIndex] = material;
		materialArray[material.materialIndex].created = Date.now();

		this.setState({
			materialComposition: materialArray
		});
	}

	async handleSubmit(e) {
		const {user, constructionCreation} = this.props;
		e.preventDefault();
		let name = this.state.name.trim();
		let unit = this.state.unit.trim();
		if (!unit && !name && this.state.materialComposition.length == 0) {
			return;
		}

		const url = constructionCreation ? '/api/composite-materials/' : '/api/used-materials';
		let response;
		if (constructionCreation) {
			//Create new composite material_id

			//unit: unit,
			//FIXME: Unit needs to be loaded from backend and picked in dropdown
			response = await LoadJson(url, "POST", {
				name: name,
				unit_id: 1,
				composite_has_materials: this.state.materialComposition,
				user_id: parseInt(user)
			});
		} else {
			//add new used-material_id
			response = await LoadJson(url, "POST", {
				composite_material_id: parseInt(this.state.materialComposition[0].material_id),
				amount: parseInt(this.state.materialComposition[0].amount),
				user_id: parseInt(user),
				comment: this.state.materialComposition[0].comment
			});

		}
		if (response.failedValidation) {
			console.error("Failed to save material: ", response);
			response.results.errors.map(error => console.log(error.code + " on field: ", error.path[0], ". ", error.message));
		} else {
			this.setState({
				name: '',
				unit: '',
				materialComposition: [],
				constructionParts: 1,
				constructionCreation: false
			});
		}
	}

	render() {
		let subMaterials = [];
		const {unit, constructionParts, constructionCreation, name, materialComposition} = this.state;
		for (var i = 0; i < this.state.constructionParts; i++) {
			subMaterials.push(
				<MaterialSelection
					key={ i }
					materialIndex={i}
					compositeMaterials={ this.props.compositeMaterials }
					onMaterialChange={ material => this.handleMaterialChange(material) }
					materialCreation={ constructionCreation }/>
			)
		}
		const constructionSpecified = ( constructionCreation == 'standard' ||
		constructionCreation == 'prefab' );
		return (
			<form className="material-form" onSubmit={ event => this.handleSubmit(event)}>
				{ (constructionCreation /*&& !constructionSpecified*/) && <div>
					<button onClick={ e => this.createConstructionPartClicked(e, 'standard') }>Skapa material</button>
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
						<input
							type="text"
							placeholder="Produktens enhet"
							value={ unit }
							name="unit"
							onChange={ event => this.handleNameUnitChange(event) }/>
					</div>
				}
				{ constructionParts > 0 &&
				<div>
					{ constructionSpecified && <h3>Bestående av:</h3> }
					//FIXME: Här ska enbart Materials listas, inte composite. Kommentaren ska även flyttas.
					{ subMaterials }
					{ name != 'byggnad01' && <div>
						<button onClick={ event => this.addConstructionPart(event) }>Lägg till material</button>
						{ constructionParts > 0 &&
						<button onClick={ event => this.removeConstructionPart(event) }>Ta bort material</button>}
					</div>}
				</div>
				}
				<br/>
				{ (unit || name || !constructionCreation) /*|| materialComposition.length != 0*/ &&
				<input type="submit" value="Spara"/>}
				{/*<button onClick={ this.createConstructionPartClicked }>Skapa nytt Material</button>*/}
			</form>
		);
	}
}

export default connect(
	(state) => ( {
		user: state.user
	})
)(CSSModules(ConstructionForm, styles))