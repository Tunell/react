import React from "react";
import {connect} from "react-redux";
import CSSModules from "react-css-modules";
import styles from "./MaterialSelection.less";

function mapStateToProps(state, ownProps) {
	const recycleTypes = state.resources.recycleTypes.json ? state.resources.recycleTypes.json : [];

	//Used in materialCreation
	const material_has_metas = state.resources.material_has_metas.json ? state.resources.material_has_metas.json : [];
	const filteredMaterialHasMeta = material_has_metas.filter(
		(elt, i, a) => i === a.findIndex(
			elt2 => elt.material_id === elt2.material_id
		)
	);
	//usd in MaterialReportPage
	const compositeMaterials = state.resources.compositeMaterials.json ?
		state.resources.compositeMaterials.json : [];
	const filteredCompositeMaterials = compositeMaterials.filter(
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
					elt2 => elt.name === elt2.name
				);
		}
	);
	let unSortedMaterialList = ownProps.materialCreation ? filteredMaterialHasMeta : filteredCompositeMaterials;

	const materialList = unSortedMaterialList.sort((a, b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	});

	return {
		recycleTypes,
		material_has_metas,
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
				material_id: materialList[materialListIndex].material_id,
				unit_id: materialList[materialListIndex].unit_id,
				unit_name: materialList[materialListIndex].unit_name,
				subMaterials
			});
		} else {
			//MaterialReportPage
			this.setState({
				materialListIndex,
				material_id: materialList[materialListIndex].id,
				unit_id: materialList[materialListIndex].unit_id,
				unit_name: materialList[materialListIndex].unit_name,
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
		} else {
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
		const {materialListIndex, material_id, unit_id, amount, recycle_type_id, comment} = nextState;
		const {materialIndex, materialCreation, materialList, compositeMaterials} = this.props;

		//MaterialReport have to select correct recycleTyppe of admin Materials
		let material_id_corrected_recycle = material_id;
		let recycle_type_idNeeded = false;
		if (!materialCreation) {
			//this is a material report of an admin material we have to find the correct recycle Type..
			const curentMaterial = materialList[materialListIndex];
			if (curentMaterial.user_id === 1 /*admin material*/) {
				const correctMaterial = compositeMaterials.filter(
					(elt) =>
						//Filter admin material duplicates (recycle_types)to only show one of each material*/
					elt.name === curentMaterial.name + '-' + recycle_type_id
				);
				material_id_corrected_recycle = correctMaterial && correctMaterial.length > 0 && correctMaterial[0].id
				recycle_type_idNeeded = true;
			}
		}
		this.props.onMaterialChange({
			materialIndex,
			material_id: parseInt(material_id_corrected_recycle),
			unit_id: parseInt(unit_id),
			amount: parseFloat(amount),
			recycle_type_id: parseInt(recycle_type_id),
			comment: comment,
			recycle_type_idNeeded
		});
	}

	render() {
		const {unit_name, amount, comment, amountError, material_id, materialListIndex} = this.state;
		const {materialCreation, recycleTypes, materialList} = this.props;

		let materialUnit;

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
								{materialCreation ?
									val.material_name
									:
									val.name
								}
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
					{unit_name}

					<span styleName="unit">{ materialUnit }</span>
					{ //Check if selected material is by admin (is raw-material)
						(materialCreation ||
						(materialList.filter(material => material.id === material_id))
							.filter(material => material.user_id === 1)
							.length > 0) &&
						<select styleName="RecycleClass" onChange={ (event) => this.handleRecycleClassChange(event)}>
							<option defaultValue>Återvinningsgrad</option>
							{recycleTypes.map(recycleType =>
								<option key={recycleType.id} value={recycleType.id}>{recycleType.name}</option>
							)}
						</select>
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