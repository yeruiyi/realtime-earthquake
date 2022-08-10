import types from './types';
import { IAction } from '../store/models';

const changeStartTime = (startTime: string): IAction => ({
  type: types.startTimeChanged,
  payload: {
    startTime
  }
});

const changeEndTime = (endTime: string): IAction => ({
  type: types.endTimeChanged,
  payload: {
    endTime
  }
});

const changeNumOfDays = (numOfDays: string): IAction => ({
  type: types.numOfDaysChanged,
  payload: {
    numOfDays
  }
});

const changeSearchCircle = (longitude: number|null, latitude: number|null, maxradius: number|null): IAction => ({
  type: types.searchcircleChanged,
  payload: {
    longitude,
    latitude,
    maxradius,
  }
});

const changeSearchRectangle = (minlongitude: number|null, minlatitude: number|null, maxlongitude: number|null,maxlatitude: number|null): IAction => ({
  type: types.searchRectangleChanged,
  payload: {
    minlongitude,
    minlatitude,
    maxlongitude,
    maxlatitude
  }
});
const changeFocus = (focusLat:number, focusLon:number, zoomLevel:number): IAction => ({
  type: types.mapFocusChanged,
  payload: {
    focusLat,
    focusLon,
    zoomLevel
  }
});

const changeOrderBy = (orderby: string): IAction => ({
  type: types.orderByChanged,
  payload: {
   orderby,
  }
});

const autoPlayTypeChanged = (autoplayEnabled: boolean,autoplayType: string): IAction => ({
  type: types.autoPlayTypeChanged,
  payload: {
    autoplayEnabled,
    autoplayType
  }
});

export { changeStartTime, changeEndTime, changeNumOfDays, changeSearchCircle, changeFocus, changeOrderBy, changeSearchRectangle, autoPlayTypeChanged  };
