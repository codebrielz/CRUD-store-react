import {legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const store = createStore(
    reducers,
    compose( applyMiddleware(thunk),
        // Codigo para utilizar redux-developer-tools
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)