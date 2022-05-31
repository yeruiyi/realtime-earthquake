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

export { changeStartTime, changeEndTime, changeNumOfDays, changeSearchCircle, changeFocus, changeOrderBy  };
