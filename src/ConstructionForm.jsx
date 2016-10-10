//CommentBox.jsx
import React from 'react';

import MaterialSelection from './MaterialSelection.jsx';

const ConstructionForm = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      unit: '',
      materialComposition: []

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
  handleMaterialChange: function(material) {
    this.setState({
      materialComposition:[material]
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    /*let name = this.state.name.trim();
    let unit = this.state.unit.trim();
    if (!unit || !name) {
      return;
    }
    this.props.onMaterialSubmit({
      name: name,
      unit: unit
    });*/
    this.setState({
      name: '',
      unit: ''
    });
  },
  render: function() {
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
        <MaterialSelection data={this.props.materials} onMaterialChange={this.handleMaterialChange}/>
        <input type="submit" value="Spara" />
      </form>
    );
  }
});

export default ConstructionForm;