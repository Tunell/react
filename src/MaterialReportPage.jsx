import React from 'react';
import ConstructionForm from './ConstructionForm.jsx';
import { Link } from 'react-router'

export default class MaterialReportPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="material-box">
        <ConstructionForm url={this.props.url}
          materials={this.props.materials}
          onMaterialSubmit={this.handleMaterialSubmit}
          constructionParts={1}
          constructionName="byggnad01"/>
      </div>
    );
  }
};