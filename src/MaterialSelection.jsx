import React from 'react';
import Material from './Material.jsx';

const MaterialSelection = React.createClass({
  render: function() {
    var materialNodes = this.props.data.map(function(comment) {
      return (
        <option key={comment.id}>
          {comment.name}-{comment.unit}
        </option>
      );
    });
    return (
      <select>
        <option>Välj Material</option>
        {materialNodes}
      </select>
    );
  }
});

export default MaterialSelection;