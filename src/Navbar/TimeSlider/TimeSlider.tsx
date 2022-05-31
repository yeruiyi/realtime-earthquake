import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { changeStartTime, changeEndTime } from '../actions';

const dates = (firstDraft: number , secondDraft: number ) => {
    const firstDate = new Date();
    const secondDate = new Date();
    firstDate.setHours(0);
    firstDate.setMinutes(0);
    firstDate.setSeconds(0);
    firstDate.setMilliseconds(0);
    secondDate.setHours(23);
    secondDate.setMinutes(59);
    secondDate.setSeconds(59);
    secondDate.setMilliseconds(999);
    firstDate.setDate(firstDate.getDate() + (firstDraft - 180));
    secondDate.setDate(secondDate.getDate() + (secondDraft - 180));
    return [firstDate, secondDate];
};

function valueLabelFormat (value: number) {
    const newValue = value - 180;
    if (newValue === 0) {
        return 'Today';
    }
    return `${newValue}`;
}

function valuetext (value: number) {
    const ret = value + 10;
    return `${ret}`;
}

function rangeTypography (value:number[]) {
    if (JSON.stringify(value) !== JSON.stringify([0, 180])) {
        const [firstDraft, secondDraft] = value;
        const [firstDate, secondDate] = dates(firstDraft, secondDraft);
        return `${firstDate.toLocaleString()} - ${secondDate.toLocaleString()}`;
    }
    return 'Data for the last six months';
}

export default function TimeSlider() {
    const dispatch = useDispatch();
    const [rangeType, setRangeType] = useState('');
    const [range, setRange] = useState([0, 180]);
    // const [minRange, setMinRange] = useState(1);
    // const [maxRange, setMaxRange] = useState(31);

    const handleTypeChange = (event: React.MouseEvent<HTMLElement>, newRangeType: string,) => {
        setRangeType(newRangeType);

        if (newRangeType === "1") {
            setRange([150, 180]);
            handleRangeCommit([150, 180]);
        }
        if (newRangeType === "2") {
            setRange([120, 180]);
            handleRangeCommit([120, 180]);
        }
        if (newRangeType === "3") {
            setRange([90, 180]);
            handleRangeCommit([90, 180]);
        }
        
    };

    const handleRangeChange = (event: Event, newRange: number | number[]) => {
        setRange(newRange as number[]);
    };

 
    const handleRangeCommit = (newRange: number | number[]) => {
        const [firstDraft, secondDraft] = newRange as number[]
        const [firstDate, secondDate] = dates(firstDraft, secondDraft);
        dispatch(changeStartTime(firstDate.toISOString()));
        dispatch(changeEndTime(secondDate.toISOString()));
    }
    
    return (
        <SliderContainer>
            <Card>
                <CardContent>
                    <ToggleButtonGroup
                        color="primary"
                        value={rangeType}
                        exclusive
                        onChange={handleTypeChange}
                        fullWidth={true}
                        size="small"
                        sx={{ marginBottom: 2 }}
                    >
                        <ToggleButton value="1"><b>1 Month</b></ToggleButton>
                        <ToggleButton value="2"><b>2 Month</b></ToggleButton>
                        <ToggleButton value="3"><b>3 Month</b></ToggleButton>
                    </ToggleButtonGroup>
                    <Typography id="range-slider">
                        {rangeTypography(range)}
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'range'}
                        value={range}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        valueLabelFormat={valueLabelFormat}
                        marks
                        min={0}
                        max={180}
                        onChange={handleRangeChange}
                        onChangeCommitted={() => handleRangeCommit(range)}
                    />
                </CardContent>

            </Card>
        </SliderContainer>
    );
}

const SliderContainer = styled.div`
    position: absolute;
    bottom: 60px;
    z-index: 314159;
    margin:auto;
    width:30%;
    margin-left:40%;
`;