// @flow
import React from "react";
import {connect} from "react-redux";
import {changeUser} from "../Login/loginAction.jsx";

const LoginPage = ({changeUser, user, users}: {changeUser: any, user: number, users: [Object]}) => (
	<div>
		<p style={{color:'red'}}>TODO: Lägg till lösenord till hela sidan</p>
		<br/>
		<select
			value={user}
			onChange={(event)=>changeUser(event.target.value)}
			styleName="user"
		>
			<option disabled defaultValue>Logga In</option>
			{users && users.map(user =>
				<option key={user.id} value={user.id}>{user.name} </option>
			)}
		</select>
	</div>
);

const mapDispatchToProps = (dispatch) => ({
	changeUser: user => dispatch(changeUser(user))
});

export default connect(
	(state) => ( {
		user: state.user,
		users: state.resources.users && state.resources.users.json,
	}),
	mapDispatchToProps
)(LoginPage)