import { AuthProps } from "../types/auth.type";
import "@/app/globals.css";
const AuthError = ({ message }: AuthProps) => {
  return (
    <div className="auth-error show">
      <span>⚠️</span>
      <span>{message}</span>
    </div>
  );
};

export default AuthError;
