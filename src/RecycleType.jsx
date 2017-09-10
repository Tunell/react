import React from 'react';
import CSSModules from "react-css-modules";
import * as styles from "./RecycleType.less";

function RecycleType({id,name}) {
	const recycleText = ["invalid", "ej åter.", "åter.", "ospec."];
	if(id === 4){
		return <img styleName="svanen" src="../public/svanen.svg"/>
	}
	return (
		<span>{recycleText[id]}</span>
	);
}

export default CSSModules(RecycleType, styles);
