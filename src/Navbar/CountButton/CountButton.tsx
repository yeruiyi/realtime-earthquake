import Fab from '@mui/material/Fab';
import styled from 'styled-components';
import { RooState } from '../../store';
import useEarthquakesFetcher from '../../Leaflet/Earthquakes/hooks';
import { useSelector } from 'react-redux';



export default function CountButton() {
    const { startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude, countEnabled, minMag, maxMag } = useSelector(({ navbar }: RooState) => navbar);
    const [earthquakes,loading,eqCount] = useEarthquakesFetcher(startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude, countEnabled, minMag, maxMag);
    var count = 0
    if (!loading&&earthquakes.features) {
        return(
            <HeatmapContainer>
                <Fab color="primary">{eqCount.data.count}</Fab>
            </HeatmapContainer>
        )
    } else {
        return(
        <HeatmapContainer>
            <Fab color="primary">0</Fab>
        </HeatmapContainer>
        )
    }
}

const HeatmapContainer = styled.div`
    position: absolute;
    z-index: 314159;
    margin:auto;
    width:5%;
    right: 0;
`;