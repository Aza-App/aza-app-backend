export interface SignUpProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  referalCode?: string;
  password: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface APIErrorResponseProps {
  success: boolean;
  message: string;
}
