import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';

import styles from './TopMenu.less';

class TopMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div>
    		<div styleName="menu-bar">
		    	<div styleName="menu">
		    		<Link to="/" activeClassName="active">Rapportera använt material</Link>
		    		<Link to="/skapa-material" activeClassName="active">Skapa nytt material</Link>
		        	<Link to="/material-list" activeClassName="active">Materiallista</Link>
		        	<Link to="/prefab-material-list" activeClassName="active">Prefablista</Link>
		        	<Link to="/anvant-material" activeClassName="active">Använt material</Link>
		        	{/*<Link to="/combo-vy" activeClassName="active">Kombinerad (test) vy </Link>*/}
				</div>
			</div>
        	<div id="main-content">
        		{React.cloneElement(this.props.children)}
        	</div>
        </div>
    );
  }
};

export default CSSModules(TopMenu, styles)