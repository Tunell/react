import {CHANGE_USER} from "./loginReducer";


//Action Creator
export function changeUser(user) {
	return {
		type: CHANGE_USER,
		user
	}
}