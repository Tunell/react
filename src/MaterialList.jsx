import React from 'react';
import Material from './Material.jsx';



class MaterialList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      compositeList: this.props.allowComposite || ( this.props.route && this.props.route.allowComposite),
      materialUsageList: this.props.materialUsageList || ( this.props.route && this.props.route.materialUsageList),
      complex: false
    };
    this.handleListChange = this.handleListChange.bind(this);
  };
  handleListChange(listType){
    switch(listType){
      case 'building':
        this.setState({
          materialUsageList: true,
          compositeList: false,
          complex: false
        });
        break;
      case 'prefab':
        this.setState({
          materialUsageList: false,
          compositeList: true,
          complex: false
        });
        break;
      case 'material':
        this.setState({
          materialUsageList: false,
          compositeList: false,
          complex: false
        });
        break;
      case 'complex':
        this.setState({
          materialUsageList: false,
          compositeList: false,
          complex: true
        });
        break;
    }

  }
  render(){
    const { materialUsageList, compositeList } = this.state;
    let materialUsage = {};
    const materialNodes = this.props.materials.map((material)=> {
      // Lista Prefab material
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
      // Lista Använt material i byggnaden
      if( materialUsageList && material.name == 'byggnad01' ){
        { material.materialComposition.map((constructionPart)=>{
            if( typeof materialUsage[constructionPart.material] == 'undefined' ){
              materialUsage[constructionPart.material] = parseInt(constructionPart.amount);
            }else{
              materialUsage[constructionPart.material] += parseInt(constructionPart.amount)
            }
          }
        )}
      }

      // Lista grund-material
      if(!materialUsageList && typeof material.materialComposition == 'undefined'){
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
        <h1>Listning av material</h1>
        <button onClick={(e)=>this.handleListChange('material')}>Material</button>
        {/*<button onClick={(e)=>this.handleListChange('complex')}>Komplex</button>*/}
        <button onClick={(e)=>this.handleListChange('prefab')}>Prefab</button>
        <button onClick={(e)=>this.handleListChange('building')}>Använt material</button>
        {compositeList ?
          <h1>Prefabmaterial:</h1>:
          <h1>Material och Produkter</h1>
        }
        {materialNodes}
        {materialUsageNodes}
      </div>
    );
  }
};

export default MaterialList;