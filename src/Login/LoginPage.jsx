// @flow
import React from "react";
import CSSModules from "react-css-modules";
import LoginBox from "./LoginBox";
import * as styles from "./LoginPage.less"

const LoginPage = () => (
	<div styleName="login-page">
		<h1 styleName="plant">Plant</h1>
		<h2 styleName="welcome">Inrapportering Hubben</h2>
		<LoginBox redirect={true}/>
	</div>
);

export default CSSModules(LoginPage,styles);