import { useSelector } from 'react-redux';
import { RooState } from '../../store';
import useEarthquakesFetcher from '../../Leaflet/Earthquakes/hooks';
import styled from 'styled-components';
import { Card, CardText, Button } from "reactstrap";
import { FeatureProps } from '../../Leaflet/Earthquakes/models';
export default function TextData() {
    const { startTime, endTime, longitude, latitude, maxradius } = useSelector(({ navbar }: RooState) => navbar);
    const [earthquakes, loading] = useEarthquakesFetcher(startTime, endTime, longitude, latitude, maxradius);
    if( !loading && earthquakes.features) {
        return (
            <TextContainer>
                <Card body>
                    {earthquakes.features.forEach((feature: FeatureProps) => {
                        return (
                            <CardText>
                                {feature.properties.mag}
                            </CardText>
                        );
                    })}
                    {/* <CardText>
                        With supporting text below as a natural lead-in to additional content.
                    </CardText>
                    <Button>
                        Go somewhere
                    </Button> */}
                </Card>
            </TextContainer>
        );
        console.log(earthquakes.features[0]);
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
