import React from 'react';

import MaterialSelection from './MaterialSelection.jsx';

const ConstructionForm = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      unit: '',
      materialComposition: [],
      constructionParts: 0

    };
  },
  handleNameChange: function(e) {
    this.setState({
      name: e.target.value
    });
  },
  handleUnitChange: function(e) {
    this.setState({
      unit: e.target.value
    });
  },
  addConstructionPart: function(e){
    e.preventDefault();
    this.setState({
      constructionParts: this.state.constructionParts + 1
    });
  },
  removeConstructionPart: function(e){
    e.preventDefault();
    this.setState({
      constructionParts: this.state.constructionParts - 1
    });
    //FIXME: This also needs to go through the state and remove the unwanted material
  },
  handleMaterialChange: function(material) {
    let materialArray = this.state.materialComposition;
    let indexNum = 0;
    let arrIndex = {};
    this.state.materialComposition.map((constructionPart)=>{
      arrIndex[constructionPart.material]=indexNum++;
    });
    let index = arrIndex[material.material];
    if(index === undefined) {
        index = materialArray.length;
    }
    materialArray[index] = material;

    this.setState({
      materialComposition: materialArray
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    let unit = this.state.unit.trim();
    if (!unit || !name) {
      return;
    }
    this.props.onMaterialSubmit({
      name: name,
      unit: unit,
      materialComposition: this.state.materialComposition
    });
    this.setState({
      name: '',
      unit: '',
      materialComposition: [],
      constructionParts: 0
    });
  },
  render: function() {
    let subMaterials = [];
    for (var i = 0; i < this.state.constructionParts; i++) {
        subMaterials.push(<MaterialSelection key={i} data={this.props.materials} onMaterialChange={this.handleMaterialChange}/>)
    }
    return (
      <form className="material-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Konstruktionens namn"
          value={this.state.name}
          onChange={this.handleNameChange}/>
        <input
          type="text"
          placeholder="Konstruktionens Enhet"
          value={this.state.unit}
          onChange={this.handleUnitChange}/>
        <h3>Bestående av:</h3>
        {subMaterials}
        <button onClick={this.addConstructionPart}>Lägg till ett material</button>
        {this.state.constructionParts > 0 && <button onClick={this.removeConstructionPart}>Ta bort ett material</button>}
        <br/>
        <input type="submit" value="Spara" />
      </form>
    );
  }
});

export default ConstructionForm;