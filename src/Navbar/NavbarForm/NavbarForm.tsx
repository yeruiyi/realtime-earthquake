import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { StartTimeInput, EndTimeInput, OrderByContainer, ButtonContainer } from './styles';
import InfoTip from './Infotip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { changeStartTime, changeEndTime, changeNumOfDays, changeSearchCircle, changeOrderBy } from '../actions';

export default function NavBarForm() {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setlatitude] = useState('');
  const [maxradius, setmaxradius] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [startTimeTooltipOpen, setStartTimeTooltipOpen] = useState(false);
  const [endTimeTooltipOpen, setEndTimeTooltipOpen] = useState(false);
  // const [toggleIcon, setToggleIcon] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // clear dropdown default value
    dispatch(changeNumOfDays('Select Period'));
    // pass the query params to be able to perform query
    dispatch(changeStartTime(startTime));
    dispatch(changeEndTime(endTime));
    if (longitude.length !== 0 && latitude.length !== 0  && maxradius.length !== 0) {
      dispatch(changeSearchCircle(Number(longitude),Number(latitude),Number(maxradius)));
    } else {
      dispatch(changeSearchCircle(null,null,null))
    }
    dispatch(changeOrderBy(orderBy));

    setStartTime('');
    setEndTime('');
    setLongitude('');
    setlatitude('');
    setmaxradius('');
    setOrderBy('');

  };

  // const changeIcon = () => setToggleIcon(!toggleIcon);

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

  const selectOrderBy = (event: SelectChangeEvent) => {
    const dropdownvalue = event.target.value;
    if (dropdownvalue) {
      setOrderBy(dropdownvalue);
    }
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
      {/* <div className="input-group">
        <input
          className="form-control"
          id="startTime"
          type={'date'}
          value={startTime}
          onChange={handleStartTimeChange}
        />
        <div className="input-group-append mr-sm-2">
          <span className="input-group-text">
            <Icon
              className={`fa fa-${ 'calendar'}`}
              tabIndex={0}
              role="button"
              onClick={changeIcon}
              onKeyDown={() => {}}
            />
          </span>
        </div>
      </div> */}
      <div>
        <StartTimeInput
          className="form-control mr-sm-2"
          id="startTime"
          type="date"
          value={startTime}
          onChange={handleStartTimeChange}
        />
        <InfoTip
          target="startTime"
          tooltipOpen={startTimeTooltipOpen}
          setTooltipOpen={setStartTimeTooltipOpen}
        />
        <EndTimeInput
          className="form-control mr-sm-2"
          id="endTime"
          type="date"
          value={endTime}
          onChange={handleEndTimeChange}
        />
        <InfoTip
          target="endTime"
          tooltipOpen={endTimeTooltipOpen}
          setTooltipOpen={setEndTimeTooltipOpen}
        />
      </div>
      <OrderByContainer>
        <FormControl variant="standard" sx={{ s: 0.5, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">&nbsp;Order By</InputLabel>
          <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={orderBy}
              label="Order By"
              onChange={selectOrderBy}
          >
            <MenuItem value="time">Time</MenuItem>
            <MenuItem value="time-asc">Time-Asc</MenuItem>
            <MenuItem value="magnitude">Magnitude</MenuItem>
            <MenuItem value="magnitude-asc">Magnitude-Asc</MenuItem>
          </Select>
        </FormControl>
      </OrderByContainer>
      <ButtonContainer>
        <button className="btn btn-outline-success my-2 my-sm-0"  type="submit">
          Search
        </button>
      </ButtonContainer>
    </form>
  );
}
