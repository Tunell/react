import React from "react";
import FuzzySearch from "react-fuzzy";
import CSSModules from "react-css-modules";
import styles from "./MaterialSelection.less";

class MaterialSelection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

			material_id: 0,
			//FIXME: unit_id shouldn't be in here but is curently needed.
			unit_id: 1,
			amount: 0,
			recycle_type_id: 0,
			comment: '',
			searchOpen: false,
			createNewText: 'Hittar du inte det du söker? Skapa en ny byggdel här! (funkar inte ännu, använd menyn..)'
		};
	};

	fuzzyClick(e, materialIndex) {
		this.handleMaterialChange({name: e.target.innerHTML, id: e.target.attributes['value'].value}, materialIndex)
	}

	materialChange() {
		this.props.onMaterialChange({
			materialIndex: this.state.materialIndex,
			material_id: parseInt(this.state.material_id),
			unit_id: parseInt(this.state.unit_id),
			amount: parseInt(this.state.amount),
			recycle_type_id: parseInt(this.state.recycle_type_id),
			comment: this.state.comment,
		});
	}

	handleMaterialChange(selected, materialIndex) {
		const {compositeMaterials} = this.props;
		if (selected.name == this.state.createNewText) {
			selected.id = "createNew";
		}
		const subMaterials = compositeMaterials
			.filter(loopMaterial => (loopMaterial.materialComposition && loopMaterial.id == selected.id))
			.map(loopMaterial => loopMaterial.materialComposition);

		this.setState({
			materialIndex,
			material_id: selected.id,
			searchOpen: false,
			subMaterials
		}, this.materialChange());
	}

	handleAmountChange(e) {
		this.setState({
			amount: e.target.value
		}, this.materialChange());
	}

	handleRecycleClassChange(e) {
		this.setState({
			recycle_type_id: e.target.value
		}, this.materialChange());
	}

	handleCommentChange(e) {
		this.setState({
			comment: e.target.value
		}, this.materialChange());
	}

	render() {
		const {createNewText, searchOpen, material_id, amount, comment, subMaterials} = this.state;
		const {materialCreation, compositeMaterials, materialIndex} = this.props;
		let materialUnit;
		let materialNameText = compositeMaterials.filter(
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
				{ searchOpen ?
					<FuzzySearch
						list={ compositeMaterials }
						keys={['name']}
						onSelect={ selected => this.handleMaterialChange(selected, materialIndex)}
						styleName="fuzzy"
						resultsTemplate={
							(props, state, styles) => {
								if (state.results[state.results.length - 1].name != createNewText) {
									state.results.push({name: createNewText});
								}
								return (
									state.results.map((val, i) => {
										const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
										if (val.name == 'byggnad01') {
											return ''
										}
										return (
											<div
												key={i}
												style={style}
												onClick={event => this.fuzzyClick(event, materialIndex)}
												value={val.id}>
												{val.name}
											</div>
										);
									})
								)
							}

						}
						placeholder="Materialets namn"/>
					:
					<div styleName="material" onClick={() => this.setState({searchOpen: true})}>
						{materialNameText}
					</div>
				}
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
						<option value="1">Typ av Material</option>
						<option value="2">Återvunnet material</option>
						<option value="3">Nytt material</option>
						<option value="4">Vet ej</option>
					</select>
					}
					<input
						type="text"
						placeholder="Kommentar"
						value={ comment }
						onChange={ event => this.handleCommentChange(event) }/>
				</div>
			</div>
		);
	}
}


export default CSSModules(MaterialSelection, styles)