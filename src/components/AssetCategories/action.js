import { 
    CREATE_CATEGORY_ACTION,
    RESET_ACTION,
} from './constants'; 

export function resetAction(){
    return {
        type: RESET_ACTION,
    };
}

export function CREATE_CATEGORY_ACTION(body) {
    return {
        type: CREATE_CATEGORY_ACTION,
        body, 
    };
}

