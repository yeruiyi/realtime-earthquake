import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import L, { LatLng, GeoJSON, latLng } from 'leaflet';
import { useMap } from 'react-leaflet';

import Spinner from '../../Spinner';
import useEarthquakesFetcher from './hooks';
import { RooState } from '../../store';
import { onEachFeature } from './utils';
import { geojsonMarkerOptions } from '../utils';
import { FeatureProps } from './models';

let geojson: GeoJSON;

export default function Earthquakes() {
  const { startTime, endTime, longitude, latitude, maxradius, orderby, focusLat, focusLon } = useSelector(({ navbar }: RooState) => navbar);
  const [earthquakes, loading] = useEarthquakesFetcher(startTime, endTime, longitude, latitude, maxradius, orderby);

  const map = useMap();

  if (map && focusLat !== 0 && focusLon !== 0 ) {
    const coordinates = latLng(focusLat, focusLon);
    map.flyTo(coordinates, 15, {
      duration: 2
    })

    
  }

  useEffect(() => {
    if (map && geojson && map.hasLayer(geojson)) map.removeLayer(geojson);

    geojson = L.geoJSON(earthquakes.features, {
      onEachFeature,
      pointToLayer: (feature: FeatureProps, latlng: LatLng) => {
        const magnitude = feature.properties.mag;
        return L.circleMarker(latlng, geojsonMarkerOptions(magnitude));
      }
    });


    if (map) geojson.addTo(map);

  }, [earthquakes, map]);

  if (loading) return <Spinner />;

  return null;
}
