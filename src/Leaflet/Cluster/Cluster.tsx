import L, { LatLng, GeoJSON, latLng } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Marker } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import useEarthquakesFetcher from '../Earthquakes/hooks';
import { useSelector } from 'react-redux';
import { RooState } from '../../store';
import { onEachFeature } from '../Earthquakes/utils';
import { FeatureProps } from '../Earthquakes/models';
import Spinner from '../../Spinner';
type AddressPoint = Array<[number, number, number]>;

const customIcon = new L.Icon({
    iconUrl: require("../images/location.svg").default,
    iconSize: new L.Point(40, 47)
});

let geojson: GeoJSON;
export default function Cluster() {
    const { startTime, endTime, longitude, latitude, maxradius, orderby, focusLat, focusLon, minlongitude, minlatitude, maxlongitude, maxlatitude, autoplayEnabled, difference, countEnabled,clusterEnabled } = useSelector(({ navbar }: RooState) => navbar);
    const [earthquakes, loading, eqCount] = useEarthquakesFetcher(startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude, countEnabled);


    let data: any[] = [];
    geojson = L.geoJSON(earthquakes.features, {
        onEachFeature,
        pointToLayer: (feature: FeatureProps, latlng: LatLng) => {
          data.push(feature.geometry.coordinates)
          return L.marker(latlng);
        }
      });
    console.log(data)

    if (!loading && clusterEnabled){
        return (
            <MarkerClusterGroup chunkedLoading>
                {(data as AddressPoint).map((address, index) => (
                    <Marker
                        icon={customIcon}
                        key={index}
                        position={[address[1], address[0]]}
                    ></Marker>
                ))}
            </MarkerClusterGroup>
        )
    } else if (loading) {
        return (
            <Spinner />
        )
    } else {
        return(
            <></>
        )
    }
  }
  