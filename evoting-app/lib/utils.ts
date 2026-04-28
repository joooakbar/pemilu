
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('id-ID', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  })
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString('id-ID', {
    day:    'numeric',
    month:  'long',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  })
}

/** Ambil 6 digit pertama NIK sebagai kode wilayah */
export function extractKodeWilayah(nik: string): string {
  return nik.slice(0, 6)
}

/** Validasi format NIK: 16 digit angka */
export function isValidNIK(nik: string): boolean {
  return /^\d{16}$/.test(nik)
}

export function formatPersen(nilai: number, total: number): string {
  if (total === 0) return '0%'
  return ((nilai / total) * 100).toFixed(1) + '%'
}
