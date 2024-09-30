import { Lesson } from './lesson.type';
import { Order } from './order.type';
import { Review } from './review.type';

interface Course {
  _id: string;
  name: string;
  isActive: boolean;
  description: string;
  author: string;
  category: string;
  imgUrls: string[]; // Array of URLs
  totalDuration: string; // Computed string for total duration
  totalReview: number; // Computed number for total reviews
  price: number;
  startDate: Date;
  endDate: Date;
  orders: Order[]; // Array of orders
  lessons: Lesson[]; // Array of lessons
  reviews: Review[]; // Array of reviews
}
export { Course };
