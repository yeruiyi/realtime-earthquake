import Fab from '@mui/material/Fab';
import styled from 'styled-components';
import { RooState } from '../../store';
import useEarthquakesFetcher from '../../Leaflet/Earthquakes/hooks';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { styled as muiStyle } from '@mui/material/styles';

function formatDate(inputDate: Date) {
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth();
    const date = inputDate.getDate();
    return `${year}/${month+1}/${date}`
}
const CustomText = muiStyle(Typography)({
    display: 'inline-block',
    height: "30px", 
    width:"250px", 
    position:"relative",
});



export default function CountButton() {
    const { startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude, countEnabled, minMag, maxMag } = useSelector(({ navbar }: RooState) => navbar);
    const [earthquakes,loading,eqCount] = useEarthquakesFetcher(startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude, countEnabled, minMag, maxMag);
    var count = 0
    var today = new Date();    

    var start;
    var end;

    if (startTime =="NOW - 1day") {
        var endDate = new Date(Date.now() - 172800000);
        start = formatDate(endDate)
        end =formatDate(today)
    } else if (startTime =="NOW - 3days") {
        var endDate = new Date(Date.now() - 345600000);
        start = formatDate(endDate)
        end =formatDate(today)
    } else if (startTime =="NOW - 10days") {
        var endDate = new Date(Date.now() - 950400000);
        start = formatDate(endDate)
        end =formatDate(today)
    } else if (startTime =="NOW - 20days") {
        var endDate = new Date(Date.now() - 1814400000);
        start = formatDate(endDate)
        end =formatDate(today)
    } else if (startTime =="NOW - 30days") {
        var endDate = new Date(Date.now() - 2678400000);
        start = formatDate(endDate)
        end =formatDate(today)
    } else {
        start = formatDate(new Date(startTime))
        end = formatDate(new Date(endTime))
    }
    if (!loading&&earthquakes.features) {
        return(
            <HeatmapContainer>
                    <CustomText>Time: {start} - {end}</CustomText>
                    <CustomText>Magnitude: {minMag} - {maxMag}</CustomText>
                    <Fab color="primary" style={{ display: 'inline-block' }}>{eqCount.data.count}</Fab>                    
            </HeatmapContainer>
        )
    } else {
        return(
            <HeatmapContainer>
                    <CustomText>Time: {start} - {end}</CustomText>
                    <CustomText>Magnitude: {minMag} - {maxMag}</CustomText>
                    <Fab color="primary" style={{ display: 'inline-block' }}>0</Fab>                    
            </HeatmapContainer>
        )
    }
}

const HeatmapContainer = styled.div`
    position: fixed;
    z-index: 314159;
    margin:auto;
    width: 560px;
    right: 0;
    text-align: center;
`;