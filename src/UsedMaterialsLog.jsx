import React from 'react';

class UsedMaterialsLog extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {materials} = this.props;
		let materialUsageArr = [];
		materials.map(material => {
			if (material.name == 'byggnad01') {
				material.materialComposition && material.materialComposition.map((rawMaterial) => {
					materialUsageArr.push(rawMaterial);
				});
			}
		});
		return (
			<table>
				<tbody>
					<tr>
						<th>Material</th>
						<th>Amount</th>
						<th>Comment</th>
						<th>Created</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
					{materialUsageArr.map(material => (
						<tr key={material.material + material.created}>
							<th>
								{materials.filter(
									filterMatierial => filterMatierial.id == material.material
								).map(filterMatierial => {
									return filterMatierial.name
								})
								}</th>
							<th>{material.amount}</th>
							<th>{material.comment}</th>
							<th>{new Date(parseInt(material.created)).toString()}</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					))}
				</tbody>
			</table>
		)
	}
}

export default UsedMaterialsLog;