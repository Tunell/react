import React from "react";
import CSSModules from "react-css-modules";
import RecycleType from "./RecycleType.jsx";
import * as styles from "./Material.less";

class Material extends React.Component {
	render() {
		const {material, composite, recycleTypes} = this.props;
		return (
			<div key={material.material_id} className={ composite && "composite " + "material_id" } styleName="box">
            <div styleName="header-row">
							<h2 styleName="name">{ material.name }</h2>
							<span styleName="unit"><strong>Enhet:</strong> { material.unit_name }</span>
						</div>
				{ composite && !!material.composite_has_materials &&
					<div>
						<ul styleName="raw-material-list">
						{material.composite_has_materials && material.composite_has_materials.map(rawMaterial =>
							<li key={ material.name + rawMaterial.material_id } styleName="list-item">
									<span>
										{ rawMaterial.amount } { rawMaterial.unit_name }
										<span styleName="raw-material">{ rawMaterial.material_name }</span> :
										<span styleName="recycle-type"><RecycleType id={rawMaterial.recycle_type_id} recycleTypes={recycleTypes}/></span>
									</span>
							</li>
						)}
						</ul>
					</div>
				}
			</div>
		);
	}
}

export default CSSModules(Material, styles);