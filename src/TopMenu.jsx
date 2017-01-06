import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import {changeUser} from './Login/loginAction.jsx'

import styles from './TopMenu.less';

class TopMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	const { changeUser, user } = this.props;
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
            <select value={user} onChange={(event)=>changeUser(event.target.value)}>
              <option>
                Typ av entrepenad
              </option>
              <option value="1">
                Grundläggnings-entreprenad
              </option>
              <option value="3">
                El-entreprenad
              </option>
              <option value="2">
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



const mapDispatchToProps = (dispatch) => ({
	changeUser: user => dispatch(changeUser(user))
});

export default connect(
	(state) => ( {
		user: state.user
	}),
	mapDispatchToProps
)(CSSModules(TopMenu, styles))