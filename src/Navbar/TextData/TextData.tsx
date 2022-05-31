import { useSelector,useDispatch } from 'react-redux';
import { RooState } from '../../store';
import useEarthquakesFetcher from '../../Leaflet/Earthquakes/hooks';
import styled from 'styled-components';
import { Card, Button, CardTitle } from "reactstrap";
import { textProps } from './models';
import { timeConverter } from '../../Leaflet/Earthquakes/utils';
import { changeFocus } from '../actions';

export default function TextData() {
    const dispatch = useDispatch();
    const { startTime, endTime, longitude, latitude, maxradius, orderby } = useSelector(({ navbar }: RooState) => navbar);
    const [earthquakes, loading] = useEarthquakesFetcher(startTime, endTime, longitude, latitude, maxradius, orderby);

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    
        const button: HTMLButtonElement = event.currentTarget;
        const focusArr = button.value.split(',')
        dispatch(changeFocus(Number(focusArr[0]),Number(focusArr[1]),1));
    };

    if( !loading && earthquakes.features) {

        return (
            <TextContainer>
                {earthquakes.features.map((feature: textProps) => {
                    const lat = feature.geometry.coordinates[1]
                    const lon = feature.geometry.coordinates[0]
                    return(
                        <Card body key={feature.id}>
                            <CardTitle tag="h5">
                                {feature.properties.place}
                            </CardTitle>
                            <CardWrapper>
                                <CardTxt>
                                    <div>
                                        <b>Lat</b>: {lat.toFixed(2)}&nbsp;&nbsp;&nbsp;<b>Lon:</b> {lon.toFixed(2)}
                                    </div>
                                    <div>
                                        <b>Time</b>: {timeConverter(feature.properties.time, 3)}
                                    </div>
                                    <div>
                                        <b>Depth</b>: {feature.geometry.coordinates[2].toFixed(2)}&nbsp;km
                                    </div>
                                </CardTxt>
                                <ButtonContainer>
                                    <Button onClick={buttonHandler} value={[lat,lon,]}>
                                        {feature.properties.mag.toFixed(1)}
                                    </Button>
                                </ButtonContainer>
                            </CardWrapper>
                        </Card>
                    );
                })}
                    {/* 
                    <Button>
                        Go somewhere
                    </Button> */}
            </TextContainer>
        );
    } else {
        return (
            <>
            </>
        )
    }
}

const TextContainer = styled.div`
    background-color: #ffffff;
    margin-top:10px;
`;
const CardWrapper = styled.div`
    height:100%;
    width:100%;
    display: flex;
`;
const CardTxt = styled.div`
    width:80%;
`;
const ButtonContainer = styled.div`
    width:20%;
    margin: auto;
`;