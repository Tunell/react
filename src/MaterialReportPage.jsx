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

      <div>
        <h1>Rapportera använt material</h1>
      </div>
      <p>Här kan du rapportera villket material som har använts.<br/>
        Använd det vänstra fältet för att söka på det material du vill lägga in.
      </p>
        <ConstructionForm url={this.props.url}
          materials={this.props.materials}
          constructionParts={1}
          constructionName="byggnad01"/>
      </div>
    );
  }
};