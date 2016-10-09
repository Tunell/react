//CommentBox.jsx
import React from 'react';

import MaterialSelection from './MaterialSelection.jsx';

const ConstructionForm = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      unit: ''
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
        <MaterialSelection data={this.props.materials} />
        <input
          type="text"
          placeholder="Mängd"
          value={this.state.unit}
          onChange={this.handleUnitChange}
          />
        <input type="submit" value="Spara" />
      </form>
    );
  }
});

export default ConstructionForm;