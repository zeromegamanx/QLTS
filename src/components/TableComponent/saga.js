import { takeLatest, call, put } from 'redux-saga/effects';
import request from '../../utils/request';
import { getListSuccess, getListFailed, editSuccess, editFailed, deleteSuccess, deleteFailed } from './actions';
import { GET_LIST_TABLECOMPONENT_ACTION, EDIT_TABLECOMPONENT_ACTION, DELETE_TABLECOMPONENT_ACTION } from './constants';

export function* getListSaga(action) {
  try {
    const urlGet = action.body?.urlData || '';
    delete action.body.urlData;
    const roles = yield call(request, urlGet, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        ...action.body,
      },
    });
    if (roles) {
      yield put(getListSuccess(roles));
    } else {
      yield put(getListFailed());
    }
  } catch (err) {
    yield put(getListFailed(err));
  }
}

export function* editSaga(action) {
    try {
        const urlGet = action.body?.urlData || ''; 
        delete action.body.urlData;
        const roles = yield call(request, urlGet, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: {
                ...action.body,
            },
        });
        if (roles) {
            yield put(editSuccess(roles)); 
        } else {
            yield put(editFailed());
        }
    } catch (err) {
        yield put(editFailed(err));
    }
}

export function* deleteSaga(action) {
  let newUrl = '';
  try {
    const urlGet = action.body?.urlData || '';
    // delete action.body.urlData;
    // Loại bỏ query string
    if (urlGet.indexOf('?')) {
      const arr1 = `${urlGet}/${action.body.idEdit}`.split('?');
      const arr2 = arr1[1].split('/');
      newUrl = `${arr1[0]}/${arr2[1]}`;
    }
    const roles = yield call(request, newUrl === '' ? `${urlGet}/${action.body.idEdit}` : newUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (roles) {
      yield put(deleteSuccess(roles));
    } else {
      yield put(deleteFailed());
    }
  } catch (err) {
    yield put(deleteFailed(err));
  }
}

export default function* TableComponentSaga() {
  yield takeLatest(GET_LIST_TABLECOMPONENT_ACTION, getListSaga);
  yield takeLatest(EDIT_TABLECOMPONENT_ACTION, editSaga);
  yield takeLatest(DELETE_TABLECOMPONENT_ACTION, deleteSaga);
}
