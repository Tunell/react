import React from 'react';
import CSSModules from "react-css-modules";
import * as styles from "./RecycleType.less";
import svanen from "./img/svanen.svg";
import { arrayToObject } from './functions/arrayToObject'


function RecycleType({ id, recycleTypes }) {
	console.log(recycleTypes)
	const displayNameMap = {
    'Ej återvunnet/återanvänt': 'Ej Åter',
		'Miljöcertifierat (FSC eller Svanen)': (<img styleName="svanen" src={svanen}/>),
		'Vet Ej': '',
    'Återvunnet/återanvänt': 'Åter.'
	}

	const recycleTypesWithText = recycleTypes.map( recycleType => ({ ...recycleType, displayName: displayNameMap[recycleType.name] }) )
	const recycleTypesWithTextMap = arrayToObject(recycleTypesWithText, 'id')


	if (!id) return null
	return <span>{recycleTypesWithTextMap[id].displayName}</span>
}

export default CSSModules(RecycleType, styles);
