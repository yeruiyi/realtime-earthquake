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
  const { startTime, endTime, longitude, latitude, maxradius, orderby, focusLat, focusLon, minlongitude, minlatitude, maxlongitude, maxlatitude, autoplayEnabled, autoplayType } = useSelector(({ navbar }: RooState) => navbar);
  const [earthquakes, loading] = useEarthquakesFetcher(startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude);

  const map = useMap();

  if (map && focusLat !== 0 && focusLon !== 0 ) {
    const coordinates = latLng(focusLat, focusLon);
    map.flyTo(coordinates, 13, {
      duration: 2
    })
  }

  let marker: L.Layer;
  function autoPlayMarker (index: LatLng ){
    if (marker) {
      map.removeLayer(marker)
    }
    marker = new L.Marker(index).addTo(map)
  }
  
  if (map && geojson) {
    if (autoplayEnabled) {
      if (autoplayType == 'time') {
        let timeHash = new Map()
        let timeArray: any[] = []
        geojson.eachLayer(layer => {
          var time = layer.feature.properties.time
          var latlng = layer._latlng
          timeArray.push(time)
          timeHash.set(time,latlng)
        })
    
        const sort = timeArray.sort((a, b) => a-b)
        for (let _i = 0; _i < sort.length; _i++) {
          setTimeout(() =>autoPlayMarker(timeHash.get(sort[_i])),_i*2000)
        }
      }
      
      if (autoplayType == 'magnitude') {
        let magHash = new Map()
        let magArray: any[] = []
        geojson.eachLayer(layer => {
          var mag = layer.feature.properties.mag
          var latlng = layer._latlng
          magArray.push(mag)
          magHash.set(mag,latlng)
        })
    
        const sort = magArray.sort((a, b) => a-b)
        for (let _i = 0; _i < sort.length; _i++) {
          setTimeout(() =>autoPlayMarker(magHash.get(sort[_i])),_i*2000)
        }
      }
    }
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
