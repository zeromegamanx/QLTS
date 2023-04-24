// chứa các reducers trong redux
// Reducers sẽ có nhiệm vụ thay đổi state của ứng dụng dựa trên từng action được gửi đến. 
// Gộp các reducer lại với nhau bằng hàm combineReducer.

import { combineReducers } from 'redux'
import noteReducers from './noteReducer'

// Ở đay chúng ta có thể gộp nhiều reducers
export default combineReducers({
    note: noteReducers
})