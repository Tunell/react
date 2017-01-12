////Action Type
export const CHANGE_USER = 'CHANGE_USER';

//Reducer
const loginReducer = (state = false, action) => {

	switch (action.type) {
		case CHANGE_USER:
				return state = action.user;
		default:
			return state
	}
};

export { loginReducer }

