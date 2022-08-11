import axios from 'axios';

export const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetcher = (url: string) => {
  return axios
    .get(url, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((res) => res.data);
  // return fetch(url, {
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //   },
  // }).then((res) => res.json());
};
