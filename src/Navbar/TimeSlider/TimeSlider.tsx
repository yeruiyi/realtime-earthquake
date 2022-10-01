import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { changeStartTime, changeEndTime, changeOrderBy, changeTimeDifference, changeClusterEnabled, changeMagRange } from '../actions';
import { styled as muiStyle } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = muiStyle((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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

function timeTypography (value:number[], type: string) {
    if (JSON.stringify(value) !== JSON.stringify([44, 44])) {
        const [firstDraft, secondDraft] = value;
        const displayText = displayTypography(firstDraft, secondDraft, parseInt(type));
        return displayText;
    }
    return 'Data for the today';
}

function magTypography (value:number[]) {
    const [firstMag, secondMag] = value;
    const displayText = `Data for magnitude ranged from ${firstMag} to ${secondMag}`
    return displayText;
}

export default function TimeSlider() {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(true);

    const [tabValue, setTabValue] = useState('1');
    const [clusterChecked, setClusterChecked] = useState(false);
    const [rangeType, setRangeType] = useState('3');
    const [timeRange, setTimeRange] = useState([44,44]);
    const [minTimeRange, setMinTimeRange] = useState(13);
    const [maxTimeRange, setMaxTimeRange] = useState(44);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date();

    const [magType, setMagType] = useState('3');
    const [magRange, setMagRange] = useState([7,10]);
    const [minMagRange, setMinMagRange] = useState(0);
    const [maxMagRange, setMaxMagRange] = useState(10);

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
        if (maxTimeRange === currentYear) {
            firstDate.setFullYear(firstDraft);
            secondDate.setFullYear(secondDraft);
        } else if (maxTimeRange === 12) {
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
        } else if (maxTimeRange === 44) {
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

        if (maxTimeRange === currentYear) {
            var ret = String(value);
        } else if (maxTimeRange === 12) {
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

    const handleRangeTypeChange = (event: React.MouseEvent<HTMLElement>, newRangeType: string,) => {
        setRangeType(newRangeType);
        if (newRangeType === "1") {
            setMinTimeRange(currentYear-100)
            setMaxTimeRange(currentYear)
            setTimeRange([currentYear,currentYear])
        }
        if (newRangeType === "2") {
            setMinTimeRange(1)
            setMaxTimeRange(12)
            setTimeRange([12,12])
        }
        if (newRangeType === "3") {
            setMinTimeRange(13)
            setMaxTimeRange(44)
            setTimeRange([44,44])
        }
        
    };

    const handleRangeChange = (event: Event, newRange: number | number[]) => {
        setTimeRange(newRange as number[]);
    };

 
    const handleRangeCommit = (newRange: number | number[]) => {
        const [firstDraft, secondDraft] = newRange as number[]
        const [firstDate, secondDate] = dates(firstDraft, secondDraft);
        const first = new Date(firstDate.toISOString())
        const second = new Date(secondDate.toISOString())
        const timeDifference = second.getTime() - first.getTime()
        dispatch(changeStartTime(firstDate.toISOString()));
        dispatch(changeEndTime(secondDate.toISOString()));
        dispatch(changeTimeDifference(timeDifference))
    }

    const handleClusterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClusterChecked(event.target.checked);
        if (event.target.checked) {
            dispatch(changeClusterEnabled(true))
        } else if (!event.target.checked) {
            dispatch(changeClusterEnabled(false))
        }
    };
    
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    const handleMagTypeChange = (event: React.MouseEvent<HTMLElement>, newMagType: string,) => {
        setMagType(newMagType);
        var newMagRange : number[];
        if (newMagType === "1") {
            setMagRange([0,5])
            newMagRange = [0,5]
            handleMagRangeCommit(newMagRange)
        }
        if (newMagType === "2") {
            setMagRange([5,7])
            newMagRange = [5,7]
            handleMagRangeCommit(newMagRange)
        }
        if (newMagType === "3") {
            setMagRange([7,10])
            newMagRange = [7,10]
            handleMagRangeCommit(newMagRange)
        }
    };

    const handleMagRangeChange = (event: Event, newRange: number | number[]) => {
        setMagRange(newRange as number[]);
    };

    const handleMagRangeCommit = (newMagRange: number | number[]) => {
        const [firstMag, secondMag] = newMagRange as number[]
        dispatch(changeMagRange(firstMag.toString(),secondMag.toString()));
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <SliderContainer>
            <Card>
                <CustomeCardAction disableSpacing>
                    {/* <Typography variant="h5" align="center">
                        Query Earthquakes
                    </Typography> */}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CustomeCardAction>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CustomCardContent>
                        <TabContext value={tabValue}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                    <Tab label="Time Slider" value="1" />
                                    <Tab label="Magnitude Slider" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <ToggleButtonGroup
                                    color="primary"
                                    value={rangeType}
                                    exclusive
                                    onChange={handleRangeTypeChange}
                                    fullWidth={true}
                                    size="small"
                                    sx={{ marginBottom: 2 }}
                                >
                                    <ToggleButton value="1"><b>Year</b></ToggleButton>
                                    <ToggleButton value="2"><b>Month</b></ToggleButton>
                                    <ToggleButton value="3"><b>Date</b></ToggleButton>
                                </ToggleButtonGroup>
                                <CustomTimeSlider
                                    getAriaLabel={() => 'range'}
                                    getAriaValueText={valuetext}
                                    value={timeRange}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={valueLabelFormat}
                                    marks
                                    min={minTimeRange}
                                    max={maxTimeRange}
                                    onChange={handleRangeChange}
                                    onChangeCommitted={() => handleRangeCommit(timeRange)}
                                />
                                <Typography id="range-slider" align="center">
                                    {timeTypography(timeRange,rangeType)}
                                </Typography>
                            </TabPanel>
                            <TabPanel value="2">
                                <ToggleButtonGroup
                                    color="primary"
                                    value={magType}
                                    exclusive
                                    onChange={handleMagTypeChange}
                                    fullWidth={true}
                                    size="small"
                                    sx={{ marginBottom: 2 }}
                                >
                                    <ToggleButton value="1"><b>Minor</b></ToggleButton>
                                    <ToggleButton value="2"><b>Medium</b></ToggleButton>
                                    <ToggleButton value="3"><b>Major</b></ToggleButton>
                                </ToggleButtonGroup>
                                <CustomMagSlider
                                    getAriaLabel={() => 'mag'}
                                    getAriaValueText={valuetext}
                                    value={magRange}
                                    valueLabelDisplay="auto"
                                    // valueLabelFormat={valueLabelFormat}
                                    marks
                                    min={minMagRange}
                                    max={maxMagRange}
                                    onChange={handleMagRangeChange}
                                    onChangeCommitted={() => handleMagRangeCommit(magRange)}
                                />
                                <Typography id="range-slider" align="center">
                                    {magTypography(magRange)}
                                </Typography>
                            </TabPanel>
                        </TabContext>
                        <FormGroup>
                            <FormControlLabel control={ 
                                <Switch
                                    checked={clusterChecked}
                                    onChange={handleClusterChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />} 
                            label="Cluster View" />
                        </FormGroup>
                    </CustomCardContent>
                </Collapse>
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
    margin-left:35%;
`;

const CustomeCardAction = muiStyle(CardActions)({
    padding:'0px 8px 0px 0px'
});

const CustomTimeSlider = muiStyle(Slider)({
    '& .MuiSlider-track': {
        background: "#3218E7"
    },
    '& .MuiSlider-rail': {
        backgroundImage: "linear-gradient(to right, #18CDE7,#00008B);"
    },
});

const CustomMagSlider = muiStyle(Slider)({
    '& .MuiSlider-track': {
        background: "transparent"
        //TODO: CHANGE COLOR
    },
    '& .MuiSlider-rail': {
        backgroundImage: "linear-gradient(to right, green, orange, red);"
    },
});

const CustomCardContent = muiStyle(CardContent)({
    padding:'0px 25px 25px 25px'
});