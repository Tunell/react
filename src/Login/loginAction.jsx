import {CHANGE_USER} from "./loginReducer";
import {fetchJsonWithSpecifiedStore} from "../materialGetters/materialGettersAction";


//Action Creator
export function changeUser(user) {
	return (dispatch, getState) => {
		dispatch(fetchJsonWithSpecifiedStore('usedMaterials', `/api/used-materials?user_id=${user}`));
		dispatch(fetchJsonWithSpecifiedStore('compositeMaterials', `/api/composite-materials?user_id=${user}&user_id=1`));
		dispatch(setUser(user));
	}
}

//Action Creator
export function setUser(user) {
	return {
		type: CHANGE_USER,
		user
	}
}