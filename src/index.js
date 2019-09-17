import React from 'react';
import ReactDOM from 'react-dom';
import { Provider }  from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import { themeReducer,authReducer,branchReducer,staffReducer,reportReducer,financeReducer,settingsReducer,dashboardReducer,analyticsReducer,trendReducer} from './store/reducers';
import * as serviceWorker from './serviceWorker';

const rootReducer=combineReducers({
    theme:themeReducer,
    auth:authReducer,
    branch: branchReducer,
    staff:staffReducer,
    report:reportReducer,
    finance:financeReducer,
    settings:settingsReducer,
    dashboard:dashboardReducer,
    analytics:analyticsReducer,
    trends:trendReducer
})
const composeEnhancers = process.env.NODE_ENV ==='development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));


const app=(
  <BrowserRouter>
      <Provider store={store}>
          <App/>
      </Provider>
  </BrowserRouter>
)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
