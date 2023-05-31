import {
    POST_ACTION, POST_SUCCESS, POST_FAILED
  } from './constants';
  
  export function postAct(body) {
    return {
      type: POST_ACTION,
      body,
    };
  }
  export function postSuccess(data) {
    return {
      type: POST_SUCCESS,
      data,
    };
  }
  export function postFailed(err) {
    return {
      type: POST_FAILED,
      err,
    };
  }