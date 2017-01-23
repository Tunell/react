import React from "react";
import {Link} from "react-router";
import CSSModules from "react-css-modules";
import LoadJson from "./functions/LoadJson";
import {connect} from "react-redux";
import {fetchJsonWithSpecifiedStore} from "./materialGetters/materialGettersAction";
import styles from "./UsedMaterialsLog.less";


type Props = {
	usedMaterials: object
};

class UsedMaterialsLog extends React.Component {
	props: Props;

	constructor(props) {
		super(props);
	}

	async deleteMaterial(material: number) {
		const {fetchJsonWithSpecifiedStore} = this.props;
		try {
			const response = await LoadJson('/api/used-materials/' + material, "DELETE");

			const resourcesToLoad = [
				{key: "usedMaterials", url: 'api/used-materials'},
				{key: 'compositeMaterials', url: 'api/composite-materials'},
			];
			resourcesToLoad.map(resource => {
				fetchJsonWithSpecifiedStore(resource.key, resource.url)
			});

			console.log(response);
		} catch (e) {
			console.error("Error deleting material: ", e);
		}
	}

	render() {
		const {usedMaterials} = this.props;
		return (
			<table styleName="table">
				<tbody>
				<tr>
					<th>Material</th>
					<th>Amount</th>
					<th>Comment</th>
					<th>Created</th>
					<th>User</th>
					{/*<th>Edit</th>*/}
					<th>Delete</th>
				</tr>
				{usedMaterials
					.map(material => (
						<tr key={material.id}>
							<th>{material.composite_material_name}</th>
							<th>{material.amount}</th>
							<th>{material.comment}</th>
							{/*<th>{new Date(parseInt(material.created)).toString()}</th>*/}
							<th>{new Date(material.created).toLocaleDateString()}, {new Date(material.created).toLocaleTimeString()}</th>
							<th>{material.user_name}</th>
							{/*<th><Link to={'/api/materials/' + material.id}>Edit</Link></th>*/}
							<th onClick={() => this.deleteMaterial(material.id)}>Delete</th>
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
		usedMaterials: state.resources.usedMaterials.json,
	}),
	mapDispatchToProps
)(CSSModules(UsedMaterialsLog, styles))