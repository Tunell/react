import React from 'react';
import Material from './Material.jsx';
import FuzzySearch from 'react-fuzzy';

export default class MaterialSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      material: '',
      amount: '',
      searchOpen: true,
      createNewText: 'Hittade du inte Produkten du letar efter? Skapa en ny här!'
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
    return (
      <div>
        { searchOpen ?
          <FuzzySearch
            list={ this.props.data }
            keys={['name']}
            onSelect={this.handleMaterialChange}
            width={230}
            resultsTemplate={
              (props, state, styles)=>{
                if(state.results[state.results.length-1].name != createNewText){
                  state.results.push({name:createNewText});
                }
                return (
                  state.results.map((val, i) => {
                    const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
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
            <span onClick={()=>this.setState({searchOpen: true})}>
            {this.props.data.filter(
              (filterMatierial)=> filterMatierial.id == material 
            ).map(
              (filterMatierial)=> filterMatierial.name
            )} </span>
          }

        <input
          type="text"
          placeholder="Mängd"
          value={ amount }
          onChange={this.handleAmountChange}
          />
      </div>
    );
  }
};