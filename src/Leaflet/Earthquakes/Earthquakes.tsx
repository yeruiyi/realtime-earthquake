import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import L, { LatLng, GeoJSON, latLng } from 'leaflet';
import { useMap } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import Spinner from '../../Spinner';
import useEarthquakesFetcher from './hooks';
import { RooState } from '../../store';
import { onEachFeature } from './utils';
import { geojsonMarkerOptions, geojsonMarkerAutoplay } from '../utils';
import { FeatureProps } from './models';
import { autoPlayTypeChanged } from '../../Navbar/actions';

let geojson: GeoJSON;
var focusMarker: L.Layer;
var previousFocus = [0,0];
export default function Earthquakes() {
  const { startTime, endTime, longitude, latitude, maxradius, orderby, focusLat, focusLon, minlongitude, minlatitude, maxlongitude, maxlatitude, autoplayEnabled,autoplayType, difference, countEnabled,clusterEnabled, minMag, maxMag } = useSelector(({ navbar }: RooState) => navbar);
  const [earthquakes, loading, eqCount] = useEarthquakesFetcher(startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude, countEnabled, minMag, maxMag);
  const dispatch = useDispatch();

  const map = useMap();

  let timeHash = new Map()
  let timeArray: any[] = []
  function autoPlayMarker (markerArray: Array<number>,index: number){
    for (let _i = 0; _i < index; _i++){
      var timeDifference = markerArray[index]- markerArray[_i] 
      if ( difference !== 0 ) {
        var lastBound = difference * 0.5
        var thirdBound = difference * 0.375
        var secBound = difference * 0.25
        var firstBound = difference * 0.125
        if ( timeDifference > lastBound){
          timeHash.get(markerArray[_i]).setStyle({ fillOpacity: 0, opacity: 0 })
        } else if ( timeDifference < lastBound && timeDifference > thirdBound){
          timeHash.get(markerArray[_i]).setStyle({ fillOpacity: 0.25, opacity: 0.25 })
        } else if ( timeDifference < thirdBound && timeDifference > secBound){
          timeHash.get(markerArray[_i]).setStyle({ fillOpacity: 0.5, opacity: 0.5 })
        } else if ( timeDifference < secBound && timeDifference > firstBound){
          timeHash.get(markerArray[_i]).setStyle({ fillOpacity: 0.75, opacity: 0.75 })
        } else if ( timeDifference < firstBound ){
          timeHash.get(markerArray[_i]).setStyle({ fillOpacity: 1, opacity: 1 })
        } 
      }
    }
    
    var marker = timeHash.get(markerArray[index])
    if (map) marker.addTo(map);
  }
  if (clusterEnabled) {
    map.removeLayer(geojson);
  } 

  if (autoplayEnabled) {
    map.removeLayer(geojson);

    geojson = L.geoJSON(earthquakes.features, {
      onEachFeature,
      pointToLayer: (feature: FeatureProps, latlng: LatLng) => {
        const magnitude = feature.properties.mag;
        const time = feature.properties.time;

        const marker = L.circleMarker(latlng, geojsonMarkerOptions(magnitude));
        timeArray.push(time)
        timeHash.set(time,marker)

        return L.circleMarker(latlng, geojsonMarkerOptions(magnitude));
      }
    });

    console.log(autoplayType)
    var timeOut = 1000;
    if (autoplayType == "1x" ){
      timeOut = 1000;
    } else if (autoplayType == "2x"){
      timeOut = 500;
    }
    
    const sort = timeArray.sort((a, b) => a-b)
    for (let _i = 0; _i < sort.length; _i++) {
      (async () => {
        var result = await new Promise(resolve => setTimeout(resolve, _i*timeOut)).then(() => autoPlayMarker(sort,_i))
        if  (_i == sort.length-1) {
          result = await new Promise(resolve => setTimeout(resolve, timeOut))
          // marker = autoPlayMarker(timeHash.get(sort[_i]))
          for (let _i = 0; _i < sort.length; _i++){
            var marker = timeHash.get(sort[_i])
            map.removeLayer(marker);
          }
          geojson.addTo(map);
          dispatch(autoPlayTypeChanged(false,''));
        }
      })()
    }

  }

  useEffect(() => {
    if (map && geojson && map.hasLayer(geojson)) map.removeLayer(geojson);

    
    if (!autoplayEnabled && !clusterEnabled) {

      geojson = L.geoJSON(earthquakes.features, {
        onEachFeature,
        pointToLayer: (feature: FeatureProps, latlng: LatLng) => {
          const magnitude = feature.properties.mag;
          return L.circleMarker(latlng, geojsonMarkerOptions(magnitude));
        }
      });

      if (map) geojson.addTo(map)

    }

    
    if (map && focusLat !== 0 && focusLon !== 0 && previousFocus[0]!=focusLat && previousFocus[1]!=focusLon ) {
      previousFocus = [focusLat,focusLon];

      const coordinates = latLng(focusLat, focusLon);
      var customIcon = new L.Icon({
        iconUrl: require('../images/marker-icon.png'),
        shadowUrl: require('../images/marker-shadow.png'),
      });
  
      if (focusMarker) {
        map.removeLayer(focusMarker)
      }
  
      focusMarker = new L.Marker([focusLat+0.0001, focusLon-0.00008], {icon: customIcon})
      focusMarker.addTo(map)
  
      map.flyTo(coordinates, 15, {
        duration: 2
      })
    }
  }, [earthquakes, map, clusterEnabled,focusLat,focusLon]);

  if (loading) return <Spinner />;

  return null;
}
