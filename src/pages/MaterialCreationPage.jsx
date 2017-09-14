import React from "react";
import ConstructionForm from "../ConstructionForm.jsx";
import {connect} from "react-redux";
import { arrayToObject } from '../functions/arrayToObject'

const mapStateToProps = (state) => ({
  user: state.user,
  users: state.resources.users.json,
});

@connect(mapStateToProps)
export default class MaterialCreationPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {url, materials, recycleTypes, users, user} = this.props;
    const usersMap = users ? arrayToObject(users, 'id') : {}

		return (
			<div className="material-box">

				<h1>Här kan du skapa byggdelar:</h1>
				<h2>{usersMap[user] ? usersMap[user].name : null}</h2>
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
