import { takeLatest, call, put } from 'redux-saga/effects';
import request from '../../utils/request';
import {postSuccess, postFailed} from './actions';
import {POST_ACTION} from './constants';

export function* postSaga(action) {
  try {
    const urlGet = action.body?.urlData || '';
    delete action.body.urlData;
    const roles = yield call(request, urlGet, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        ...action.body,
      },
    });
    if (roles) {
      yield put(postSuccess(roles));
    } else {
      yield put(postFailed());
    }
  } catch (err) {
    yield put(postFailed(err));
  }
}
export default function* AuthenticationSaga() {
  yield takeLatest(POST_ACTION, getListSaga);
}
