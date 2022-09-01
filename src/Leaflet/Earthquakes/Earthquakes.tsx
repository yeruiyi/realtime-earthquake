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
//to-do change marker image to gif circle
var markerIcon = L.icon({
  iconUrl: require('../images/red-circle-marker-gif.gif'),
  iconSize: [60, 60]
})
export default function Earthquakes() {
  const { startTime, endTime, longitude, latitude, maxradius, orderby, focusLat, focusLon, minlongitude, minlatitude, maxlongitude, maxlatitude, autoplayEnabled, difference } = useSelector(({ navbar }: RooState) => navbar);
  const [earthquakes, loading] = useEarthquakesFetcher(startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude);
  const dispatch = useDispatch();

  const map = useMap();

  if (map && focusLat !== 0 && focusLon !== 0 ) {
    const coordinates = latLng(focusLat, focusLon);
    map.flyTo(coordinates, 13, {
      duration: 2
    })
  }

  // let marker: L.Layer;
  // let markerGroup: any[];
  // function autoPlayMarker (marker: L.CircleMarker){
  //   if (marker) {
  //     map.removeLayer(marker)
  //   }
  //   markerGroup[index] = L.circleMarker(position,geojsonMarkerOptions()).addTo(map)
  //   return marker
  // }
  
  // if (map && geojson) {
  //   if (autoplayEnabled) {
  //     if (autoplayType == 'time') {
  //       let timeHash = new Map()
  //       let timeArray: any[] = []
  //       geojson.eachLayer(layer => {
  //         var time = layer.feature.properties.time
  //         var latlng = layer._latlng
  //         timeArray.push(time)
  //         timeHash.set(time,latlng)
  //       })
  //       const sort = timeArray.sort((a, b) => a-b)
  //       for (let _i = 0; _i < sort.length; _i++) {
  //         (async () => {
  //           var result = await new Promise(resolve => setTimeout(resolve, _i*2000)).then(() => autoPlayMarker(timeHash.get(sort[_i]),_i))
  //           if  (_i == sort.length-1) {
  //             result = await new Promise(resolve => setTimeout(resolve, 2000))
  //             // marker = autoPlayMarker(timeHash.get(sort[_i]))
  //             // map.removeLayer(marker)
  //             dispatch(autoPlayTypeChanged(false,''));
  //           }
  //         })()
  //       }
  //     }
      
  //     // if (autoplayType == 'magnitude') {
  //     //   let magHash = new Map()
  //     //   let magArray: any[] = []
  //     //   geojson.eachLayer(layer => {
  //     //     var mag = layer.feature.properties.mag
  //     //     var latlng = layer._latlng
  //     //     magArray.push(mag)
  //     //     magHash.set(mag,latlng)
  //     //   })
    
  //     //   const sort = magArray.sort((a, b) => a-b)
  //     //   for (let _i = 0; _i < sort.length; _i++) {
  //     //     (async () => {
  //     //       var result = await new Promise(resolve => setTimeout(resolve, _i*2000)).then(() => autoPlayMarker(magHash.get(sort[_i])))
  //     //       if  (_i == sort.length-1) {
  //     //         result = await new Promise(resolve => setTimeout(resolve, 2000))
  //     //         marker = autoPlayMarker(magHash.get(sort[_i]))
  //     //         map.removeLayer(marker)
  //     //         dispatch(autoPlayTypeChanged(false,''));
  //     //       }
  //     //     })()
  //     //   }
  //     // }
  //   }
  // }

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

    const sort = timeArray.sort((a, b) => a-b)
    for (let _i = 0; _i < sort.length; _i++) {
      (async () => {
        var result = await new Promise(resolve => setTimeout(resolve, _i*2000)).then(() => autoPlayMarker(sort,_i))
        if  (_i == sort.length-1) {
          result = await new Promise(resolve => setTimeout(resolve, 2000))
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

    
    if (!autoplayEnabled) {

      geojson = L.geoJSON(earthquakes.features, {
        onEachFeature,
        pointToLayer: (feature: FeatureProps, latlng: LatLng) => {
          const magnitude = feature.properties.mag;
          return L.circleMarker(latlng, geojsonMarkerOptions(magnitude));
        }
      });

      if (map) geojson.addTo(map);

    }

    

  }, [earthquakes, map]);

  if (loading) return <Spinner />;

  return null;
}
