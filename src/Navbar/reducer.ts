import { IAction } from '../store/models';
import types from './types';

interface IEarthquakesReducer {
  startTime: string;
  endTime: string;
  numOfDays: string;
  longitude: number | null;
  latitude: number | null;
  maxradius: number | null;
  orderby: string;
  focusLat: number;
  focusLon: number;
  zoomLevel: number;
  minlongitude: number | null; 
  minlatitude: number | null; 
  maxlongitude: number | null; 
  maxlatitude: number | null;
  autoplayEnabled: boolean;
  autoplayType: string;
  difference: number;
  countEnabled: boolean;
  clusterEnabled:boolean;
  minMag: string;
  maxMag: string;
}

const initialState: IEarthquakesReducer = {
  startTime: 'NOW - 1day',
  endTime: '',
  numOfDays: '1 day',
  longitude: null,
  latitude: null,
  maxradius: null,
  orderby: 'time',
  focusLat: 0,
  focusLon: 0,
  zoomLevel: 3,
  minlongitude: null, 
  minlatitude: null, 
  maxlongitude: null,  
  maxlatitude: null, 
  autoplayEnabled: false,
  autoplayType: '',
  difference:0,
  countEnabled: true,
  clusterEnabled:false,
  minMag:'0.01',
  maxMag:'',
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
    case types.searchRectangleChanged:
      return {
        ...state,
        minlongitude: action.payload.minlongitude,
        minlatitude: action.payload.minlatitude,
        maxlongitude: action.payload.maxlongitude,
        maxlatitude:action.payload.maxlatitude,
      };
    case types.mapFocusChanged:
      return {
        ...state,
        focusLon: action.payload.focusLon,
        focusLat: action.payload.focusLat,
        zoomLevel: action.payload.zoomLevel
      };
    case types.orderByChanged:
      return {
        ...state,
        orderby: action.payload.orderby,
      };
    case types.autoPlayTypeChanged:
      return {
        ...state,
        autoplayEnabled: action.payload.autoplayEnabled,
        autoplayType: action.payload.autoplayType,
      };
    case types.timeDifferenceChanged:
      return {
        ...state,
        difference: action.payload.difference,
      };
    case types.countEnabledChanged:
      return {
        ...state,
        countEnabled: action.payload.countEnabled,
      };
    case types.clusterEnabledChanged:
      return {
        ...state,
        clusterEnabled: action.payload.clusterEnabled,
      };
    case types.magRangeChanged:
      return {
        ...state,
        minMag: action.payload.minMag,
        maxMag: action.payload.maxMag,
      };
    default:
      return state;
  }
};
