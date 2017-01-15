import {RECIEVE_RESOURCE, REQUEST_RESOURCE} from "./materialGettersReducer";
import LoadJson from "../functions/LoadJson";
/*import {LOAD_USED_MATERIALS} from "./materialGettersReducer";
 import {LOAD_COMPOSITE_MATERIALS} from "./materialGettersReducer";
 import {LOAD_MATERIALS} from "./materialGettersReducer";
 import {LOAD_RECYCLE_TYPES} from "./materialGettersReducer";

 const usedMaterialsPromise = LoadJson('api/used-materials');
 const compositeMaterialsPromise = LoadJson('api/composite-materials');
 const materialsPromise = LoadJson('api/materials');
 const recycleTypesPromise = LoadJson('api/recycle-types');
 */

/*Inspired by: https://github.com/reactjs/redux/blob/master/docs/advanced/ExampleRedditAPI.md*/
//Action Creator
const recieveJson = (url, json) => {
	return {
		type: RECIEVE_RESOURCE,
		url,
		json,
		receievedAt: Date.now()
	}
};

//Action Creator
const requestJson = (url) => {
	return {
		type: REQUEST_RESOURCE,
		url
	}
};

//Action Creator
export function fetchJsonWithSpecifiedStore(reduxStorageUrl, urlWithParams) {
	return (dispatch, getState) => {
		dispatch(requestJson(reduxStorageUrl))
		if (typeof __xcapRunningServerSide === 'undefined') {
			return LoadJson(urlWithParams)
				.then(json =>
					dispatch(recieveJson(reduxStorageUrl, json))
				)
		} else {
			dispatch(recieveJson(reduxStorageUrl, loadJson(urlWithParams)));
		}

	}
}