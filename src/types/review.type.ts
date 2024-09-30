import { User } from './user.type';

interface Review {
  _id: string;
  message: string;
  rating: number;
  user: Pick<User, '_id' | 'firstName' | 'lastName'>;
  course_id: string;
}
export { Review };
