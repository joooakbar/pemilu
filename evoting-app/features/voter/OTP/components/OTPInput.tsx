import { OTPProps } from "../types/otp.types";

const OTPInput = ({ value, onChange, onKeyDown, inputRefs }: OTPProps) => {
  return (
    <div className="otp-grid">
      {value.map((digit: string, index: number) => (
        <input
          key={index}
          ref={(el) => {
            if (inputRefs.current) {
              inputRefs.current[index] = el;
            }
          }}
          className={`otp-box ${digit ? "filled" : ""}`}
          type="text"
          inputMode="text"
          maxLength={1}
          value={digit}
          autoComplete="one-time-code"
          onChange={(e) => onChange(e.target.value, index)}
          onKeyDown={(e) => onKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
