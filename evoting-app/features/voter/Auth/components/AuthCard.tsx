import "@/app/globals.css";
import AuthHeader from "./AuthHeader";
import InputNIK from "../../InputNIK/components/InputNIK";

const AuthCard = () => {
  return (
    <div className="auth-card">
      <AuthHeader />
      <InputNIK />
    </div>
  );
};

export default AuthCard;
