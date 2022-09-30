import L, { LatLng, GeoJSON, latLng } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import useEarthquakesFetcher from '../Earthquakes/hooks';
import { useSelector } from 'react-redux';
import { RooState } from '../../store';
import { onEachFeature } from '../Earthquakes/utils';
import { FeatureProps } from '../Earthquakes/models';
import Spinner from '../../Spinner';
import styled from 'styled-components';

const timeConverter = (time: number, offset: number): string => {
    const d = new Date(time);
    const utc = d.getTime() + d.getTimezoneOffset() * 60000; // This converts to UTC 00:00
    const nd = new Date(utc + 3600000 * offset);
    return nd.toLocaleString();
};

const customIcon = new L.Icon({
    iconUrl: require("../images/location.svg").default,
    iconSize: new L.Point(40, 47)
});

let geojson: GeoJSON;
export default function Cluster() {
    const { startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude, countEnabled,clusterEnabled,minMag, maxMag } = useSelector(({ navbar }: RooState) => navbar);
    const [earthquakes, loading, eqCount] = useEarthquakesFetcher(startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude, countEnabled, minMag, maxMag);


    let data: any[] = [];
    geojson = L.geoJSON(earthquakes.features, {
        onEachFeature,
        pointToLayer: (feature: FeatureProps, latlng: LatLng) => {
          data.push([feature.geometry.coordinates, feature.properties.title, feature.properties.place, feature.properties.time, feature.properties.mag])
          return L.marker(latlng);
        }
    });

    if (!loading && clusterEnabled){
        return (
            <MarkerClusterGroup chunkedLoading>
                {data.map((address, index) => (
                    <Marker
                        icon={customIcon}
                        key={index}
                        position={[Number(address[0][1]), Number(address[0][0])]}
                    >
                        <Popup>
                            <PopupHeader> {address[1]} </PopupHeader>
                            <b>Place</b>: {address[2]} <br/>
                            <b>Time (GMC+3)</b>: {timeConverter(address[3], 3)} <br/>
                            <b>Lat</b>: {address[0][1]} &nbsp;
                            <b>Lon</b>: {address[0][0]} <br/>
                            <b>Depth</b>: {address[0][2]} km <br/>
                            <b>Magnitude</b>: {address[4]} Richter <br></br>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        )
    } else if (loading) {
        return ( <Spinner /> )
    } else {
        return ( <></> )
    }
  }

  const PopupHeader = styled.h3`
    font-size: 1.17em;
    font-weight: bold;
`;
