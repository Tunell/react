import React from "react";
import {connect} from "react-redux";
import CSSModules from "react-css-modules";
import update from 'immutability-helper';
import * as styles from "./MaterialSelection.less";

function mapStateToProps(state, ownProps) {
	const recycleTypes = state.resources.recycleTypes.json ? state.resources.recycleTypes.json : [];
	const units = state.resources.units.json ? state.resources.units.json : [];


	//Used in materialCreation
	const materials = state.resources.materials.json || [];

	//usd in MaterialReportPage
	const compositeMaterials = state.resources.compositeMaterials.json ?
		state.resources.compositeMaterials.json : [];

	const mergedCompositeAndRawMaterials = update(compositeMaterials, {$push: materials});
	const filteredCompositeMaterials = JSON.parse(JSON.stringify(mergedCompositeAndRawMaterials)).filter(
		//Filter admin material duplicates (recycle_types)to only show one of each material*/
		(elt, i, a) => {
			/*if not admin-material return all*/
			if (elt.user_id !== 1) {
				return true;
			}

			if (elt.name.indexOf("-") > -1) {
				elt.name = elt.name.substring(0, elt.name.indexOf("-"));
			}
			/*if admin-material remove duplicates*/
			return i === a.findIndex(
					elt2 => {
						return elt2.name == elt.name;
					}
				);
		}
	);
	let unSortedMaterialList = ownProps.materialCreation ? materials : filteredCompositeMaterials;

	const materialList = unSortedMaterialList.sort((a, b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	});

	return {
		recycleTypes,
		units,
		materials,
		materialList,
		compositeMaterials
	};
}

@connect(mapStateToProps)
@CSSModules(styles)
export default class MaterialSelection extends React.Component {
	state = {
		materialListIndex: 0,//Position in materialList array
		material_id: 0,// material_id of selected material
		unit_id: null,//FIXME: unit_id shouldn't be in here but is curently needed.
		unit_name: "",
		amount: null,
		recycle_type_id: null,
		comment: '',
		createNewText: 'Hittar du inte det du söker? Skapa en ny byggdel här! (funkar inte ännu, använd menyn..)'
	};

	handleMaterialChange(materialListIndex) {
		const {materialCreation, materialList} = this.props;
		const subMaterials = materialList
			.filter(loopMaterial => (loopMaterial.composite_has_materials && loopMaterial.id == materialListIndex))
			.map(loopMaterial => loopMaterial.composite_has_materials);
		if (materialListIndex === 'placeholder') {
			this.setState({
				materialListIndex: 0,
				material_id: 0,
				unit_id: 0,
				unit_name: 0,
				subMaterials
			});
		} else if (materialCreation) {
			//MaterialCreationPage
			this.setState({
				materialListIndex,
				material_id: materialList[materialListIndex].id,
				subMaterials
			});
		} else {
			//MaterialReportPage
			this.setState({
				materialListIndex,
				material_id: materialList[materialListIndex].id,
				unit_id: materialList[materialListIndex].unit_id,
				unit_name: materialList[materialListIndex].unit_name,
				material_type_id: !!materialList[materialListIndex].composite_has_materials ? 2 : 1,
				subMaterials
			});
		}
	}


	handleAmountChange(e) {
		this.setState({
			amount: e.target.value
		});
		if (isFinite(e.target.value) && e.target.value > 0) {
			this.setState({
				amountError: ""
			});
		} else if (e.target.value !== "") {
			this.setState({
				amountError: "Mängden måste vara en siffra"
			});

		}
	}

	handleRecycleClassChange(e) {
		this.setState({
			recycle_type_id: e.target.value
		});
	}

	handleUnitChange(e) {
		this.setState({
			unit_id: e.target.value
		});
	}

	handleCommentChange(e) {
		this.setState({
			comment: e.target.value
		});
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.state != nextState) {
			this.materialChange(nextState);
		}
	}

	materialChange(nextState) {
		const {materialListIndex, material_id, unit_id, amount, recycle_type_id, comment, material_type_id} = nextState;
		const {materialIndex, materialCreation, materialList, compositeMaterials} = this.props;

		//MaterialReport have to select correct recycleTyppe of admin Materials
		let material_id_corrected_recycle = material_id;
		let recycle_type_idNeeded = true;

		if(!!materialList[materialListIndex].composite_has_materials){
			//Composite materials don't need a recyle_type since they are user created
			recycle_type_idNeeded = false;
		}

		this.props.onMaterialChange({
			materialIndex,
			material_id: parseInt(material_id),
			unit_id: parseInt(unit_id),
			amount: parseFloat(amount),
			recycle_type_id: parseInt(recycle_type_id),
			comment: comment,
			recycle_type_idNeeded,
			material_type_id
		});
	}

	render() {
		const {unit_name, amount, comment, amountError, material_id, materialListIndex, material_type_id} = this.state;
		const {materialCreation, recycleTypes, materialList, units} = this.props;

		let materialUnit;

		const isCompositeMaterial = material_type_id === 2;

		return (
			<div>
				<p style={{color: 'red'}}>{amountError}</p>
				<div styleName="amount-unit">
					<select
						type="text"
						placeholder="Sök efter materialets namn"
						name="material"
						styleName="material"
						onChange={ event => this.handleMaterialChange(event.target.value) }>
						<option defaultValue value="placeholder">Välj material</option>
						{materialList && materialList.map((val, i) => (
							<option
								key={i}
								value={i}>
								{val.name}
							</option>
						))}
					</select>

					<input
						type="text"
						placeholder="Mängd"
						value={ amount }
						onChange={ event => this.handleAmountChange(event)}
						styleName="amount"
					/>
					{ //Check if selected material is by admin (is raw-material)
						!isCompositeMaterial ?
						<span>
							<select styleName="unit" onChange={ (event) => this.handleUnitChange(event)}>
								<option defaultValue>Enhet</option>
								{units.map(unit =>
									<option key={unit.id} value={unit.id}>{unit.name}</option>
								)}
							</select>
							<select styleName="RecycleClass" onChange={ (event) => this.handleRecycleClassChange(event)}>
								<option defaultValue>Återvinningsgrad</option>
								{recycleTypes.map(recycleType =>
									<option key={recycleType.id} value={recycleType.id}>{recycleType.name}</option>
								)}
							</select>
						</span> :
						<span styleName="unit">{unit_name}</span>
					}
					{ !materialCreation && <input
						type="text"
						placeholder="Kommentar"
						value={ comment }
						styleName="comment"
						onChange={ event => this.handleCommentChange(event) }/>
					}
				</div>
			</div>
		);
	}
}