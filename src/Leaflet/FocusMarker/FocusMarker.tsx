import {
    Marker,
  } from 'react-leaflet';
  import L from 'leaflet';
  import { useSelector } from 'react-redux';
  import { RooState } from '../../store';

  
  delete L.Icon.Default.imagePath;
  
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('../images/marker-icon-2x.png'),
    iconUrl: require('../images/marker-icon.png'),
    shadowUrl: require('../images/marker-shadow.png')
  });
  
  export default function FocusMarker() {
    const { focusLat, focusLon } = useSelector(({ navbar }: RooState) => navbar);
    if (focusLat!==0 && focusLon!=0) {
        return (
            <Marker position={[focusLat, focusLon]}></Marker>
        );
    } else {
        return (
            <>
            </>
        )
    }

  }
  