import { IAction } from '../store/models';
import types from './types';

interface IEarthquakesReducer {
  startTime: string;
  endTime: string;
  numOfDays: string;
  longitude: number | null;
  latitude: number | null;
  maxradius: number | null;
  focusLat: number,
  focusLon: number,
  zoomLevel: number
}

const initialState: IEarthquakesReducer = {
  startTime: 'NOW - 3days',
  endTime: '',
  numOfDays: '3 days',
  longitude: null,
  latitude: null,
  maxradius: null,
  focusLat: 0,
  focusLon: 0,
  zoomLevel: 3

};

// eslint-disable-next-line default-param-last
export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case types.startTimeChanged:
      return {
        ...state,
        startTime: action.payload.startTime,
        endTime: ''
      };
    case types.endTimeChanged:
      return {
        ...state,
        endTime: action.payload.endTime
      };
    case types.numOfDaysChanged:
      return {
        ...state,
        numOfDays: action.payload.numOfDays
      };
    case types.searchcircleChanged:
      return {
        ...state,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
        maxradius: action.payload.maxradius
      };
    case types.mapFocusChanged:
      return {
        ...state,
        focusLon: action.payload.focusLon,
        focusLat: action.payload.focusLat,
        zoomLevel: action.payload.zoomLevel
      };
    default:
      return state;
  }
};
