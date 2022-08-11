import type GeoLocation from './geolocation';

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
};

export default Address;
