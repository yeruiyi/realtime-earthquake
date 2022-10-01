import {
  MapContainer,
  TileLayer,
  LayersControl,
  GeoJSON,
  ScaleControl
} from 'react-leaflet';
import Earthquakes from './Earthquakes';
import Legend from './Legend';
import tectonicPlates from './PB2002_boundaries.json';
import { mapHeight, tectonicPlatesStyle, tileLayers } from './constants';
import DrawShape from './DrawShape'
import Cluster from './Cluster';

export default function Leaflet() {
  return (
    <MapContainer center={[0, 0]} zoom={3} style={mapHeight}>
      <LayersControl position="topright">
        {tileLayers.map(({ id, name, attribution, url, checked }) => (
          <LayersControl.BaseLayer key={id} name={name} checked={checked}>
            <TileLayer attribution={attribution} url={url} />
          </LayersControl.BaseLayer>
        ))}
        <LayersControl.Overlay name="Tectonic Plates">
          <GeoJSON
            data={tectonicPlates as GeoJSON.GeoJsonObject}
            style={tectonicPlatesStyle}
          />
        </LayersControl.Overlay>
      </LayersControl>
      <Cluster/>
      <Earthquakes />
      <ScaleControl />
      <Legend />
      <DrawShape/>
    </MapContainer>
  );
}
