import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import { FeatureGroup } from "react-leaflet";
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import L from 'leaflet';
import { changeSearchCircle,changeSearchRectangle } from '../../Navbar/actions';
export default function DrawShape() {
    const dispatch = useDispatch();

    const map = useMap();
    useEffect(() => {
        map.on('draw:created', function (e) {
          
            const type = e.layerType,
            layer = e.layer;
            
              if (type === 'circle') {
            
                var lat = layer.getLatLng().lat
                var lng = layer.getLatLng().lng
                var radius = layer.getRadius()/1000
                dispatch(changeSearchCircle(Number(lng), Number(lat), Number(radius)));
              }
              if (type==='rectangle'){
                var coordinates = layer.getLatLngs();
                var minlon = coordinates[0][0].lng
                var minlat = coordinates[0][0].lat
                var maxlon = coordinates[0][2].lng
                var maxlat = coordinates[0][2].lat
                dispatch(changeSearchRectangle(Number(minlon), Number(minlat), Number(maxlon), Number(maxlat)));
              }
        })

        map.on('draw:edited', function (e) {
          
          var layers = e.layers;
          layers.eachLayer(function (layer: { getLatLng: () => { (): any; new(): any; lat: number; lng: number; }; getRadius: () => number; getLatLngs: () => any; }) {
          if (layer instanceof L.Circle) {
            var lat = layer.getLatLng().lat
            var lng = layer.getLatLng().lng
            var radius = layer.getRadius()/1000
            dispatch(changeSearchCircle(Number(lng), Number(lat), Number(radius)));
          }
          if (layer instanceof L.Rectangle) {
            var coordinates = layer.getLatLngs();
            var minlon = coordinates[0][0].lng
            var minlat = coordinates[0][0].lat
            var maxlon = coordinates[0][2].lng
            var maxlat = coordinates[0][2].lat
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

    