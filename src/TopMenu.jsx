import React from "react";
import {Link} from "react-router";
import CSSModules from "react-css-modules";
import LoginBox from "./Login/LoginBox";
import styles from "./TopMenu.less";
import plantLogo from "./img/plant-logga.png"

@CSSModules(styles)
export default class TopMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {children} = this.props;
		return (
			<div>
				<div styleName="menu-bar">
					<div styleName="menu">
						<Link to="/" styleName="logga"><img src={plantLogo}/></Link>
						<Link to="/rapportera" activeClassName="active"> Rapportera använt material
						</Link>
						<Link to="/skapa-material" activeClassName="active"> Skapa byggdel
						</Link>
						<Link to="/material-list" activeClassName="active"> Min Materiallista
						</Link>
						{ /*<Link to="/prefab-material-list" activeClassName="active">Prefablista</Link>
						 <Link to="/anvant-material" activeClassName="active">Använt material</Link>
						 <Link to="/combo-vy" activeClassName="active">Kombinerad (test) vy </Link>*/ }
						<LoginBox/>
					</div>
				</div>
				<div id="main-content">
					{ React.cloneElement(children) }
				</div>
			</div>
		);
	}
}


