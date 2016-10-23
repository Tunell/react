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
        <ConstructionForm url={this.props.url} materials={this.props.materials} onMaterialSubmit={this.handleMaterialSubmit} constructionCreation={true}/>
      </div>
    );
  }
};