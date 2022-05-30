export interface FeatureProps {
  id:string;
  geometry: any;
  properties: {
    mag: number;
    place: string;
    time: number;
    url: string;
    title: string;
  };
  type: string;
}
