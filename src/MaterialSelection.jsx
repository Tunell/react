import React from "react";
import CSSModules from "react-css-modules";
import styles from "./MaterialSelection.less";
import {connect} from "react-redux";

class MaterialSelection extends React.Component {
	constructor(props) {
		super(props);
		const {materialCreation, material_has_metas, compositeMaterials} = this.props;
		const materialList = materialCreation ? material_has_metas : compositeMaterials;
		this.state = {
			materialListIndex: 0,
			material_id: 0,
			//FIXME: unit_id shouldn't be in here but is curently needed.
			unit_id: null,
			unit_name: "",
			amount: null,
			recycle_type_id: null,
			comment: '',
			materialList,
			searchOpen: false,
			createNewText: 'Hittar du inte det du söker? Skapa en ny byggdel här! (funkar inte ännu, använd menyn..)'
		};
	};

	handleMaterialChange(materialListIndex) {
		const {materialList} = this.state;
		const {materialCreation} = this.props;
		const subMaterials = materialList
			.filter(loopMaterial => (loopMaterial.composite_has_materials && loopMaterial.id == materialListIndex))
			.map(loopMaterial => loopMaterial.composite_has_materials);

		if (materialCreation) {
			this.setState({
				materialListIndex,
				material_id: materialList[materialListIndex].material_id,
				searchOpen: false,
				unit_id: materialList[materialListIndex].unit_id,
				unit_name: materialList[materialListIndex].unit_name,
				subMaterials
			});
		} else {
			this.setState({
				materialListIndex,
				material_id: materialList[materialListIndex].id,
				searchOpen: false,
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
		const {materialIndex} = this.props;
		this.props.onMaterialChange({
			materialIndex,
			material_id: parseInt(nextState.material_id),
			unit_id: parseInt(nextState.unit_id),
			amount: parseInt(nextState.amount),
			recycle_type_id: parseInt(nextState.recycle_type_id),
			comment: nextState.comment,
		});
	}

	render() {
		const {materialList, materialListIndex, unit_name, amount, comment, amountError} = this.state;
		const {materialCreation,  recycleTypes} = this.props;

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
						<option defaultValue>Välj material</option>
						{materialList.map((val, i) => (
								<option
									key={i}
									value={i}>
									{materialCreation ?
										`${val.material_name} ${val.recycle_type_name}`
										:
										val.name
									}
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
					{unit_name}

					<span styleName="unit">
            { materialUnit }
          </span>
					{/* (materialCreation  enable comments for all || (subMaterials && subMaterials.length === 0) ) &&*/}
					<select styleName="RecycleClass" onChange={ (event) => this.handleRecycleClassChange(event)}>
						<option defaultValue>Typ av Material</option>
						{recycleTypes && recycleTypes.map(recycleType =>
							<option key={recycleType.id} value={recycleType.id}>{recycleType.name} </option>
						)}
					</select>
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
		material_has_metas: state.resources.material_has_metas.json
	})
)(CSSModules(MaterialSelection, styles))