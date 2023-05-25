// Chứa các actions dùng để truyền vào hàm dispatch.
// Actions là một object chứa các hành động mà bạn muốn gửi đến reducers

import { ADD_NEW_NOTE, REMOVE_NOTE, EDIT_NOTE } from "../const/index";
// action hỗ trợ việc thêm ghi chú
export const actAddNote = (content) => {
    return {
        //type có tính giá trị duy nhất
        type: ADD_NEW_NOTE,
        content,
    };
};