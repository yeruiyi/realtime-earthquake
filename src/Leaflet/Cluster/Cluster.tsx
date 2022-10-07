import * as React from 'react';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import useEarthquakesFetcher from '../Earthquakes/hooks';
import { useSelector } from 'react-redux';
import { RooState } from '../../store';
import Spinner from '../../Spinner';
import styled from 'styled-components';
import { textProps } from '../../Navbar/TextData/models';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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


export default function Cluster() {
    const { startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude, countEnabled,clusterEnabled,minMag, maxMag } = useSelector(({ navbar }: RooState) => navbar);
    const [earthquakes, loading, eqCount,error] = useEarthquakesFetcher(startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude, countEnabled, minMag, maxMag);
    const [open, setOpen] = React.useState(true);
    
    React.useEffect(() => {
        if (error) {
            setOpen(true);
        } else {
            setOpen(false)
        }
    },[error])
    
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    if (!loading && clusterEnabled){
        return (
            <MarkerClusterGroup chunkedLoading>
                {earthquakes.features.map((feature: textProps) => {
                    const lat = feature.geometry.coordinates[1]
                    const lon = feature.geometry.coordinates[0]
                    var mag = feature.properties.mag
                    if(feature.properties.mag){
                        mag = feature.properties.mag
                    } else {
                        mag = 0
                    }
                    return (
                        <Marker
                            icon={customIcon}
                            key={feature.id}
                            position={[Number(lat), Number(lon)]}
                            >
                            <Popup>
                                <PopupHeader> {feature.properties.title} </PopupHeader>
                                <b>Place</b>: {feature.properties.place} <br/>
                                <b>Time (GMC+3)</b>: {timeConverter(feature.properties.time, 3)} <br/>
                                <b>Lat</b>: {lat} bsp;
                                <b>Lon</b>: {lon} <br/>
                                <b>Depth</b>: {feature.geometry.coordinates[2]} km <br/>
                                <b>Magnitude</b>: {mag} Richter <br/>
                                <b>Details</b>: <a href={feature.properties.url}>click here to see more details</a>
                            </Popup>
                        </Marker>
                    );
                })}
            </MarkerClusterGroup>
        )
    } else if (loading) {
        return ( <Spinner /> )
    } else if (error) {
        return (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Earthquake data exceeds system storage!
                </Alert>
            </Snackbar>
        )
    } else {
        return ( <></> )
    }
  }

  const PopupHeader = styled.h3`
    font-size: 1.17em;
    font-weight: bold;
`;
