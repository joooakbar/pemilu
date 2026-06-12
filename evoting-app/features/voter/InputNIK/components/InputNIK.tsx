"use client";

import { useVerifyNIKVote } from "../hooks/useVerifyNIKVote";
import AuthError from "../../Auth/components/AuthError";
import "@/app/globals.css";

const InputNIK = () => {
  const { nik, error, loading, handleChange, verifyNIKVote } =
    useVerifyNIKVote();
  return (
    <div className="auth-body">
      {error && <AuthError message={error} />}

      <div className="aform-group">
        <label>Nomor Induk Kependudukan (NIK)</label>

        <input
          className="nik-input"
          type="text"
          value={nik}
          placeholder="3518 XXXX XXXX XXXX"
          maxLength={16}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              verifyNIKVote();
            }
          }}
        />
      </div>

      <div className="auth-demo">
        NIK terdiri dari 16 digit. Temukan di KTP elektronik Anda.
        <br />
        <strong>DEMO NIK:</strong> 3506051011030002
      </div>

      <button className="btn-auth" disabled={loading} onClick={verifyNIKVote}>
        {loading ? "Memverifikasi..." : "Verifikasi NIK →"}
      </button>

      <div className="auth-hint">
        Pilihan Anda bersifat rahasia dan tidak dapat diketahui siapapun,
        termasuk admin sistem.
      </div>
    </div>
  );
};

export default InputNIK;
