import React from "react";
import CSSModules from "react-css-modules";
import LoadJson from "./functions/LoadJson";
import {connect} from "react-redux";
import {fetchJsonWithSpecifiedStore} from "./materialGetters/materialGettersAction";
import styles from "./UsedMaterialsLog.less";
import FaTrashO from 'react-icons/lib/fa/trash-o'
import RecycleType from "./RecycleType.jsx";


type Props = {
	usedMaterials: object
};

class UsedMaterialsLog extends React.Component {
	props: Props;

	async deleteMaterial(material: number) {
		const {user, fetchJsonWithSpecifiedStore} = this.props;
		try {
			const response = await LoadJson('/api/used-materials/' + material, "DELETE");

			const resourcesToLoad = [
				{key: "usedMaterials", url: `/api/used-materials?user_id=${user}`},
				{key: 'compositeMaterials', url: `/api/composite-materials?user_id=${user}`},
			];
			resourcesToLoad.map(resource => {
				fetchJsonWithSpecifiedStore(resource.key, resource.url)
			});

			//console.log(response);
		} catch (e) {
			console.error("Error deleting material: ", e);
		}
	}

	render() {
		const {usedMaterials} = this.props;
		const recycle_short = ["invalid", "Nej", "Ja", "Vet Ej", <img styleName="svanen" src="../public/svanen.svg"/>]
		return (
			<table styleName="table">
				<thead>
				<tr>
					<th>Material</th>
					<th>Antal</th>
					<th>Enhet</th>
					<th>Återvunnet</th>
					<th>Kommentar</th>
					<th>Skapad</th>
					<th>Användare</th>
					{/*<th>Edit</th>*/}
					<th>Delete</th>
				</tr>
				</thead>
				<tbody>
				{usedMaterials && usedMaterials.length > 0 && usedMaterials
					.sort((a,b)=> new Date(b.created) - new Date(a.created))
					.map(material => (
						<tr key={material.id}>
							<th>{material.used_has_material_name}</th>
							<th>{material.amount}</th>
							<th>{material.unit_name}</th>
							<th><RecycleType id={material.recycle_type_id}/></th>
							<th>{material.comment}</th>
							{/*<th>{new Date(parseInt(material.created)).toString()}</th>*/}
							<th>{!!material.created && new Date(material.created).toLocaleDateString()}{!!material.created && ", " + new Date(material.created).toLocaleTimeString()}</th>
							<th>{material.user_name}</th>
							{/*<th><Link to={'/api/materials/' + material.id}>Edit</Link></th>*/}
							<th onClick={() => this.deleteMaterial(material.id)} styleName="delete"><FaTrashO size={20}/></th>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}


const mapDispatchToProps = (dispatch) => ({
	fetchJsonWithSpecifiedStore: (reduxStorageUrl, urlWithParamsuser) => dispatch(fetchJsonWithSpecifiedStore(reduxStorageUrl, urlWithParamsuser))
});

export default connect(
	(state) => ( {
		user: state.user,
		usedMaterials: state.resources.usedMaterials.json,
	}),
	mapDispatchToProps
)(CSSModules(UsedMaterialsLog, styles))