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
  countEnabled:boolean,
  minMag:string,
  maxMag:string,
  
): any[] {
  const [earthquakes, setEarthquakes] = useState({});
  const [eqCount, setEqCount] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchEarthquakes = async () => {
      try {
        const [data,count,err] = await getEarthquakes(startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude, countEnabled, minMag, maxMag );
        setEarthquakes(data);
        setEqCount(count);
        if (err) {
          setError(true);
        }
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };

    fetchEarthquakes();
  }, [startTime, endTime, longitude, latitude, maxradius, orderby, minlongitude, minlatitude, maxlongitude, maxlatitude, countEnabled,minMag, maxMag ]);

  return [earthquakes, loading, eqCount, error];
}
