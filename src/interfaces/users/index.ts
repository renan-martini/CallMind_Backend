export interface IUserRequest {
  email: string;
  password: string;
  userName: string;
  first_login: string;
  type: string;
}

export interface IUser extends IUserRequest {
  id: string;
  isActive: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}
