import React from "react";
import {connect} from "react-redux";
import CSSModules from "react-css-modules";
import update from 'immutability-helper';
import Select from 'react-select';
import "!style-loader!css-loader!../node_modules/react-select/dist/react-select.css";
import * as styles from "./MaterialSelection.less";

function mapStateToProps(state, ownProps) {
	const recycleTypes = state.resources.recycleTypes.json ? state.resources.recycleTypes.json : [];
	const units = state.resources.units.json ? state.resources.units.json : [];


	//Used in materialCreation
	const materials = state.resources.materials.json ? state.resources.materials.json : [];

	//usd in MaterialReportPage
	const compositeMaterials = state.resources.compositeMaterials.json ?
		state.resources.compositeMaterials.json : [];

	const filteredCompositeMaterials = update(compositeMaterials, {$push: materials}).filter(
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

	if(unSortedMaterialList.map(material => material.name).indexOf('AAA') === -1){
		//There is no Råmaterial delimiter
		unSortedMaterialList.push({
			value: null,
			disabled: true,
			groupSeparator: true,
			name: 'AAA',
			label: <b>--Råmaterial--</b>

		});
	}

	if(unSortedMaterialList.filter((val,i) => !!unSortedMaterialList[i].composite_has_materials).length > 0 &&
		unSortedMaterialList.map(material => material.name).indexOf('AAAA') === -1
	){
		//there is composite-materials in the list &&
		//There is no previous Byggdelar delimiter
		unSortedMaterialList.push({
			value: null,
			disabled: true,
			groupSeparator: true,
			name: 'AAAA',
			composite_has_materials: true,
			label: <b>--Byggdelar--</b>
		});

	}

	let materialList = unSortedMaterialList.sort((a, b) => {
		if(!a.composite_has_materials && !!b.composite_has_materials)
			return -1
		if(!!a.composite_has_materials && !b.composite_has_materials)
			return 1
		if (a.name < b.name)
			return -1;
		if (a.name > b.name)
			return 1;
		return 0;
	});
	materialList.map( (material, i) => {
		if(!material.groupSeparator){
			material.label = material.name;
			material.value = i;
		}
		return material;
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
		materialListIndex: null,//Position in materialList array
		material_id: null,// material_id of selected material
		isRawMaterial: null,
		unit_id: null,//FIXME: unit_id shouldn't be in here but is curently needed.
		unit_name: "",
		amount: null,
		recycle_type_id: null,
		comment: '',
		createNewText: 'Hittar du inte det du söker? Skapa en ny byggdel här! (funkar inte ännu, använd menyn..)'
	};

	handleMaterialChange(option) {
		const materialListIndex = option ? option.value : 'placeholder';
		const {materialCreation, materialList} = this.props;
		const isRawMaterial = !materialList[materialListIndex].composite_has_materials;
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
			//MaterialCreationPage  (Create composite material)
			this.setState({
				materialListIndex,
				isRawMaterial,
				material_id: materialList[materialListIndex].id,
				subMaterials
			});
		} else {
			//MaterialReportPage (Used material)
			this.setState({
				materialListIndex,
				isRawMaterial,
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
		const {materialIndex, materialList} = this.props;

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
		const {unit_name, amount, comment, amountError, material_type_id, materialListIndex, isRawMaterial} = this.state;
		const {materialCreation, recycleTypes, materialList, units} = this.props;
		const isCompositeMaterial = material_type_id === 2;
		return (
			<div>
				<p style={{color: 'red'}}>{amountError}</p>
				<div styleName="amount-unit">
					<div styleName="material">
						<Select
							type="text"
							name="material"
							placeholder="Välj material"
							value={materialListIndex}
							options={materialList}
							matchProp="any"
							onChange={ value => this.handleMaterialChange(value) }/>
					</div>

					<input
						type="text"
						placeholder="Mängd"
						value={ amount }
						onChange={ event => this.handleAmountChange(event)}
						styleName="amount"
					/>
					{!isCompositeMaterial ?
						<span>
							<select styleName="unit" onChange={ (event) => this.handleUnitChange(event)}>
								<option defaultValue>Enhet</option>
								{units.filter(unit => !isRawMaterial || (unit.id === 1 || unit.id === 2 || unit.id === 5))
									.map(unit =>
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