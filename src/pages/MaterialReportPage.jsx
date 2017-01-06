import React from 'react';
import ConstructionForm from '../ConstructionForm.jsx';
import UsedMaterialsLog from '../UsedMaterialsLog.jsx';
import { Link } from 'react-router'

type Props = {
	materials: object,
	url: string
};

export default class MaterialReportPage extends React.Component {
	props: Props;
  constructor(props) {
    super(props);
  }

  render() {
    const {materials, url} = this.props;
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
      <p style={{color:'red'}}>TODO: Filtrera lista beroende på entreprenad-typ, Fltrera ner listan(man ser allt från start).</p>
        <ConstructionForm url={url}
          materials={materials}
          constructionParts={1}
          constructionName="byggnad01"/>
        <UsedMaterialsLog materials={materials}/>
      </div>

    );
  }
};