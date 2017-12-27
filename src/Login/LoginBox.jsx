// @flow
import React from "react";
import {connect} from "react-redux";
import CSSModules from "react-css-modules";
import {changeUser} from "./loginAction.jsx";
import styles from "./LoginBox.less";
import {browserHistory} from "react-router";


const mapStateToProps = (state) => ({
	user: state.user,
	users: state.resources.users.json ? state.resources.users.json : [],
});
const mapDispatchToProps = (dispatch, ownProps) => ({
	changeUser: user => {
		if(ownProps.redirect){
			browserHistory.push('/rapportera');
		}
		return dispatch(changeUser(user));
	}
});

const LoginBox = ({changeUser, user, users}: {changeUser: any, user: number, users: [Object]}) => (
	<select
		value={user}
		onChange={(event)=>changeUser(event.target.value)}
		styleName="user"
	>
		<option disabled defaultValue>Logga In</option>
		{users.map(user =>
			<option key={user.id} value={user.id}>{user.name} </option>
		)}
	</select>
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CSSModules(LoginBox, styles))

