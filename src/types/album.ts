import type Photo from './photo';
import type User from './user';

type Album = {
  userId: number;
  id: number;
  title: string;
  user?: User;
  photos?: Photo[];
};

export default Album;
