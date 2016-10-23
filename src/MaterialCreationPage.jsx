import React from 'react';
import ConstructionForm from './ConstructionForm.jsx';
import { Link } from 'react-router'

export default class MaterialCreationPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="material-box">

        <h1>Lägg till ett material, prefabelement eller komplex-bygg-del:</h1>
        <p>Här kan du lägga till material till systemet som du sedan kan använda när du rapporterar in material</p>
        <ConstructionForm url={this.props.url} materials={this.props.materials} constructionCreation={true}/>
      </div>
    );
  }
};