import React from "react";

class Material extends React.Component {
	render() {
		const {material, composite} = this.props;
		return (
			<div key={material.material_id} className={ composite && "composite " + "material_id" }>
            <span className="name">
            { material.name }
            </span>
				{ composite && !!material.composite_has_materials &&
					<span className="unit"> - { material.unit_name }
						<ul>
						{material.composite_has_materials && material.composite_has_materials.map(rawMaterial =>
							<li key={ rawMaterial.material_id }>
	                          <span>
	                            <span>{ rawMaterial.material_name }</span> :
	                            <span>&nbsp;{ rawMaterial.amount }</span>
	                            <span>&nbsp;{ rawMaterial.unit_name } { rawMaterial.recycle_type_name }</span>
	                          </span>
							</li>
						)}
						</ul>
					</span>
				}
			</div>
		);
	}
}

export default Material;