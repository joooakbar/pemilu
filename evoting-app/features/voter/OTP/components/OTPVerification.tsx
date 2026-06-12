"use client";

import { useOtp } from "../hooks/useVerifyOTP";
import OTPHeader from "./OTPHeader";
import OTPError from "./OTPError";
import OTPInput from "./OTPInput";

const OTPVerification = () => {
  const {
    otp,
    loading,
    error,
    inputRefs,
    handleChange,
    handleKeyDown,
    submit,
  } = useOtp();

  return (
    <div id="auth-step-2">
      <OTPHeader />

      <div className="auth-body">
        <OTPError error={error} />

        <div className="aform-group">
          <label>Token OTP (6 digit)</label>

          <OTPInput
            value={otp}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            inputRefs={inputRefs}
          />

          <div className="otp-resend">
            Tidak menerima token? <span>Hubungi panitia</span>
          </div>
        </div>

        <button className="btn-auth" onClick={submit} disabled={loading}>
          {loading ? "Memverifikasi..." : "Lanjut ke Surat Suara →"}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
