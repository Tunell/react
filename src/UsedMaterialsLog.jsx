import React from "react";
import {Link} from "react-router";
import LoadJson from "./functions/LoadJson";

type Props = {
	usedMaterials: object
};

export default class UsedMaterialsLog extends React.Component {
	props: Props;

	constructor(props) {
		super(props);
	}

	static async deleteMaterial(material: number) {
		try {
			const response = await LoadJson('/api/used-materials/' + material, "DELETE");

			console.log(response);
		} catch (e) {
			console.error("Error deleting material: ", e);
		}
	}

	render() {
		const {usedMaterials} = this.props;
		return (
			<table>
				<tbody>
				<tr>
					<th>Material</th>
					<th>Amount</th>
					<th>Comment</th>
					<th>Created</th>
					<th>User</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
				{usedMaterials
					.map(material => (
						<tr key={material.id}>
							<th>{material.id}</th>
							<th>{material.amount}</th>
							<th>{material.comment}</th>
							<th>{new Date(parseInt(material.created)).toString()}</th>
							<th>{material.user_id}</th>
							<th><Link to={'/api/materials/' + material.id}>Edit</Link></th>
							<th onClick={() => this.deleteMaterial(material.id)}>Delete</th>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}