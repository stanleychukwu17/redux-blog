import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";

import {main_reducer} from './reducer'

export let store = createStore(main_reducer, composeWithDevTools(applyMiddleware(thunk)));