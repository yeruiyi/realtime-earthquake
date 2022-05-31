import { useState } from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
    return `${value}`;
}
  
export default function TimeSlider() {
    const now = new Date();
    const [rangeType, setRangeType] = useState('day');
    const [range, setRange] = useState<number[]>([20, 30]);
    const [minRange, setMinRange] = useState(1);
    const [maxRange, setMaxRange] = useState(31);

    const handleTypeChange = (event: React.MouseEvent<HTMLElement>, newRangeType: string,) => {
        setRangeType(newRangeType);

        // const date = Number(now.toLocaleDateString("en-US", { day : '2-digit'}))
        // const month = Number(now.getMonth() + 1)
        // const year  = Number(now.getFullYear())
        
        // if ( newRangeType == 'day' ) {
        //     if ( month == 1 ||month == 3 ||month == 5 ||month == 7 ||month == 8 ||month == 10 ||month == 12 ){
        //         if (date != 31){

        //         } else {
        //             const today = Number(String(year)+String(month)+String(date))
        //             setMaxRange(today)
        //             setMinRange(today-30)
        //         }
        //     }
        //     const today = Number(year+month+date)
        //     setMaxRange(today)
        //     setMinRange(today-31)
        //     // setRange([today,today])
            
        //     // if ( today != 31 ) {

        //     // } else {
        //     //     setMaxRange(today);
        //     // }
        // }
        // if ( newRangeType == 'month' ) {

        // }
        // if ( newRangeType == 'year' ) {

        // }
    };

    const handleRangeChange = (event: Event, newRange: number | number[]) => {
        setRange(newRange as number[]);
    };
    
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
                        <ToggleButton value="day"><b>Day</b></ToggleButton>
                        <ToggleButton value="month"><b>Month</b></ToggleButton>
                        <ToggleButton value="year"><b>Year</b></ToggleButton>
                    </ToggleButtonGroup>
                    <Slider
                        getAriaLabel={() => 'range'}
                        value={range}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        // step={1}
                        marks
                        min={minRange}
                        max={maxRange}
                        onChange={handleRangeChange}
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