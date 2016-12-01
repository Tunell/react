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
        Använd det vänstra fältet för att söka på det material du vill lägga in. <br/>
        Du söker då på grundmaterial samt de byggdelar du har skapat.<br/>
        Består det du vill rapportera in av flera material? Klicka då på <Link to="/skapa-material" activeClassName="active">Skapa byggdel</Link>.

      </p>
      <p style={{color:'red'}}>TODO: Filtrera lista beroende på entreprenad-typ, Lägg till kommentars fält per material, Lägg in "Typ av material" när man väljer grund-material, Fltrera ner listan(man ser allt från start).</p>
        <ConstructionForm url={this.props.url}
          materials={this.props.materials}
          constructionParts={1}
          constructionName="byggnad01"/>
        <p style={{color:'red'}}>TODO: <a href="https://waffle.io/Tunell/react/cards/583ef2dd11fd054901cba277" target="_blank">Mina inrapporterade material (logg)</a>:</p>
      </div>

    );
  }
};