import produce from 'immer';

import { 
    RESET_ACTION, 
    GET_LIST_TABLECOMPONENT_ACTION,
    GET_LIST_TABLECOMPONENT_SUCCESS, 
    GET_LIST_TABLECOMPONENT_FAILED, 
    EDIT_TABLECOMPONENT_ACTION, 
    EDIT_TABLECOMPONENT_SUCCESS,
    EDIT_TABLECOMPONENT_FAILED,
    DELETE_TABLECOMPONENT_ACTION,
    DELETE_TABLECOMPONENT_SUCCESS, 
    DELETE_TABLECOMPONENT_FAILED,
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
            case RESET_ACTION: 
                draft.loading = null; 
                draft.success = null; 
                draft.error = null; 
                draft.data = null; 
                break; 
            case GET_LIST_TABLECOMPONENT_ACTION: 
                draft.loading = 'GETLIST_LOADING'; 
                draft.success = null; 
                draft.error = null; 
                break; 
            case GET_LIST_TABLECOMPONENT_SUCCESS: 
                draft.loading = null; 
                draft.success = 'GETLIST_SUCCESS';
                draft.error = null; 
                draft.data = action.data; 
                break; 
            case GET_LIST_TABLECOMPONENT_FAILED:
                draft.loading = null;
                draft.success = null; 
                draft.error = 'GETLIST_ERROR'; 
                draft.data = action.err.data; 
                break;
            case EDIT_TABLECOMPONENT_ACTION:
                draft.loading = 'EDIT_LOADING';
                draft.success = null; 
                draft.error = null;
                break; 
            case EDIT_TABLECOMPONENT_SUCCESS:
                draft.loading = null; 
                draft.success = 'DELETE_SUCCESS';
                draft.error = null; 
                draft.data = action.data; 
                break; 
            case EDIT_TABLECOMPONENT_FAILED:
                draft.loading = null; 
                draft.success = null; 
                draft.error = 'DELETE_ERROR';
                draft.data = action.err.data; 
                break; 
            case DELETE_TABLECOMPONENT_ACTION:
                draft.loading = 'DELETE_LOADING'; 
                draft.success = null; 
                draft.error = null; 
                break; 
            case DELETE_TABLECOMPONENT_SUCCESS:
                draft.loading = null; 
                draft.success = 'DELETE_SUCCESS';
                draft.error = null; 
                draft.data = action.data; 
                break;
            case DELETE_TABLECOMPONENT_FAILED: 
                draft.loading = null; 
                draft.success = null; 
                draft.error = 'DELETE_ERROR'; 
                draft.data = action.err.data; 
                break;
            default: 
                break; 
        }
    });
export default M01Reducer