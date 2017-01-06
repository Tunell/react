import React from 'react';
import { Link } from 'react-router';


type Props = {
	materials: object
};

export default class UsedMaterialsLog extends React.Component {
	props: Props;

	constructor(props) {
		super(props);
	}

	static async deleteMaterial(material: number){
		const response = await fetch('/api/materials/' + material, {
			method: 'DELETE'
		});
		console.log(response);
	}

	render() {
		const { materials } = this.props;
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
				{materials
					.filter(material => material.name === 'byggnad01')
					.map(material => (
						<tr key={material.id}>
							<th>{material.name}</th>
							<th>{material.materialComposition[0].amount}</th>
							<th>{material.materialComposition[0].comment}</th>
							<th>{new Date(parseInt(material.materialComposition[0].created)).toString()}</th>
							<th>{material.User_id}</th>
							<th><Link to={'/api/materials/' + material.id}>Edit</Link></th>
							<th onClick={() => this.deleteMaterial(material.id)}>Delete</th>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}