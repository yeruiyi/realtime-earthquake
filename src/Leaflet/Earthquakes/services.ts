import httpService from '../../api/httpService';

const getEarthquakes = async (starttime: string, endtime: string, longitude:number,latitude:number, maxradius:number, orderby:string) => {
  try {
    if (longitude != null && latitude != null && maxradius !=null){
      const response = await httpService.get(
        `/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&longitude=${longitude}&latitude=${latitude}&maxradius=${maxradius}&orderby=${orderby}`
      );
      const { data } = response;
      return data;
    } else {
      const response = await httpService.get(
        `/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&orderby=${orderby}`
      );
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log('There was an error while getting the earthquakes', error);
    return false;
  }
};

export default getEarthquakes;
