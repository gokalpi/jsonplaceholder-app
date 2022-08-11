import type Comment from './comment';
import type User from './user';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  user?: User;
  comments?: Comment[];
};

export default Post;
