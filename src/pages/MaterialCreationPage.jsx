import React from "react";
import ConstructionForm from "../ConstructionForm.jsx";

export default class MaterialCreationPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {url, materials, recycleTypes} = this.props;
		return (
			<div className="material-box">

				<h1>Här kan du skapa byggdelar:</h1>
				<p>En byggdel lägger du till systemet för att använda när du rapporterar in material. På så sätt kan du återanvända samma element flera gånger</p>
				<ConstructionForm
					url={url}
					constructionCreation={true}
					recycleTypes={recycleTypes}
				/>
			</div>
		);
	}
};