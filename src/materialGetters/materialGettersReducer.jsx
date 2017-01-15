////Action Type
export const RECIEVE_RESOURCE = 'RECIEVE_RESOURCE';
export const REQUEST_RESOURCE = 'REQUEST_RESOURCE';
export const INVALIDATE_RESOURCE = 'INVALIDATE_RESOURCE';

/*export const LOAD_USED_MATERIALS = 'LOAD_USED_MATERIALS';
 export const LOAD_COMPOSITE_MATERIALS = 'LOAD_COMPOSITE_MATERIALS';
 export const LOAD_MATERIALS = 'LOAD_MATERIALS';
 export const LOAD_RECYCLE_TYPES = 'LOAD_RECYCLE_TYPES';*/

//Reducer
const resourceFromUrl = (state = {json: {}}, action) => {
	switch (action.type) {
		case INVALIDATE_RESOURCE:
			return Object.assign({}, state, {
				[action.url]: {
					didInvalidate: true
				}
			});
		case RECIEVE_RESOURCE:
			return Object.assign({}, state, {
				[action.url]: {
					isFetching: false,
					didInvalidate: false,
					json: action.json,
					lastUpdated: action.receivedAt
				}
			});
		case REQUEST_RESOURCE:
			return Object.assign({}, state, {
				[action.url]: {
					isFetching: true,
					didInvalidate: false,
					json: typeof state[action.url] !== 'undefined' ? state[action.url].json : '',
				}
			});
		default:
			return state
	}
};
export {resourceFromUrl}
