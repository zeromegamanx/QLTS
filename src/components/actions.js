/*
 *
 * Qtht0201 actions
 *
 */

import {
  RESET_ACTION,
  GET_LIST_TABLECOMPONENT_ACTION,
  GET_LIST_TABLECOMPONENT_SUCCESS,
  GET_LIST_TABLECOMPONENT_FAILED,
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
