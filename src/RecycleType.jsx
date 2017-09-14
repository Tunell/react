import React from 'react';
import CSSModules from "react-css-modules";
import * as styles from "./RecycleType.less";
import svanen from "./img/svanen.svg";
import { arrayToObject } from './functions/arrayToObject'


function RecycleType({ id, recycleTypes }) {
	if (!id || !recycleTypes){
		return <span>-</span>
	}
	const displayNameMap = {
        'Ej återvunnen/återbrukad/vet ej': 'Vet ej',
		'Miljöcertifierat (FSC eller Svanen)': (<img styleName="svanen" src={svanen}/>),
		'Återvunnen': 'Återvunnet',
        'Återbrukat': 'Återbrukat'
	};

	const recycleTypesWithText = recycleTypes.map( recycleType =>
		({ ...recycleType, displayName: displayNameMap[recycleType.name] })
	);
	const recycleTypesWithTextMap = arrayToObject(recycleTypesWithText, 'id');


	return <span>{recycleTypesWithTextMap[id].displayName}</span>
}

export default CSSModules(RecycleType, styles);
