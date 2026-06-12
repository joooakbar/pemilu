import { useState } from "react";

export function useElectionForm() {
  const [showForm, setShowForm] = useState(false);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    startTime: "",
    endTime: "",
    tempatVoting: "",
    deskripsi: "",
  });

  return {
    showForm,
    setShowForm,
    saving,
    setSaving,
    form,
    setForm,
  };
}
