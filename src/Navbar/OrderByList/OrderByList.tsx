import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { changeOrderBy,changeSearchCircle, changeStartTime, changeEndTime } from '../actions';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RooState } from '../../store';

export default function OrderByList() {
    const dispatch = useDispatch();
    const { startTime, endTime, longitude, latitude, maxradius } = useSelector(({ navbar }: RooState) => navbar);
    const [orderBy, setOrderBy] = useState('');

    const selectOrderBy = (event: SelectChangeEvent) => {
        const dropdownvalue = event.target.value;

        if (dropdownvalue) {
            dispatch(changeOrderBy(dropdownvalue));
            // dispatch(changeStartTime(startTime));
            // dispatch(changeEndTime(endTime));

            // if (longitude!=='null' && latitude!=='null'&& maxradius!=='null') {
            //     dispatch(changeSearchCircle(Number(longitude),Number(latitude),Number(maxradius)));
            // }
        }

        setOrderBy(dropdownvalue);
    };

    return (
        <OrderByContainer>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Order By</InputLabel>
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
    );
}

const OrderByContainer = styled.div`
  background-color: #ffffff;
  width: fit-content;
  height: fit-content;
  margin-top: 10px;
`;
