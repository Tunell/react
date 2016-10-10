import React from 'react';
import Material from './Material.jsx';

const MaterialSelection = React.createClass({
  getInitialState: function() {
    return {
      material: '',
      amount: ''
    };
  },

  handleMaterialChange: function(e) {
    this.props.onMaterialChange({
      material: e.target.value,
      amount: this.state.amount
    });
    
    this.setState({
      material: e.target.value
    });
  },
  handleAmountChange: function(e) {
    this.props.onMaterialChange({
      material: this.state.material,
      amount: e.target.value
    });
    this.setState({
      amount: e.target.value
    });
  },

  render: function() {
    var materialNodes = this.props.data.map(function(comment) {
      return (
        <option key={comment.id}>
          {comment.name}-{comment.unit}
        </option>
      );
    });
    return (
      <div>
        <select
            onChange={this.handleMaterialChange}
            value={this.state.material}>
          <option>Välj Material</option>
          {materialNodes}
        </select>

        <input
          type="text"
          placeholder="Mängd"
          value={this.state.amount}
          onChange={this.handleAmountChange}
          />
      </div>
    );
  }
});

export default MaterialSelection;