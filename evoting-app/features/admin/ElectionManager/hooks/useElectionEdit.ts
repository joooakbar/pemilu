import { useState }
from 'react'

export function useElectionEdit() {

  const [editId, setEditId] =
    useState<string | null>(null)

  const [editForm, setEditForm] =
    useState({
      nama: '',
      startTime: '',
      endTime: '',
      tempatVoting: '',
      deskripsi: '',
    })

  return {
    editId,
    setEditId,
    editForm,
    setEditForm,
  }
}