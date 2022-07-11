import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import { FeatureGroup } from "react-leaflet";
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import L from 'leaflet';
import { changeSearchCircle,changeSearchRectangle } from '../../Navbar/actions';
export default function FocusMarker() {
    const dispatch = useDispatch();

    const map = useMap();
    useEffect(() => {
        map.on('draw:created', function (e) {
          
            const type = e.layerType,
            layer = e.layer;
            
              if (type === 'circle') {
            
                var lat = Math.round(layer.getLatLng().lat).toFixed(2);
                var lng = Math.round(layer.getLatLng().lng).toFixed(2);
                var radius = Math.round(layer.getRadius()/1000).toFixed(2);
                dispatch(changeSearchCircle(Number(lng), Number(lat), Number(radius)));
              }
              if (type==='rectangle'){
                var coordinates = layer.getLatLngs();
                var minlon = Math.round(coordinates[0][0].lng).toFixed(2);
                var minlat = Math.round(coordinates[0][0].lat).toFixed(2);
                var maxlon = Math.round(coordinates[0][2].lng).toFixed(2);
                var maxlat = Math.round(coordinates[0][2].lat).toFixed(2);
                dispatch(changeSearchRectangle(Number(minlon), Number(minlat), Number(maxlon), Number(maxlat)));
              }
        })

        map.on('draw:edited', function (e) {
          
          var layers = e.layers;
          layers.eachLayer(function (layer: { getLatLng: () => { (): any; new(): any; lat: number; lng: number; }; getRadius: () => number; getLatLngs: () => any; }) {
          if (layer instanceof L.Circle) {
            var lat = Math.round(layer.getLatLng().lat).toFixed(2);
            var lng = Math.round(layer.getLatLng().lng).toFixed(2);
            var radius = Math.round(layer.getRadius()/1000).toFixed(2);
            dispatch(changeSearchCircle(Number(lng), Number(lat), Number(radius)));
          }
          if (layer instanceof L.Rectangle) {
            var coordinates = layer.getLatLngs();
            var minlon = Math.round(coordinates[0][0].lng).toFixed(2);
            var minlat = Math.round(coordinates[0][0].lat).toFixed(2);
            var maxlon = Math.round(coordinates[0][2].lng).toFixed(2);
            var maxlat = Math.round(coordinates[0][2].lat).toFixed(2);
            dispatch(changeSearchRectangle(Number(minlon), Number(minlat), Number(maxlon), Number(maxlat)));
          }
        });

      })

        map.on('draw:deleted', function (e) {
          dispatch(changeSearchCircle(null, null, null));
          dispatch(changeSearchRectangle(null, null, null, null));
      })
    })

    return (
        <FeatureGroup>
          <EditControl
            position="topright"
            draw={{
              rectangle: true,
              circle: true,
              circlemarker: false,
              polygon: false,
              marker: false,
              polyline: false,
            }}
          />
        </FeatureGroup>
    )
}

    