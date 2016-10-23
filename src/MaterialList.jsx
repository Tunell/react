import React from 'react';
import Material from './Material.jsx';

const MaterialList = React.createClass({
  render: function() {
    const compositeList = this.props.allowComposite || ( this.props.route && this.props.route.allowComposite);
    const materialUsageList = this.props.materialUsageList || ( this.props.route && this.props.route.materialUsageList);
    let materialUsage = {};
    const materialNodes = this.props.materials.map((material)=> {
      if(compositeList  && material.name != 'byggnad01'){
        if(typeof material.materialComposition == 'undefined'){
          return;
        }
        return (
          <Material name={material.name} key={material.id} composite={true}>
            <ul>{/*Composite parts*/}
              {material.materialComposition.map((constructionPart)=>
                <li key={constructionPart.material}>
                {this.props.materials.map((mataterial)=>(
                  constructionPart && mataterial.id == constructionPart.material && mataterial.name)
                )}
                : {constructionPart && constructionPart.amount}&nbsp;
                {this.props.materials.map((mataterial)=>(
                  constructionPart && mataterial.id == constructionPart.material && mataterial.unit)
                )}
              </li>
                )}
            </ul>
          </Material>
        );
      }
      if(materialUsageList && material.name == 'byggnad01'){
        {material.materialComposition.map((constructionPart)=>{
            if(typeof materialUsage[constructionPart.material] == 'undefined'){
              materialUsage[constructionPart.material] = parseInt(constructionPart.amount);
            }else{
              materialUsage[constructionPart.material] += parseInt(constructionPart.amount)
            }
          }
        )}

      }

      if(typeof material.materialComposition != 'undefined'){
        return
      }
      if(!materialUsageList){
        return (
          <Material name={material.name} key={material.id}>
            {material.unit}
          </Material>
        );
      }
    });
    let materialUsageArr = [];
    let i = 0;
    let materialUsageNodes;
    if(materialUsageList){
      Object.keys(materialUsage).map((k) => {
        materialUsageArr[i++]={id: k, amount:materialUsage[k]}
      })
      materialUsageNodes = materialUsageArr.map((material)=> {
        return (<div key={material.id}>
        {this.props.materials.filter(
                (filterMatierial)=> filterMatierial.id == material.id 
              ).map(
                (filterMatierial)=> {
                  return filterMatierial.name
                }
              )}
            : {material.amount}
          </div>);
      })
    }
    return (
      <div className="materialList">
        {compositeList ?
          <h1>Prefab Material:</h1>:
          <h1>Material och Produkt Lista</h1>
        }
        {materialNodes}
        {materialUsageNodes}
      </div>
    );
  }
});

export default MaterialList;