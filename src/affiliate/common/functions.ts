import { SignUpModel } from "../Schema/newUser";
import * as Props from "../common/TSmodels";
import * as constants from "../common/constants";

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const generateReferralCode = () => {
  return `${Math.floor(Math.random() * 9)}${Math.floor(
    Math.random() * 9
  )}${Math.floor(Math.random() * 9)}${Math.floor(
    Math.random() * 9
  )}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`;
};

export const uniqueEmailPhone = async (
  email,
  phoneNumber
): Promise<Props.APIErrorResponseProps> => {
  // Reasons Why the API might failed
  const APIErrorResponse: Props.APIErrorResponseProps = {
    success: false,
    message: "",
  };

  try {
    const result = await SignUpModel.findOne({
      email: email,
      phoneNumber: phoneNumber,
    });
    if (result !== null) {
      APIErrorResponse.message = constants.EMAIL_PHONE_ALREADY_EXIST;
    } else {
      APIErrorResponse.success = true;
    }
  } catch (error) {
    APIErrorResponse.message = error;
  }

  return APIErrorResponse;
};
