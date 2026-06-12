import OtpForm from "@/features/auth/components/OtpForm";
import OTPHeader from "./OTPHeader";
import OTPVerification from "./OTPVerification";
import "@/app/globals.css";

const OTPCard = () => {
  return (
    <div className="auth-card">
      <OTPVerification />
    </div>
  );
};

export default OTPCard;
