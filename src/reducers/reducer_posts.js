import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/index';

const INITIAL_STATE = { all: [], post: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POST:
      return { ...state, post: action.payload.data };
    case FETCH_POSTS:
      return { ...state, all: action.payload.data };
    case DELETE_POST:
      return { ...state};
    default:
      return state;
  }
}



// case CONSTANT.DELETE_DICTIONARY:
//       return{
//         ...state, dictionary: {
//           ...state.dictionary,
//           [action.payload.type]: state.dictionary[action.payload.type].filter(
//             item => item.uuid !== action.payload.uuid
//           )
//         }
//       };
//
//
//
//       export function deleteDictionary(type,id) {
//         return (dispatch) => {
//           return sendRequest(`dictionary/${type}/${id}`, 'DELETE')
//             .then(response => {
//               if (response.status === 204) {
//                   dispatch({
//                     type: CONSTANT.DELETE_DICTIONARY,
//                     payload: {
//                       uuid: id,
//                       type: type,
//                     },
//                   });
//                   return true;
//                 } else {
//                   return false;
//                }
//               });
//         }
//       }
