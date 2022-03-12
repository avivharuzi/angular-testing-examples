export interface IsEmailTakenResponse {
  isEmailTaken: boolean;
}

export interface Signup {
  plan: SignupPlan;
  email: string;
  password: string;
  address: {
    name: string;
    country: string;
  };
  termsAndServices: true;
}

export type SignupPlan = 'personal' | 'business';

export interface SignupResponse {
  success: boolean;
}
