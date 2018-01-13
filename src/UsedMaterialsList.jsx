import React from "react";
import {connect} from "react-redux";
import CSSModules from "react-css-modules";
import * as styles from "./UsedMaterialsList.less";
import { getMaterialUsage } from './functions/amountCalculation'
const { formatToExcel } = require('./spreadsheet-utils/formatToExcel')
import * as Excel from 'exceljs/dist/exceljs.min.js'

import saveAs from 'file-saver';
import spreadSheetUtils from './spreadsheet-utils/addDataToSheet'

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

  handleExportClick = async () => {
    const { usedMaterials, compositeMaterials, materials } = this.props;
    const materialsMap = arrayToObject(materials, 'id')
    const { tableData: materialUsageAll } = formatToExcel('Total', getMaterialUsage(usedMaterials, materials, compositeMaterials, materialsMap) )

    const usedMaterialContractor = usedMaterials.reduce((materialUsageContractor, usedMaterial) => {
      return materialUsageContractor[usedMaterial.user_name]
        ? { ...materialUsageContractor, [usedMaterial.user_name]: [...materialUsageContractor[usedMaterial.user_name], usedMaterial] }
        : { ...materialUsageContractor, [usedMaterial.user_name]: [usedMaterial] }
    }, {})

    const materialUsageContractors = Object.entries(usedMaterialContractor).map(([contractor, usedMaterialsContractor]) => {
      return formatToExcel(contractor,
        getMaterialUsage(usedMaterialsContractor, materials, compositeMaterials, materialsMap)
      )
    })

    const workbook = new Excel.Workbook()

    workbook.creator = 'Plant';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    const sheetSummary = workbook.addWorksheet('Sammanställning')
    spreadSheetUtils.addSummary(sheetSummary, 'HUBBEN', materialUsageAll)

    const sheetBTA = workbook.addWorksheet('Per BTA-yta')
    spreadSheetUtils.addPerBTA(sheetBTA, 'HUBBEN', materialUsageAll)

    materialUsageContractors.forEach(({ contractor, tableData}) => {
      const sheetContractor = workbook.addWorksheet(contractor)
      spreadSheetUtils.addContractor(sheetContractor, contractor, tableData)
    })

    /* the saveAs call downloads a file on the local machine */
    workbook.xlsx.writeBuffer().then( data => {
      const blob = new Blob( [data], {type: "application/octet-stream"} );
      saveAs.saveAs(new Blob([blob],{type:"application/octet-stream"}), 'hubben-project-report.xlsx');
    });
  }

  render() {
    const {materialUsage} = this.state;
    const {recycleTypes} = this.props;

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
      <div styleName="table-wrapper">
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
          <button onClick={this.handleExportClick}>Export xlx</button>
      </div>
    )
  }
}

