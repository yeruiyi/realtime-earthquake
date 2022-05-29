import httpService from '../../api/httpService';

const getEarthquakes = async (starttime: string, endtime: string, latitude:number, longitude:number,maxradius:number) => {
  try {
    if (latitude != null && latitude != null && maxradius !=null){
      const response = await httpService.get(
        `/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&latitude=${latitude}&longitude=${longitude}&maxradius=${maxradius}`
      );
      const { data } = response;
      return data;
    } else {
      const response = await httpService.get(
        `/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}`
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
