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
      <div className={this.props.composite && "composite " + "material"}>
            <span className="name">
            {this.props.name}
            </span> -
            {this.props.composite ? <div className="constructionPart">{this.props.children}</div>
            : <span className="unit">{this.props.children}</span>}
      </div>
      );
  }
});

export default Material;