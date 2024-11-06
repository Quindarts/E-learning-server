import { User } from "./user.type";

interface Review {
  _id: string;
  message: string;
  rating: number;
  user: Partial<User>;
  course_id: string;
}
export { Review };
