import { Course } from './course.type';

interface Cart {
  courses: Omit<
    Course,
    | 'isActive'
    | 'startDate'
    | 'endDate'
    | 'totalDuration'
    | 'totalReview'
    | 'orders'
    | 'lessons'
    | 'review'
    | 'category'
  >[];
}
export { Cart };
