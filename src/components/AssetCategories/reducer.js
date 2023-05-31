import produce from "immer"; 

import { 
    RESET_ACTION, 
    CREATE_CATEGORY_ACTION,
} from './constants'; 

export const initialState = {
    data: null,
    loading: null, 
    error: null,
    success: null, 
};

 const AssetCategoriesReducer = (state = initialState, action = {}) => 
    produce(state, (draft) => {
        switch (action.type) {
            case RESET_ACTION:
                draft.loading = null;
                draft.success = null;
                draft.error = null;
                draft.data = null;
                break;
        
            case CREATE_CATEGORY_ACTION:
                draft.loading = 'CREATE_CATEGORY_ACTION' ;
                draft.success = null; 
                draft.error = null;
                break;  
        }
    });
export default AssetCategoriesReducer