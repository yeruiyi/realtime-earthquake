import { useSelector } from 'react-redux';
import { RooState } from '../../store';
import useEarthquakesFetcher from '../../Leaflet/Earthquakes/hooks';
import styled from 'styled-components';
import { Card, Button, CardTitle } from "reactstrap";
import { textProps } from './models';
import { timeConverter } from '../../Leaflet/Earthquakes/utils';
export default function TextData() {
    const { startTime, endTime, longitude, latitude, maxradius } = useSelector(({ navbar }: RooState) => navbar);
    const [earthquakes, loading] = useEarthquakesFetcher(startTime, endTime, longitude, latitude, maxradius);
    if( !loading && earthquakes.features) {

        return (
            <TextContainer>
                {earthquakes.features.map((feature: textProps) => {
                    return(
                        <Card body key={feature.id}>
                            <CardTitle tag="h5">
                                {feature.properties.place}
                            </CardTitle>
                            <CardWrapper>
                                <CardTxt>
                                    <div>
                                        <b>Lat</b>: {feature.geometry.coordinates[1].toFixed(2)}&nbsp;&nbsp;&nbsp;<b>Lon:</b> {feature.geometry.coordinates[0].toFixed(2)}
                                    </div>
                                    <div>
                                        <b>Time</b>: {timeConverter(feature.properties.time, 3)}
                                    </div>
                                    <div>
                                        <b>Depth</b>: {feature.geometry.coordinates[2].toFixed(2)}&nbsp;km
                                    </div>
                                </CardTxt>
                                <ButtonContainer>
                                    <Button>
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