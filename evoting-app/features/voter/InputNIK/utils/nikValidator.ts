export const isValidNIK = (nik: string): boolean => {
  return /^\d{16}$/.test(nik);
};
