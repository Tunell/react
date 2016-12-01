import React from 'react';
import Material from './Material.jsx';
import FuzzySearch from 'react-fuzzy';
import CSSModules from 'react-css-modules';

import styles from './MaterialSelection.less';

class MaterialSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      material: '',
      amount: '',
      searchOpen: false,
      createNewText: 'Hittar du inte det du söker? Skapa en ny byggdel här! (funkar inte ännu, använd menyn..)'
    };

    this.handleMaterialChange = this.handleMaterialChange.bind(this);
    this.fuzzyClick = this.fuzzyClick.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  };

  fuzzyClick(e){
    this.handleMaterialChange({name:e.target.innerHTML, id:e.target.attributes['value'].value})
  }

  handleMaterialChange(selected) {
    if(selected.name == this.state.createNewText){
      selected.name = "createNew";
    }
    this.props.onMaterialChange({
      material: selected.id,
      amount: this.state.amount
    });
    
    this.setState({
      material: selected.id,
      searchOpen: false
    });
  }

  handleAmountChange(e) {
    this.props.onMaterialChange({
      material: this.state.material,
      amount: e.target.value
    });
    this.setState({
      amount: e.target.value
    });
  }

  render() {
    const { createNewText, searchOpen, material, amount } = this.state
    const { materialCreation, data } = this.props;
    let materialUnit;
    let materialNameText = data.filter(
                (filterMatierial)=> filterMatierial.id == material 
              ).map(
                (filterMatierial)=> {
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
            onSelect={this.handleMaterialChange}
            styleName="fuzzy"
            resultsTemplate={
              (props, state, styles)=>{
                if(state.results[state.results.length-1].name != createNewText){
                  state.results.push({name:createNewText});
                }
                return (
                  state.results.map((val, i) => {
                    const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
                    if(val.name == 'byggnad01'){
                      return ''
                    }
                    return (
                      <div
                        key={i}
                        style={style}
                        onClick={this.fuzzyClick} value={val.id}>
                        {val.name}
                      </div>
                    );
                  })
              )}
              
            }
            placeholder="Materialets namn"/>
          :
            <div styleName="material" onClick={()=>this.setState({searchOpen: true})}>
              {materialNameText}
            </div>
          }
        <div styleName="amount-unit">
          <input
            type="text"
            placeholder="Mängd"
            value={ amount }
            onChange={this.handleAmountChange}
            styleName="amount"
            />
          <span styleName="unit">
            { materialUnit }
          </span>
          { materialCreation && 
            
              <select styleName="amount" style={{border:'1px solid red'}}>
                <option>Typ av Material</option>
                <option>Återvunnet material</option>
                <option>Nytt material</option>
                <option>Vet ej</option>
              </select>
          }
          { materialCreation && <p style={{color:'red'}}>TODO: Typ av Material endast demo</p> }
        </div>
      </div>
    );
  }
};


export default CSSModules(MaterialSelection, styles)