import initialState from './initialState';
import {
  // LOAD_USER_PROFILE_SUCCESS,
  // UPDATE_USER_PROFILE_SUCCESS,
} from '../actions/actionTypes';

// eslint-disable-next-line require-jsdoc
export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    // case LOAD_USER_PROFILE_SUCCESS:
    //   {
    //     return Object.assign({}, state, {
    //       userDetails: action.userDetails,
    //     });
    //   }

    // case UPDATE_USER_PROFILE_SUCCESS:
    //   {
    //     return Object.assign({}, state, {
    //       userDetails: action.updatedUser.user,
    //     });
    //   }

    default:
      {
        return state;
      }
  }
}
