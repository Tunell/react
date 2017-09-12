import React from "react";
import {connect} from "react-redux";
import CSSModules from "react-css-modules";
import * as styles from "./UsedMaterialsList.less";
import { getMaterialUsage } from './functions/amountCalculation'

type Props = {
	usedMaterials: object,
	compositeMaterials: object
};

const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
  }, {})

function mapStateToProps(state, ownProps) {
	return {
		usedMaterials: state.resources.usedMaterials.json,
		compositeMaterials: state.resources.compositeMaterials.json,
		materials: state.resources.materials.json,
		recycleTypes: state.resources.recycleTypes.json,
	};
}

@connect(mapStateToProps)
@CSSModules(styles)
export default class UsedMaterialsList extends React.Component {
	props: Props;

	state = {
		materialUsage: {}
	};

	componentDidMount() {
		const {usedMaterials, compositeMaterials, materials} = this.props;
		const materialsMap = arrayToObject(materials, 'id')
		const materialUsage = getMaterialUsage(usedMaterials, materials, compositeMaterials, materialsMap)
    this.setState({
      materialUsage
    })
  }

  render() {
    const {materialUsage} = this.state;
    const {recycleTypes} = this.props;

    //calculate the sum of all materials


    let i = 0;
    let materialUsageArr = [];
    Object.keys(materialUsage).map((material) => {
      materialUsageArr[i++] = <tr styleName="row">
				<td styleName="cell">{material}</td>
        {recycleTypes.map((recycleClass) => (
					<td styleName="cell" key={recycleClass.id}>
            {materialUsage[material][recycleClass.name] ?
              materialUsage[material][recycleClass.name] :
              0
            } kg {/*: {recycleClass}*/}
					</td>
        ))}
			</tr>
    });

    return (
			<div>
				<table styleName="table">
					<thead>
					<tr>
						<th styleName="cell">Material</th>
            {recycleTypes.map((recycleClass) =>
							<th styleName="cell">{recycleClass.name}</th>
            )}
					</tr>
					</thead>
					<tbody>
          {materialUsageArr.map(material => (
            material
          ))}
					</tbody>
				</table>
			</div>
    )
  }
}

