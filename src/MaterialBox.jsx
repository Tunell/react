import $ from 'jquery';
import React from 'react';
import MaterialList from './MaterialList.jsx';
import ConstructionForm from './ConstructionForm.jsx';


const MaterialBox =  React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleMaterialSubmit: function(material) {
    var materials = this.state.data;
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
  },
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="material-box">
        <h1>Skapa nytt material eller konstruktioner:</h1>
        <ConstructionForm materials={this.state.data} onMaterialSubmit={this.handleMaterialSubmit}/>
        <h1>Råmaterial</h1>
        <MaterialList data={this.state.data} />
        <h1>Sammansatta Material</h1>
        <MaterialList data={this.state.data} allowComposite={true}/>
      </div>
    );
  }
});

export default MaterialBox;