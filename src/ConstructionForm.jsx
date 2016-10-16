import React from 'react';
import CSSModules from 'react-css-modules';

import MaterialSelection from './MaterialSelection.jsx';

import styles from './ConstructionForm.less';

class ConstructionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      unit: '',
      materialComposition: [],
      constructionParts: 0,
      constructionCreation: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.createConstructionPart = this.createConstructionPart.bind(this);
    this.createConstructionPartClicked = this.createConstructionPartClicked.bind(this);
    this.addConstructionPart = this.addConstructionPart.bind(this);
    this.removeConstructionPart = this.removeConstructionPart.bind(this);
    this.handleMaterialChange = this.handleMaterialChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleUnitChange(e) {
    this.setState({
      unit: e.target.value
    });
  }

  createConstructionPartClicked(e){
    e.preventDefault();
    this.createConstructionPart();
  }

  createConstructionPart(){
    this.setState({
      name: '',
      unit: '',
      materialComposition: [],
      constructionParts: 0,
      constructionCreation: true
    });
  }

  addConstructionPart(e){
    e.preventDefault();
    this.setState({
      constructionParts: this.state.constructionParts + 1
    });
  }

  removeConstructionPart(e){
    e.preventDefault();
    this.setState({
      constructionParts: this.state.constructionParts - 1
    });
    //FIXME: This also needs to go through the state and remove the unwanted material
  }

  handleMaterialChange(material) {
    if( material.material == 'createNew'){
      this.createConstructionPart();
      return;
    }
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
  }

  handleSubmit(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    let unit = this.state.unit.trim();
    if (!unit && !name && this.state.materialComposition.length == 0) {
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
      constructionParts: 0,
      constructionCreation: false
    });
  }

  render() {
    let subMaterials = [];
    const { unit, constructionParts, constructionCreation, name, materialComposition } = this.state
    for (var i = 0; i < this.state.constructionParts; i++) {
        subMaterials.push(<MaterialSelection key={i} data={this.props.materials} onMaterialChange={this.handleMaterialChange}/>)
    }
    return (
      <form className="material-form" onSubmit={this.handleSubmit}>
        
        { constructionCreation ?
          <div>
            <h1>Skapa nytt material eller konstruktioner:</h1>
            <input
              type="text"
              placeholder="Konstruktionens namn"
              value={ name }
              onChange={this.handleNameChange}/>
            <input
              type="text"
              placeholder="Konstruktionens Enhet"
              value={ unit }
              onChange={this.handleUnitChange}/>
            <h3>Bestående av:</h3>
          </div>
        :
          <div>
            <h1 styleName="headline">Rapportera in Material</h1>
          </div>
        }
        { subMaterials }
        <button onClick={ this.addConstructionPart }>Lägg till material</button>
        { constructionParts > 0 && <button onClick={this.removeConstructionPart}>Ta bort material</button>}
        <br/>
        { unit || name || materialComposition.length != 0 && <input type="submit" value="Spara" />}
        <br/>
        <br/>
        <br/>
        <button onClick={ this.createConstructionPartClicked }>Skapa nytt Material</button>
      </form>
    );
  }
};

export default CSSModules(ConstructionForm, styles)