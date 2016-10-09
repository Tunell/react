import React from 'react';
import marked from 'marked';

const Material = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {
      sanitize: true
    });
    return {
      __html: rawMarkup
    };
  },
  render: function() {
    return (
      <div className="material">
            <span className="name">
            {this.props.name}
            </span> -
            <span className="unit" dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
      );
  }
});

export default Material;