import { SignUpModel } from "../Schema/newUser";

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

export const uniqueEmailPhone = (email, phoneNumber) => {
  try {
    const result = SignUpModel.findOne({
      email: email,
      phoneNumber: phoneNumber,
    });
    if (result !== null) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
};
