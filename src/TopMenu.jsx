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
            <Link to="/rapportera" activeClassName="active"> Rapportera använt material
            </Link>
            <Link to="/skapa-material" activeClassName="active"> Skapa byggdel
            </Link>
            <Link to="/material-list" activeClassName="active"> Min Materiallista
            </Link>
            <Link to="/logga-in" activeClassName="active"> Logga in
            </Link>
            { /*<Link to="/prefab-material-list" activeClassName="active">Prefablista</Link>
                                    <Link to="/anvant-material" activeClassName="active">Använt material</Link>
                                    <Link to="/combo-vy" activeClassName="active">Kombinerad (test) vy </Link>*/ }
            <select style={ { border: '1px solid red' } }>
              <option>
                Typ av entrepenad
              </option>
              <option>
                Grundläggnings-entreprenad
              </option>
              <option>
                El-entreprenad
              </option>
              <option>
                VVS-entreprenad
              </option>
            </select>
          </div>
        </div>
        <div id="main-content">
          { React.cloneElement(this.props.children) }
        </div>
      </div>
      );
  }
}
;

export default CSSModules(TopMenu, styles)