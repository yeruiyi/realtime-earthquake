import httpService from '../../api/httpService';

const getEarthquakes = async (starttime: string, endtime: string, longitude:number,latitude:number, maxradius:number, orderby:string, minlongitude:number, minlatitude:number, maxlongitude:number, maxlatitude:number, countEnabled:boolean, minMag:string, maxMag:string) => {
  try {
    if (longitude != null && latitude != null && maxradius !=null){
      const response = await httpService.get(
        `/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&longitude=${longitude}&latitude=${latitude}&maxradiuskm=${maxradius}&orderby=${orderby}&minmagnitude=${minMag}&maxmagnitude=${maxMag}`
      );

      const { data } = response;

      var count = 0;
      if (countEnabled) {
        count =  await httpService.get(
          `/fdsnws/event/1/count?format=geojson&starttime=${starttime}&endtime=${endtime}&longitude=${longitude}&latitude=${latitude}&maxradiuskm=${maxradius}&orderby=${orderby}&minmagnitude=${minMag}&maxmagnitude=${maxMag}`
        );
      }
      return [data,count,false];

    } else if (minlongitude != null && minlatitude != null && maxlongitude != null && maxlatitude !=null) {
      const response = await httpService.get(
        `/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&minlongitude=${minlongitude}&minlatitude=${minlatitude}&maxlongitude=${maxlongitude}&maxlatitude=${maxlatitude}&orderby=${orderby}&minmagnitude=${minMag}&maxmagnitude=${maxMag}`
      );

      const { data } = response;

      var count = 0;
      if (countEnabled) {
        count =  await httpService.get(
          `/fdsnws/event/1/count?format=geojson&starttime=${starttime}&endtime=${endtime}&minlongitude=${minlongitude}&minlatitude=${minlatitude}&maxlongitude=${maxlongitude}&maxlatitude=${maxlatitude}&orderby=${orderby}&minmagnitude=${minMag}&maxmagnitude=${maxMag}`
        );
      }
      return [data,count,false];

    } else {
      const response = await httpService.get(
        `/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&orderby=${orderby}&minmagnitude=${minMag}&maxmagnitude=${maxMag}`
      );

      const { data } = response;

      var count = 0;
      if (countEnabled) {
        count =  await httpService.get(
          `/fdsnws/event/1/count?format=geojson&starttime=${starttime}&endtime=${endtime}&orderby=${orderby}&minmagnitude=${minMag}&maxmagnitude=${maxMag}`
        );
      }
      return [data,count,false];
    }

  } catch (error) {
    console.log('There was an error while getting the earthquakes', error);
    return [false,0,true];
  }
};

export default getEarthquakes;
