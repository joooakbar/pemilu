import React from 'react'

import { Button } from '@/components/ui/button'

import UploadButton from './UploadButton'
import ImportResult from './ImportResult'

import {
  IMPORT_FORMAT,
  ACCEPTED_FILES,
} from '../constants/import.constants'

import type { ImportResultData } from '../types'

interface Props {
  open: boolean
  loading: boolean
  result: ImportResultData | null
  onClose: () => void
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ImportDialog({
  open,
  loading,
  result,
  onClose,
  onUpload,
}: Props) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-xl p-6 w-full max-w-md shadow-xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-lg">
          Import DPT
        </h2>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>Format kolom:</p>

          <code className="block bg-secondary p-2 rounded text-xs">
            {IMPORT_FORMAT}
          </code>
        </div>

        {/* FILE INPUT */}
        <input
          id="file-upload"
          type="file"
          accept={ACCEPTED_FILES}
          className="hidden"
          onChange={onUpload}
        />

        {/* BUTTON → TRIGGER LABEL (NO REF) */}
        <label htmlFor="file-upload" className="w-full block">
          <UploadButton loading={loading} onClick={() => {}} />
        </label>

        {result && <ImportResult result={result} />}

        <Button
          variant="outline"
          className="w-full"
          onClick={onClose}
        >
          Tutup
        </Button>
      </div>
    </div>
  )
}