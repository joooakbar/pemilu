import "@/app/globals.css";

const OTPError = ({ error }: { error: string }) => {
  if (!error) return null;

  return (
    <div className="auth-error">
      <span>⚠️</span>
      <span>{error}</span>
    </div>
  );
};

export default OTPError;
