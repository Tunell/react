// @flow
import React from "react";
import {connect} from "react-redux";
import {changeUser} from "../Login/loginAction.jsx";

const LoginPage = ({changeUser, user}: {changeUser: any, user: number}) => (
	<div>
		<p style={{color:'red'}}>TODO: Lägg till lösenord till hela sidan</p>
		<br/>
		<select value={user} onChange={event => changeUser(event.target.value)}>
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
);

const mapDispatchToProps = (dispatch) => ({
	changeUser: user => dispatch(changeUser(user))
});

export default connect(
	(state) => ( {
		user: state.user
	}),
	mapDispatchToProps
)(LoginPage)