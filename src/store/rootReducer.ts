import { combineReducers, } from 'redux';
import navbarReducer from '../Navbar/reducer';
import {
  configureStore,
  PreloadedState
} from '@reduxjs/toolkit'
import type { RooState } from './index'

const rootReducer = combineReducers({
  navbar: navbarReducer
});

export default rootReducer;

export function setupStore(preloadedState?: PreloadedState<RooState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
export type AppStore = ReturnType<typeof setupStore>