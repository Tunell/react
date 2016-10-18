import $ from 'jquery';
import React from 'react';
import MaterialList from './MaterialList.jsx';
import ConstructionForm from './ConstructionForm.jsx';
import { Link } from 'react-router'

export default class MaterialBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.Materials
    }
  }

  handleMaterialSubmit(material) {
    var materials = this.props.Materials;
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    material.id = Date.now();
    var newMaterials = materials.concat([material]);
    this.setState({
      data: newMaterials
    });
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: material,
      success: function(data) {
        this.setState({
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({
          data: materials
        });
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    return (
      <div className="material-box">
        <Link to="material-list">Material Lista</Link>
        <ConstructionForm materials={this.props.Materials} onMaterialSubmit={this.handleMaterialSubmit}/>
        <h1>Material / Produkter</h1>
        <MaterialList data={this.props.Materials} />
        <h1>Prefab-material</h1>
        <MaterialList data={this.props.Materials} allowComposite={true}/>
      </div>
    );
  }
};