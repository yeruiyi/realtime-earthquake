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
    maxradius
  }
});

export { changeStartTime, changeEndTime, changeNumOfDays, changeSearchCircle };
