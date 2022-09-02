import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { changeStartTime, changeEndTime,changeOrderBy,changeTimeDifference } from '../actions';
import { styled as muiStyle } from '@mui/material/styles';

function valuetext (value: number) {
    const ret = value;
    return `${ret}`;
}

const displayTypography = (firstDraft: number , secondDraft: number , type:number ) => {
    var differenceText = secondDraft - firstDraft
    if ( type == 3 ) {
        return `Data for last ${differenceText} days`
    } else if ( type == 2 ) {
        if(differenceText == 0 ) {
            return `Data for current months`
        } else {
            return `Data for last ${differenceText} months`
        }
    } else if (type == 1 ) {
        if(differenceText == 0 ) {
            return `Data for current year`
        } else {
            return `Data for last ${differenceText} year`
        }
    }
};

function format(inputDate: Date,inputType: number) {
    let date,month;

    const monthArray = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];

    date = inputDate.getDate();
    month = monthArray[inputDate.getMonth()];
    // year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
    
    if (inputType===3) {
        return `${date}/${month}`;
    } else {
        return `${date}/${month}`;
    }
}

function rangeTypography (value:number[], type: string) {
    if (JSON.stringify(value) !== JSON.stringify([44, 44])) {
        const [firstDraft, secondDraft] = value;
        const displayText = displayTypography(firstDraft, secondDraft, parseInt(type));
        return displayText;
    }
    return 'Data for the today';
}

export default function TimeSlider() {
    const dispatch = useDispatch();
    const [rangeType, setRangeType] = useState('3');
    const [range, setRange] = useState([44,44]);
    const [minRange, setMinRange] = useState(13);
    const [maxRange, setMaxRange] = useState(44);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date();

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
        if (maxRange === currentYear) {
            firstDate.setFullYear(firstDraft);
            secondDate.setFullYear(secondDraft);
        } else if (maxRange === 12) {
            var tempFirst = currentMonth - (12 - firstDraft) 
            var tempSecond = currentMonth - (12 - secondDraft) 
            if (tempFirst >= 0 && tempSecond>=0 ) {
                firstDate.setMonth(currentMonth - (12 - firstDraft) );
                secondDate.setMonth(currentMonth - (12 - secondDraft) );
            } else if (tempFirst <0 && tempSecond >=0 ){
                firstDate.setMonth(currentMonth + firstDraft);
                firstDate.setFullYear(currentYear - 1);
                secondDate.setMonth(currentMonth - (12 - secondDraft) );
            } else if (tempSecond < 0 && tempFirst >=0) {
                secondDate.setMonth(currentMonth + secondDraft);
                secondDate.setFullYear(currentYear - 1);
                firstDate.setMonth(currentMonth - (12 - firstDraft) );
            } else {
                firstDate.setMonth(currentMonth + firstDraft);
                firstDate.setFullYear(currentYear - 1);
                secondDate.setMonth(currentMonth + secondDraft);
                secondDate.setFullYear(currentYear - 1);
            }
        } else if (maxRange === 44) {
            firstDate.setDate(firstDate.getDate() + (firstDraft - 44));
            secondDate.setDate(secondDate.getDate() + (secondDraft - 44));
        }
        return [firstDate, secondDate];
    };


    function valueLabelFormat (value: number) {
        const newValue = value ;
        if (newValue === 44) {
            return 'Today';
        }

        if (maxRange === currentYear) {
            var ret = String(value);
        } else if (maxRange === 12) {
            const month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
            var tempMonth = currentMonth - (12 - value) 
            if (tempMonth < 0 ) {
                var retMonth = month[(currentMonth + value)]
                var ret = `${retMonth}/${currentYear-1}`
            } else {
                var retMonth = month[(tempMonth)]
                var ret = `${retMonth}/${currentYear}`
            }
        } else {
            var date = new Date()
            var tempDate = currentDate.getDate() + (value-44)
            date.setDate(tempDate);
            var ret = format(date,3)
        }
        
        return `${ret}`;
    }

    const handleTypeChange = (event: React.MouseEvent<HTMLElement>, newRangeType: string,) => {
        setRangeType(newRangeType);
        if (newRangeType === "1") {
            setMinRange(currentYear-100)
            setMaxRange(currentYear)
            setRange([currentYear,currentYear])
        }
        if (newRangeType === "2") {
            setMinRange(1)
            setMaxRange(12)
            setRange([12,12])
        }
        if (newRangeType === "3") {
            setMinRange(13)
            setMaxRange(44)
            setRange([44,44])
        }
        
    };

    const handleRangeChange = (event: Event, newRange: number | number[]) => {
        setRange(newRange as number[]);
    };

 
    const handleRangeCommit = (newRange: number | number[]) => {
        const [firstDraft, secondDraft] = newRange as number[]
        const [firstDate, secondDate] = dates(firstDraft, secondDraft);
        const first = new Date(firstDate.toISOString())
        const second = new Date(secondDate.toISOString())
        const timeDifference = second.getTime() - first.getTime()
        dispatch(changeStartTime(firstDate.toISOString()));
        dispatch(changeEndTime(secondDate.toISOString()));
        dispatch(changeOrderBy("time-asc"))
        dispatch(changeTimeDifference(timeDifference))
    }
    
    return (
        <SliderContainer>
            <Card>
                <CustomCardContent>
                    <ToggleButtonGroup
                        color="primary"
                        value={rangeType}
                        exclusive
                        onChange={handleTypeChange}
                        fullWidth={true}
                        size="small"
                        sx={{ marginBottom: 2 }}
                    >
                        <ToggleButton value="1"><b>Year</b></ToggleButton>
                        <ToggleButton value="2"><b>Month</b></ToggleButton>
                        <ToggleButton value="3"><b>Date</b></ToggleButton>
                    </ToggleButtonGroup>
                    <CustomSlider
                        getAriaLabel={() => 'range'}
                        getAriaValueText={valuetext}
                        value={range}
                        valueLabelDisplay="auto"
                        valueLabelFormat={valueLabelFormat}
                        marks
                        min={minRange}
                        max={maxRange}
                        onChange={handleRangeChange}
                        onChangeCommitted={() => handleRangeCommit(range)}
                    />
                    <Typography id="range-slider" align="center">
                        {rangeTypography(range,rangeType)}
                    </Typography>
                </CustomCardContent>

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
    margin-left:45%;
`;

const CustomSlider = muiStyle(Slider)({
    '& .MuiSlider-track': {
        background: "#3218E7"
    },
    '& .MuiSlider-rail': {
        backgroundImage: "linear-gradient(to right, #18CDE7,#00008B);"
    },
});

const CustomCardContent = muiStyle(CardContent)({
    padding:'25px'
});