import React from "react";
import ConstructionForm from "../ConstructionForm";
import UsedMaterialsLog from "../UsedMaterialsLog";
import {Link} from "react-router";

type Props = {
	materials: object,
	usedMaterials: object,
	url: string
};

export default class MaterialReportPage extends React.Component {
	props: Props;
  constructor(props) {
    super(props);
  }

  render() {
		const {usedMaterials, url, recycleTypes} = this.props;
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
				<p style={{color:'red'}}>TODO: Filtrera lista beroende på entreprenad-typ.</p>
				<ConstructionForm
					url={url}
					constructionCreation={false}
					constructionParts={1}
					recycleTypes={recycleTypes}
				/>
				<UsedMaterialsLog usedMaterials={usedMaterials}/>
      </div>

    );
  }
};