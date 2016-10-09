import React from 'react';
import Material from './Material.jsx';

const MaterialList = React.createClass({
  render: function() {
    var materialNodes = this.props.data.map(function(comment) {
      return (
        <Material name={comment.name} key={comment.id}>
          {comment.unit}
        </Material>
      );
    });
    return (
      <div className="materialList">
        {materialNodes}
      </div>
    );
  }
});

export default MaterialList;