//config Middleware Saga

import { createStore, applyMiddleware } from "redux";
import createSagaMiddle from "redux-saga";
import rootReducer from "./rootReducer.js";
import rootSaga from "../redux-saga/rootSaga.js";

const sagaMiddle = createSagaMiddle();

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddle)
    )
);

sagaMiddle.run(rootSaga);

export default store;


//  import file store để sử dụng trong index.js