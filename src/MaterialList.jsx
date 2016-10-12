import React from 'react';
import Material from './Material.jsx';

const MaterialList = React.createClass({
  render: function() {
    var materialNodes = this.props.data.map((material)=> {
      if(this.props.allowComposite){
        if(typeof material.materialComposition == 'undefined'){
          return;
        }
        return (
          <Material name={material.name} key={material.id} composite={true}>
            <div>
              <ul>
                {material.materialComposition.map((constructionPart)=>
                  <li key={constructionPart.material}>
                  {this.props.data.map((data)=>(
                    constructionPart && data.id == constructionPart.material && data.name)
                  )}
                  : {constructionPart && constructionPart.amount}&nbsp;
                  {this.props.data.map((data)=>(
                    constructionPart && data.id == constructionPart.material && data.unit)
                  )}
                </li>
                  )}
              </ul>
            </div>
          </Material>
        );
      }

      if(typeof material.materialComposition != 'undefined'){
        return
      }
      return (
        <Material name={material.name} key={material.id}>
          {material.unit}
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