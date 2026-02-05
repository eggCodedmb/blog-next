export interface LoginRes {
  email: string;
  password: string;
}

export interface RegisterRes extends LoginRes {
  name: string;
  confirmPassword: string;
}


