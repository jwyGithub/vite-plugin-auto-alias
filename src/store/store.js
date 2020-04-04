import reducer from './reducer'
import { createStore, compose, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'
import thunk from 'redux-thunk'


const storageConfig = {
    key: 'root', // 必须有的
    storage: storageSession, // 缓存机制
    // blacklist: ['name','age'] // reducer 里不持久化的数据,除此外均为持久化数据
}
const myPersistReducer = persistReducer(storageConfig, reducer)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(myPersistReducer, composeEnhancers(applyMiddleware(thunk)));


export const persistor = persistStore(store)

export default store;