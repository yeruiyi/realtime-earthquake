import { useState, useEffect } from 'react';

import getEarthquakes from './services';

export default function useEarthquakesFetcher(
  startTime: string,
  endTime: string,
  longitude: number,
  latitude: number,
  maxradius: number,
  orderby: string,
  minlongitude:number,
  minlatitude:number,
  maxlongitude:number,
  maxlatitude:number,
  
): any[] {
  const [earthquakes, setEarthquakes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchEarthquakes = async () => {
      try {
        const data = await getEarthquakes(startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude );
        setEarthquakes(data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };

    fetchEarthquakes();
  }, [startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude ]);

  return [earthquakes, loading, error];
}
