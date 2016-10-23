import React from 'react';
import MaterialList from './MaterialList.jsx';
import ConstructionForm from './ConstructionForm.jsx';
import { Link } from 'react-router'

export default class MaterialBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="material-box">
        <ConstructionForm url={this.props.url} materials={this.props.materials} constructionCreation={true}/>
        <MaterialList materials={this.props.materials} />
        <MaterialList materials={this.props.materials} allowComposite={true}/>
      </div>
    );
  }
};