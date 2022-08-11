import type Address from './address';
import type Album from './album';
import type Company from './company';
import type Post from './post';
import type Todo from './todo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  posts?: Post[];
  albums?: Album[];
  todos?: Todo[];
};

export default User;
