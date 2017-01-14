import React from "react";
import FuzzySearch from "react-fuzzy";
import CSSModules from "react-css-modules";
import styles from "./MaterialSelection.less";

class MaterialSelection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

			material: '',
			amount: '',
			RecycleClassID: '',
			comment: '',
			searchOpen: false,
			createNewText: 'Hittar du inte det du söker? Skapa en ny byggdel här! (funkar inte ännu, använd menyn..)'
		};
	};

	fuzzyClick(e, materialIndex) {
		this.handleMaterialChange({name: e.target.innerHTML, id: e.target.attributes['value'].value}, materialIndex)
	}

	handleMaterialChange(selected, materialIndex) {
		const {data} = this.props;
		if (selected.name == this.state.createNewText) {
			selected.id = "createNew";
		}
		const subMaterials = data
			.filter(loopMaterial => (loopMaterial.materialComposition && loopMaterial.id == selected.id))
			.map(loopMaterial => loopMaterial.materialComposition);
		this.props.onMaterialChange({
			materialIndex,
			material: selected.id,
			amount: this.state.amount,
			RecycleClassID: this.state.RecycleClassID
		});

		this.setState({
			materialIndex,
			material: selected.id,
			searchOpen: false,
			subMaterials
		});
	}

	handleAmountChange(e) {
		this.props.onMaterialChange({
			material: this.state.material,
			amount: e.target.value,
			RecycleClassID: this.state.RecycleClassID
		});
		this.setState({
			amount: e.target.value
		});
	}

	handleRecycleClassChange(e) {
		this.props.onMaterialChange({
			material: this.state.material,
			amount: this.state.amount,
			RecycleClassID: e.target.value
		});
		this.setState({
			RecycleClassID: e.target.value
		});
	}


	handleCommentChange(e) {
		this.props.onMaterialChange({
			material: this.state.material,
			amount: this.state.amount,
			RecycleClassID: this.state.RecycleClassID,
			comment: e.target.value
		});
		this.setState({
			comment: e.target.value
		});
	}

	render() {
		const {createNewText, searchOpen, material, amount, comment, subMaterials} = this.state;
		const {materialCreation, data, materialIndex} = this.props;
		let materialUnit;
		let materialNameText = data.filter(
			filterMatierial => filterMatierial.id == material
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
						list={ data }
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
;


export default CSSModules(MaterialSelection, styles)