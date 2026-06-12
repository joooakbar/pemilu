export const sanitizeOTP = (value: string) => {
  return value.replace(/\D/g, "");
};

export const isValidOTP = (otp: string) => {
  return otp.length === 6;
};
