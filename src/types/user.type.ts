import { Address } from "./address.type";
import { Cart } from "./cart.type";
import { GENDER } from "./enum";
import { Notify } from "./notify.type";
import { Role } from "./role.type";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phone: string;
  gender: GENDER;
  status: boolean;
  googleId: string;
  roles: Role;
  carts: Cart;
  addresses: Address[];
  notifies: Notify[];
  currentCourse: Array<{ _id: string; progress: number; time: string }>;
}
export { User };
