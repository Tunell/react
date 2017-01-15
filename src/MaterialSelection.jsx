import React from "react";
import fuzzy from "fuzzy";
import CSSModules from "react-css-modules";
import styles from "./MaterialSelection.less";
import {connect} from "react-redux";

class MaterialSelection extends React.Component {
	constructor(props) {
		super(props);
		const {materialCreation, materials, compositeMaterials} = this.props;
		const materialList = materialCreation ? materials : compositeMaterials;
		this.state = {

			material_id: 0,
			//FIXME: unit_id shouldn't be in here but is curently needed.
			unit_id: 1,
			amount: 0,
			recycle_type_id: 0,
			comment: '',
			materialList,
			materialSearchString: '',
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

	materialSearch(e) {
		const {materialCreation, materials, compositeMaterials} = this.props;
		const materialList = materialCreation ? materials : compositeMaterials;

		const options = {
			extract: el => el.name
		};
		const results = fuzzy.filter(e.target.value, materialList, options);
		const matches = results.map(el => el.original);

		this.setState({
			materialList: matches,
			materialSearchString: e.target.value
		});

	}

	handleMaterialChange(selected, materialIndex, material_id) {
		const {materialCreation, compositeMaterials, materials} = this.props;
		const materialList = materialCreation ? materials : compositeMaterials;
		const subMaterials = materialList
			.filter(loopMaterial => (loopMaterial.materialComposition && loopMaterial.id == material_id))
			.map(loopMaterial => loopMaterial.materialComposition);

		this.setState({
			materialIndex,
			material_id: material_id,
			searchOpen: false,
			subMaterials,
			materialSearchString: selected.target.textContent
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
		const {materialList, materialSearchString, material_id, amount, comment, subMaterials, amountError} = this.state;
		const {materialCreation, compositeMaterials, materials, materialIndex, recycleTypes} = this.props;

		let materialUnit;
		let materialNameText = materialList.filter(
			filterMatierial => filterMatierial.id == material_id
		).map(
			filterMatierial => {
				materialUnit = filterMatierial.unit;
				return filterMatierial.name
			}
		);
		materialNameText = materialNameText == '' ? 'Materialets namn' : materialNameText;

		return (
			<div>
				<p style={{color: 'red'}}>{amountError}</p>
				{materialList.map((val, i) => {
					return (
						<div
							key={i}
							onClick={event => this.handleMaterialChange(event, materialIndex, val.id)}
							value={val.id}>
							{val.name}
						</div>
					);
				})}
				<input
					type="text"
					placeholder="Sök efter materialets namn"
					value={ materialSearchString }
					name="material"
					onChange={ event => this.materialSearch(event) }/>

				<div styleName="amount-unit">
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
						<option disabled defaultValue>Typ av Material</option>
						{recycleTypes && recycleTypes.map(recycleType =>
							<option key={recycleType.id} value={recycleType.id}>{recycleType.name} </option>
						)}
					</select>
					}
					{ !materialCreation && <input
						type="text"
						placeholder="Kommentar"
						value={ comment }
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
		materials: state.resources.materials.json
	})
)(CSSModules(MaterialSelection, styles))