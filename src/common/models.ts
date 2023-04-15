export interface SignUpModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  referalCode?: string;
  password: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface APIResponseModel {
  success: boolean;
  message: string;
}
