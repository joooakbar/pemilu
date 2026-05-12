'use client'

import type { ImportModalProps } from '../types'

import ImportButton from './ImportButton'
import ImportDialog from './ImportDialog'
import { useImportDPT } from '../hooks/useImportDPT'

export default function ImportModal({ electionId }: ImportModalProps) {
  const {
    open,
    loading,
    result,
    setOpen,
    handleUpload,
  } = useImportDPT(electionId)

  return (
    <>
      <ImportButton onClick={() => setOpen(true)} />

      <ImportDialog
        open={open}
        loading={loading}
        result={result}
        onClose={() => setOpen(false)}
        onUpload={handleUpload}
      />
    </>
  )
}