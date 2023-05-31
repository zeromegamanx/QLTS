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

export function resetAction() {
    return {
        type: RESET_ACTION,
    };
}

export function getListAct(body) {
    return {
        type: GET_LIST_TABLECOMPONENT_ACTION,
        body,
    };
}

export function getListSuccess(data) {
    return {
        type: GET_LIST_TABLECOMPONENT_SUCCESS,
        data,
    };
}

export function getListFailed(err) {
    return {
        type: GET_LIST_TABLECOMPONENT_FAILED,
        err,
    }; 
}

export function editAct(body) {
    return {
        type: EDIT_TABLECOMPONENT_ACTION,
        body, 
    };
}

export function editSuccess(data) {
    return {
        type: EDIT_TABLECOMPONENT_SUCCESS, 
        data, 
    }; 
}

export function editFailed(err) {
    return {
        type: EDIT_TABLECOMPONENT_FAILED, 
        err, 
    };
}

export function deleteAct(body) {
    return {
        type: DELETE_TABLECOMPONENT_ACTION,
        body, 
    };
}

export function deleteSuccess(data) {
    return {
        type: DELETE_TABLECOMPONENT_SUCCESS,
        data, 
    };
}

export function deleteFailed(err) {
    return {
        type: DELETE_TABLECOMPONENT_FAILED, 
        err,
    };
}