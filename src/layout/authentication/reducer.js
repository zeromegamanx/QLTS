import produce from 'immer';
// action - state management
import {
  POST_ACTION, 
  POST_SUCCESS, 
  POST_FAILED,
} from './constants';

export const initialState = {
  data: null,
  loading: null,
  error: null,
  success: null,
};

const M01Reducer = (state = initialState, action = {}) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POST_ACTION:
        draft.loading = null;
        draft.success = null;
        draft.error = null;
        draft.data = null;
        break;
      case POST_SUCCESS:
        draft.loading = null;
        draft.success = 'POST_SUCCESS';
        draft.error = null;
        draft.data = action.data;
        break;
      case POST_FAILED:
        draft.loading = null;
        draft.success = null;
        draft.error = 'POST_ERROR';
        draft.data = action.err.data;
        break;
      default:
        break;
    }
  });

export default M01Reducer;
