import React from "react";
import ConstructionForm from "../ConstructionForm";
import UsedMaterialsLog from "../UsedMaterialsLog";
import {Link} from "react-router";
import {connect} from "react-redux";
import { arrayToObject } from '../functions/arrayToObject'

type Props = {
	materials: object,
	usedMaterials: object,
	users: object,
	user: string,
	url: string
};

const mapStateToProps = (state) => ({
  user: state.user,
  users: state.resources.users.json,
});

@connect(mapStateToProps)
export default class MaterialReportPage extends React.Component {
	props: Props;

	constructor(props) {
		super(props);
	}

	render() {
		const {usedMaterials, url, recycleTypes, users, user} = this.props;
		const usersMap = users ? arrayToObject(users, 'id') : {}

		return (
			<div className="material-box">

				<h1>Rapportera använt material</h1>
				<h2>{usersMap[user] ? usersMap[user].name : null}</h2>
				<p>Här kan du rapportera villket material som har använts.<br/>
					Använd det vänstra fältet för att söka på det material du vill lägga in. <br/>
					Du söker då på grundmaterial samt de byggdelar du har skapat.<br/>
					Består det du vill rapportera in av flera material? Klicka då på <Link to="/skapa-material"
					                                                                       activeClassName="active">Skapa byggdel</Link>.

				</p>
				<ConstructionForm
					url={url}
					constructionCreation={false}
					constructionParts={1}
					recycleTypes={recycleTypes}
				/>
				<div>
					<UsedMaterialsLog usedMaterials={usedMaterials} recycleTypes={recycleTypes}/>
				</div>
			</div>

		);
	}
};
