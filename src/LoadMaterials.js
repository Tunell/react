import React from "react";
import CSSModules from "react-css-modules";
import LoadJson from "./functions/LoadJson";
import styles from "./MainStyles.less";

class LoadMaterials extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			compositeMaterials: [],
			usedMaterials: []
		};
		this.loadMaterialListFromServer = this.loadMaterialListFromServer.bind(this);
	}

	async loadMaterialListFromServer() {
		try {
			const usedMaterialsPromise = LoadJson('api/used-materials');
			const compositeMaterialsPromise = LoadJson('api/composite-materials');
			//const users = await LoadJson('api/users');

			const [usedMaterials, compositeMaterials] = await Promise.all([usedMaterialsPromise, compositeMaterialsPromise]);
			this.setState({
				compositeMaterials,
				usedMaterials
			});
		} catch (e) {
			console.log('Error loading materials from server: ', e);
		}
	}

	componentDidMount() {
		this.loadMaterialListFromServer();
		/*setInterval(
		 () => {
		 this.loadMaterialListFromServer()
		 }, 2000);*/
	}

	render() {
		const {compositeMaterials, usedMaterials} = this.state;
		return (
			<div>
				{React.cloneElement(this.props.children, {compositeMaterials, usedMaterials})}
			</div>
		)
	}
}

export default CSSModules(LoadMaterials, styles)