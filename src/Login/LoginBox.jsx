// @flow
import React from "react";
import {connect} from "react-redux";
import {changeUser} from "./loginAction.jsx";

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

const mapDispatchToProps = (dispatch) => ({
	changeUser: user => dispatch(changeUser(user))
});

export default connect(
	(state) => ( {
		user: state.user,
		users: state.resources.users.json ? state.resources.users.json : [],
	}),
	mapDispatchToProps
)(LoginBox)