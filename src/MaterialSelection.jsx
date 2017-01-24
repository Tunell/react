import React from "react";
import CSSModules from "react-css-modules";
import styles from "./MaterialSelection.less";
import {connect} from "react-redux";

class MaterialSelection extends React.Component {
	constructor(props) {
		super(props);
		const {materialCreation, material_has_meta, compositeMaterials} = this.props;
		const materialList = materialCreation ? material_has_meta : compositeMaterials;
		this.state = {

			material_id: 0,
			//FIXME: unit_id shouldn't be in here but is curently needed.
			unit_id: null,
			amount: null,
			recycle_type_id: null,
			comment: '',
			materialList,
			searchOpen: false,
			createNewText: 'Hittar du inte det du söker? Skapa en ny byggdel här! (funkar inte ännu, använd menyn..)'
		};
	};

	materialChange(nextState) {
		this.props.onMaterialChange({
			materialIndex: nextState.materialIndex,
			material_id: parseInt(nextState.material_id),
			unit_id: parseInt(nextState.unit_id),
			amount: parseInt(nextState.amount),
			recycle_type_id: parseInt(nextState.recycle_type_id),
			comment: nextState.comment,
		});
	}

	handleMaterialChange(materialIndex, material_id) {
		const {materialCreation, compositeMaterials, material_has_meta} = this.props;
		const materialList = materialCreation ? material_has_meta : compositeMaterials;
		const subMaterials = materialList
			.filter(loopMaterial => (loopMaterial.composite_has_materials && loopMaterial.id == material_id))
			.map(loopMaterial => loopMaterial.composite_has_materials);

		this.setState({
			materialIndex,
			material_id: material_id,
			searchOpen: false,
			unit_id: 2, //material_has_meta[material_id],
			subMaterials
		});
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

	render() {
		const {materialList, material_id, amount, comment, subMaterials, amountError} = this.state;
		const {materialCreation, materialIndex, recycleTypes} = this.props;

		let materialUnit;

		return (
			<div>
				<p style={{color: 'red'}}>{amountError}</p>

				<div styleName="amount-unit">
					<select
						type="text"
						placeholder="Sök efter materialets namn"
						value={ material_id }
						name="material"
						styleName="material"
						onChange={ event => this.handleMaterialChange(materialIndex, event.target.value) }>
						<option defaultValue>Välj material</option>
						{materialList.map((val, i) => (
								<option
									key={i}
									value={val.id}>
									{val.name}
								</option>
							)
						)}
					</select>

					<input
						type="text"
						placeholder="Mängd"
						value={ amount }
						onChange={ event => this.handleAmountChange(event)}
						styleName="amount"
					/>
					<span styleName="unit">
            { materialUnit }
          </span>
					{ (materialCreation || (subMaterials && subMaterials.length === 0) ) &&
					<select styleName="RecycleClass" onChange={ (event) => this.handleRecycleClassChange(event)}>
						<option defaultValue>Typ av Material</option>
						{recycleTypes && recycleTypes.map(recycleType =>
							<option key={recycleType.id} value={recycleType.id}>{recycleType.name} </option>
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

export default connect(
	(state) => ( {
		recycleTypes: state.resources.recycleTypes.json,
		compositeMaterials: state.resources.compositeMaterials.json,
		material_has_meta: state.resources.materials.json
	})
)(CSSModules(MaterialSelection, styles))