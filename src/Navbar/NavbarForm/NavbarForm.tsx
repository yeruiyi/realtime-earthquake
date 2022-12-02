import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { StartTimeInput, EndTimeInput, OrderByContainer, ButtonContainer } from './styles';
import InfoTip from './Infotip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { changeStartTime, changeEndTime, changeNumOfDays, changeSearchCircle, changeOrderBy, changeTimeDifference, placeUserMarker, clearTimeSlider } from '../actions';
import './alertStyle.css';
import { useSelector } from 'react-redux';
import { RooState } from '../../store';

function format (inputDate: Date) {
  var date;
  if (inputDate.getDate() < 10) {
    date =`0${inputDate.getDate()}`
  } else {
    date = inputDate.getDate()
  }
  var formatDate = inputDate.getFullYear() + "-"+ Number(inputDate.getMonth()+1) +"-" + date;

  return formatDate
}
function isValidDate(inputDate: string) {
  return !isNaN(Date.parse(inputDate));
}

export default function NavBarForm() {
  const { userMarkerPlaced } = useSelector(({ navbar }: RooState) => navbar);
  var showRemoveButton;
  if (userMarkerPlaced == "placed") {
    showRemoveButton = true
  } else {
    showRemoveButton = false
  }
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setlatitude] = useState('');
  const [maxradius, setmaxradius] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [startTimeTooltipOpen, setStartTimeTooltipOpen] = useState(false);
  const [endTimeTooltipOpen, setEndTimeTooltipOpen] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [emptyDate, setEmptyDate] = useState(false);
  const [invalidLongitude, setInvalidLongitude] = useState(false);
  const [invalidLatitude, setInvalidLatitude] = useState(false);
  const [invalidRadius, setInvalidRadius] = useState(false);
  const [emptyCoordinate, setEmptyCoordinate] = useState(false);

  const today = new Date();

  function validation (start: string, end:string,longitude:string,latitude:string,radius:string ){
    if(start != '') {
      if(!isValidDate(start)) {
        setInvalidDate(true)
        return false;
      }
    } 

    if(end != '') {
      if(!isValidDate(end)) {
        setInvalidDate(true)
        return false;
      }
    }

    if ((start != '' && end == '') ||start == '' && end != '') {
      setEmptyDate(true)
      return false;
    }

    if ((longitude.length !== 0)) {
      if(Number(longitude)< -180 || Number(longitude)> 180 ){
        setInvalidLongitude(true)
        return false;
      }
    }

    if ((latitude.length !== 0)) {
      if(Number(latitude)< -90 || Number(latitude)> 90 ){
        setInvalidLatitude(true)
        return false;
      }
    }

    if ((radius.length !== 0)) {
      if(Number(radius)< 0 || Number(radius)> 20001.6 ){
        setInvalidRadius(true)
        return false;
      }
    }

    if ((longitude.length !== 0 && (latitude.length || radius.length) == 0 ) || (latitude.length !== 0 && (longitude.length || radius.length) == 0 )  || (radius.length !== 0 && (longitude.length || latitude.length) == 0 ) 
         || (longitude.length !== 0 && latitude.length!== 0 && radius.length == 0 )|| (longitude.length !== 0 && radius.length!== 0 && latitude.length == 0 )|| (latitude.length !== 0 && radius.length!== 0 && longitude.length == 0 )) {
      setEmptyCoordinate(true)
      return false;
    }

    return true;

  }

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validation(startTime, endTime, longitude, latitude, maxradius )) {
      setInvalidDate(false)
      setEmptyDate(false)
      setInvalidLongitude(false)
      setInvalidLatitude(false)
      setInvalidRadius(false)
      setEmptyCoordinate(false)

      if (startTime != '' || endTime!='') {
        dispatch(changeNumOfDays('Select Period'));
        dispatch(clearTimeSlider(true));
        const first = new Date(endTime)
        const second = new Date(startTime)
        const timeDifference = first.getTime() - second.getTime()
        dispatch(changeTimeDifference(timeDifference))
      }
      if (startTime != '') {
        dispatch(clearTimeSlider(true));
        dispatch(changeStartTime(startTime));
      }
      if (endTime != ''){
        dispatch(clearTimeSlider(true));
        dispatch(changeEndTime(endTime));
      }
  
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
  
    } else {
      setStartTime('');
      setEndTime('');
      setLongitude('');
      setlatitude('');
      setmaxradius('');
    }


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

  const removeMarkerHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(placeUserMarker("removed"))
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
          {(invalidLongitude|| emptyCoordinate) ? <span className="alert-mark">&nbsp;!</span> : <></>}
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
           {(invalidLatitude|| emptyCoordinate)  ? <span className="alert-mark">&nbsp;!</span> : <></>}
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
          {(invalidRadius|| emptyCoordinate) ? <span className="alert-mark">&nbsp;!</span> : <></>}
        </InputGroup>
        <br/>
      </div>
      <div>
        <StartTimeInput
          className="form-control mr-sm-2"
          id="startTime"
          type="date"
          value={startTime}
          onChange={handleStartTimeChange}
          max={endTime}
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
          max={format(today)}
        />
        <InfoTip
          target="endTime"
          tooltipOpen={endTimeTooltipOpen}
          setTooltipOpen={setEndTimeTooltipOpen}
        />
         {(invalidDate || emptyDate) ? <span className="alert-text">&nbsp;Date is invalid</span> : <></>}
      </div>
      {/* {invalidDate ? <div><span className="alert-text">Date is invalid</span></div> : <></>} */}
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
      {showRemoveButton ?  
        <ButtonContainer>
          <button className="btn btn-outline-success my-2 my-sm-0"  onClick={removeMarkerHandler} >
            Remove
          </button>
        </ButtonContainer> : <></> } 
    </form>
  );
}
