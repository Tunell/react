import React from "react";
import CSSModules from "react-css-modules";
import styles from "./MainStyles.less";
import {connect} from "react-redux";
import {fetchJsonWithSpecifiedStore} from "./materialGetters/materialGettersAction";

class LoadMaterials extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			compositeMaterials: [],
			usedMaterials: [],
			materials: [],
			recycleTypes: []
		};
	}

	componentWillMount() {
		const {fetchJsonWithSpecifiedStore} = this.props;
		const resourcesToLoad = [
			{key: "usedMaterials", url: '/api/used-materials'},
			{key: 'compositeMaterials', url: '/api/composite-materials'},
			{key: 'materials', url: '/api/materials'},
			{key: 'recycleTypes', url: '/api/recycle-types'},
			{key: 'units', url: '/api/units'},
			{key: 'users', url: '/api/users'}
		];
		resourcesToLoad.map(resource => {
			fetchJsonWithSpecifiedStore(resource.key, resource.url)
		});
	}

	render() {
		return (
			<div>
				{React.cloneElement(this.props.children)}
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchJsonWithSpecifiedStore: (reduxStorageUrl, urlWithParamsuser) => dispatch(fetchJsonWithSpecifiedStore(reduxStorageUrl, urlWithParamsuser))
});

export default connect(
	(state) => ( {
		user: state.user
	}),
	mapDispatchToProps
)(CSSModules(LoadMaterials, styles))