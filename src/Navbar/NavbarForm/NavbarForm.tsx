import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { EndTimeInput, Icon } from './styles';
import InfoTip from './Infotip';
import { changeStartTime, changeEndTime, changeNumOfDays, changeSearchCircle} from '../actions';

export default function NavBarForm() {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setlatitude] = useState('');
  const [maxradius, setmaxradius] = useState('');
  const [startTimeTooltipOpen, setStartTimeTooltipOpen] = useState(false);
  const [endTimeTooltipOpen, setEndTimeTooltipOpen] = useState(false);
  const [toggleIcon, setToggleIcon] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // clear dropdown default value
    dispatch(changeNumOfDays('Select Period'));
    // pass the query params to be able to perform query
    dispatch(changeStartTime(startTime));
    dispatch(changeEndTime(endTime));
    if (longitude!=='null' && latitude!=='null'&& maxradius!=='null') {
      dispatch(changeSearchCircle(Number(longitude),Number(latitude),Number(maxradius)));
    } else {
      dispatch(changeSearchCircle(null,null,null));
    }
    // clear start end input values
    setStartTime('');
    setEndTime('');
    setLongitude('null');
    setlatitude('null');
    setmaxradius('null');

  };

  const changeIcon = () => setToggleIcon(!toggleIcon);

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongitude(e.target.value);
  };
  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlatitude(e.target.value);
  };
  const handleMaxradiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmaxradius(e.target.value);
  };
  return (
    <form className="form-inline my-lg-0" onSubmit={onSubmit}>
      <div>
        <InputGroup>
          <InputGroupText>
            Longitude
          </InputGroupText>
          <Input
            id="longitude"
            value={longitude}
            type="number"
            onChange={handleLongitudeChange}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupText>
            Latitude
          </InputGroupText>
          <Input
            id="latitude"
            value={latitude}
            type="number"
            onChange={handleLatitudeChange}
          />
        </InputGroup>
        <br/>
        <InputGroup>
          <InputGroupText>
            Max Radius
          </InputGroupText>
          <Input
            id="maxradius"
            value={maxradius}
            type="number"
            onChange={handleMaxradiusChange}
          />
        </InputGroup>
        <br/>
      </div>
      <div className="input-group">
        <input
          className="form-control"
          id="startTime"
          type={toggleIcon ? 'text' : 'date'}
          value={startTime}
          onChange={handleStartTimeChange}
        />
        <div className="input-group-append mr-sm-2">
          <span className="input-group-text">
            <Icon
              className={`fa fa-${toggleIcon ? 'calendar' : 'pencil'}`}
              tabIndex={0}
              role="button"
              onClick={changeIcon}
              onKeyDown={() => {}}
            />
          </span>
        </div>
      </div>
      <InfoTip
        target="startTime"
        tooltipOpen={startTimeTooltipOpen}
        setTooltipOpen={setStartTimeTooltipOpen}
      />
      <EndTimeInput
        className="form-control mr-sm-2"
        id="endTime"
        type="date"
        disabled={toggleIcon ? true : false}
        value={endTime}
        onChange={handleEndTimeChange}
      />
      <InfoTip
        target="endTime"
        tooltipOpen={endTimeTooltipOpen}
        setTooltipOpen={setEndTimeTooltipOpen}
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  );
}
