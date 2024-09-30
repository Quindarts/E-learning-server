interface IUser {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'M' | 'F' | 'O';
}

interface IAuth {
  email: string;
  password: string;
}

export { IUser, IAuth };
