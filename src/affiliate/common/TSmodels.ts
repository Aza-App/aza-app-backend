export interface SignUpAPIProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  referalCode?: string;
  password: string;
}

export interface LoginAPIProps {
  email: string;
  password: string;
}

export interface ForgotPasswordAPIProps {
  email: string;
}

export interface APIErrorResponseProps {
  success: boolean;
  message: string;
}

export interface DashboardAPIProps {
  uid: string;
  balance: number;
  refererCode: string;
}
