import type { RefObject } from "react";
export interface VerifyOTPPayload {
  nik: string;
  otp: string;
  idPemilihan: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  data: {
    tokenId: string;
  };
  error?: string;
}

export interface OTPProps {
  value: string[];
  onChange: (value: string, index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  inputRefs: RefObject<(HTMLInputElement | null)[]>;
}
