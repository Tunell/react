import React from 'react';
import marked from 'marked';

class Material extends React.Component {

  rawMarkup() {
    const rawMarkup = marked(this.props.children.toString(), {
      sanitize: true
    });
    return {
      __html: rawMarkup
    };
  }

  render() {
    const { composite, name, materialComposition, materialObjects, unit } = this.props;
    return (
      <div className={ composite && "composite " + "material" }>
            <span className="name">
            { name }
            </span> - <span className="unit">{ unit }</span>
            { composite &&
                  <ul>
                    { materialComposition && materialComposition.map(rawMaterial => (
                      <li key={ rawMaterial.material }>
                          <span>
                            <span>{ materialObjects[rawMaterial.material].name }</span> :
                            <span>&nbsp;{ rawMaterial.amount }</span>
                            <span>&nbsp;{ materialObjects[rawMaterial.material].unit }
                            { rawMaterial.RecycleClassID && " RecycleClass: " + rawMaterial.RecycleClassID }</span>
                          </span>
                      </li>)
                    )}
                  </ul>
            }
      </div>
    );
  }
}

export default Material;