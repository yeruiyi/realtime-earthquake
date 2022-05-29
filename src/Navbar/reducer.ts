import { IAction } from '../store/models';
import types from './types';

interface IEarthquakesReducer {
  startTime: string;
  endTime: string;
  numOfDays: string;
  longitude: number | null;
  latitude: number | null;
  maxradius: number | null;
}

const initialState: IEarthquakesReducer = {
  startTime: 'NOW - 3days',
  endTime: '',
  numOfDays: '3 days',
  longitude: null,
  latitude: null,
  maxradius: null,

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
    default:
      return state;
  }
};
