# Admin API Documentation

## Overview

Berikut adalah dokumentasi lengkap semua API endpoint admin yang telah dibuat untuk aplikasi e-voting:

---

## 1. DPT (Daftar Pemilih Tetap)

### GET /api/admin/dpt
Mengambil daftar DPT dengan search dan pagination.

**Query Parameters:**
- `q` (optional): Search by NIK atau nama
- `page` (optional): Nomor halaman, default: 1
- `limit` (optional): Jumlah item per halaman, default: 50

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "nik": "1234567890123456",
      "nama": "Nama Pemilih",
      "kodeWilayah": "123456",
      "phone": "08123456789",
      "email": "user@example.com",
      "hasVoted": false,
      "votedAt": null
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 1000,
    "pages": 20
  }
}
```

---

### POST /api/admin/dpt/import
Import DPT dari file CSV atau XLSX.

**Request:**
- Method: POST
- Body: FormData dengan key `file`
- File format: CSV dengan header: `nik,nama,kodeWilayah,noHP,email`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "100 baru, 50 diupdate",
    "created": 100,
    "updated": 50,
    "errors": ["Baris 10: NIK tidak valid"],
    "total": 150
  }
}
```

---

### GET /api/admin/dpt/export
Export DPT sebagai file CSV.

**Query Parameters:**
- `format` (optional): Format file, default: csv

**Response:** CSV file download

---

## 2. Users (Manajemen Pengguna)

### GET /api/admin/users
Mengambil daftar semua pengguna.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "username": "johndoe",
      "email": "johndoe@example.com",
      "role": "ADMIN",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "nama": "John Doe"
    }
  ]
}
```

---

### POST /api/admin/users
Membuat pengguna baru.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword123",
  "role": "ADMIN",
  "nama": "John Doe"
}
```

**Validation:**
- `password` minimal 8 karakter
- `role` harus: ADMIN, PANITIA, atau SAKSI
- `username` dan `email` unique

**Response:** 201 Created dengan data user baru

---

### PATCH /api/admin/users/[id]
Update status pengguna (aktif/nonaktif).

**Request Body:**
```json
{
  "isActive": false
}
```

**Response:** Updated user data

---

### DELETE /api/admin/users/[id]
Menghapus pengguna.

**Restrictions:**
- Tidak bisa menghapus diri sendiri
- Hanya ADMIN yang bisa akses

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "message": "Pengguna berhasil dihapus"
  }
}
```

---

## 3. Kandidat (Calon Pemimpin)

### GET /api/admin/kandidat
Mengambil daftar semua kandidat.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "noUrut": 1,
      "nama": "Nama Paslon",
      "sanityId": "sanity-id",
      "isActive": true,
      "idPemilihan": "election-id"
    }
  ]
}
```

---

### POST /api/admin/kandidat/sync
Sinkronisasi kandidat dari Sanity ke database.

**Behavior:**
- Mengambil data kandidat dari Sanity
- Memperbarui atau membuat record di database
- Validasi nomor urut tidak duplikat
- Hanya ADMIN yang bisa akses

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "10 baru, 5 diupdate, 2 tidak berubah",
    "created": 10,
    "updated": 5,
    "skipped": 2,
    "errors": ["Kandidat X: nomorUrut sudah dipakai"],
    "total": 17,
    "success": false
  }
}
```

---

## 4. Election (Pemilihan)

### GET /api/admin/election
Mengambil daftar semua pemilihan.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "sanityId": "sanity-id",
      "nama": "Pemilihan Presiden 2024",
      "status": "ACTIVE",
      "startTime": "2024-06-19T08:00:00Z",
      "endTime": "2024-06-19T17:00:00Z",
      "tempatVoting": "Lokasi TPS",
      "deskripsi": "Deskripsi pemilihan",
      "totalKandidat": 3,
      "totalSuara": 150,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### POST /api/admin/election
Membuat pemilihan baru.

**Request Body:**
```json
{
  "nama": "Pemilihan Presiden 2024",
  "startTime": "2024-06-19T08:00:00Z",
  "endTime": "2024-06-19T17:00:00Z",
  "tempatVoting": "Lokasi TPS",
  "deskripsi": "Deskripsi pemilihan"
}
```

**Validation:**
- `startTime` harus sebelum `endTime`
- Tanggal harus valid ISO format

**Response:** 201 Created

---

### PATCH /api/admin/election/[id]
Mengupdate pemilihan.

**Request Body:**
```json
{
  "nama": "New Name",
  "status": "ACTIVE",
  "tempatVoting": "New Location"
}
```

**Status Options:** DRAFT, ACTIVE, SUSPENDED, ENDED

**Response:** Updated election data

---

### POST /api/admin/election/sync
Sinkronisasi data pemilihan dari Sanity ke database.

**Behavior:**
- Membaca election info dari Sanity
- Create atau update di database
- Validasi tanggal

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Pemilihan baru berhasil disinkronisasi",
    "created": 1,
    "updated": 0
  }
}
```

---

### POST /api/admin/election/emergency
Emergency stop pemilihan (hanya ADMIN).

**Request Body:**
```json
{
  "electionId": "election-id",
  "reason": "Alasan emergency stop"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "election-id",
    "status": "SUSPENDED",
    "message": "Pemilihan berhasil dihentikan sementara"
  }
}
```

---

## 5. Vote Tokens

### POST /api/admin/tokens/generate
Generate token voting untuk pemilih yang belum punya token.

**Request Body:**
```json
{
  "electionId": "election-id",
  "expiredJam": 24
}
```

**Parameters:**
- `expiredJam`: Durasi token berlaku dalam jam (default: 24)

**Response:**
```json
{
  "success": true,
  "data": {
    "generated": 1000,
    "message": "1000 token berhasil digenerate"
  }
}
```

---

### POST /api/admin/tokens/broadcast
Mengirim token voting kepada pemilih via WhatsApp/Email.

**Request Body:**
```json
{
  "electionId": "election-id",
  "via": ["WA", "EMAIL"],
  "expiredJam": 24
}
```

**Parameters:**
- `via`: Array metode pengiriman (WA, EMAIL)
- Minimal 1 metode harus dipilih

**Response:**
```json
{
  "success": true,
  "data": {
    "waSent": 850,
    "emailSent": 950,
    "message": "Token berhasil dikirim ke 1800 pemilih"
  }
}
```

**TODO Implementation:**
- Integrasi dengan Twilio untuk WhatsApp
- Integrasi dengan SendGrid/AWS SES untuk Email

---

## 6. Berita Acara

### GET /api/admin/berita-acara/generate
Generate berita acara pemilihan (HTML/PDF).

**Query Parameters:**
- `electionId` (required): ID pemilihan

**Response:** HTML file download

**Content:**
- Nama pemilihan
- Tanggal/waktu
- Total DPT
- Total suara
- Partisipasi
- Rekapitulasi per kandidat
- Pemenang

**TODO Implementation:**
- Konversi HTML ke PDF menggunakan Puppeteer atau FPDF

---

## 7. Existing Sync API

### POST /api/admin/sync
Sinkronisasi election + kandidat sekaligus (master sync).

**Description:**
- Sudah ada di `/app/api/admin/sync/route.ts`
- Hanya ADMIN yang bisa akses
- Sinkronisasi dari Sanity

---

## Authentication & Authorization

Semua endpoint memerlukan:

1. **Cookie Authentication**: Token JWT di cookie `evotis_token`
2. **Role-based Access Control**:

| Endpoint | ADMIN | PANITIA | SAKSI |
|----------|-------|---------|-------|
| /api/admin/users/* | ✓ | ✗ | ✗ |
| /api/admin/dpt (GET) | ✓ | ✓ | ✓ |
| /api/admin/dpt/import | ✓ | ✓ | ✗ |
| /api/admin/dpt/export | ✓ | ✓ | ✗ |
| /api/admin/election/* | ✓ | ✓ | ✓ |
| /api/admin/election/sync | ✓ | ✗ | ✗ |
| /api/admin/election/emergency | ✓ | ✗ | ✗ |
| /api/admin/tokens/generate | ✓ | ✓ | ✗ |
| /api/admin/tokens/broadcast | ✓ | ✓ | ✗ |
| /api/admin/kandidat/* | ✓ | ✓ | ✓ |
| /api/admin/kandidat/sync | ✓ | ✗ | ✗ |
| /api/admin/berita-acara/generate | ✓ | ✗ | ✗ |
| /api/admin/sync | ✓ | ✗ | ✗ |

---

## Error Responses

### Standard Error Format:
```json
{
  "success": false,
  "error": "Error message"
}
```

### Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (no token or invalid token)
- `403`: Forbidden (insufficient permission)
- `404`: Not Found
- `500`: Server Error

---

## Best Practices

1. **Rate Limiting**: Implementasi rate limiting untuk prevent abuse
2. **Logging**: Semua action dicatat di `LogAktivitas`
3. **Validation**: Input validation dilakukan di setiap endpoint
4. **Error Handling**: Try-catch dengan error logging
5. **Security**: Password hashing dengan bcryptjs, JWT untuk token

---

## TODO Items

- [ ] Integrasi WhatsApp API (Twilio/MessageBird) untuk token broadcast
- [ ] Integrasi Email API (SendGrid/AWS SES) untuk token broadcast
- [ ] Konversi HTML ke PDF untuk berita acara (Puppeteer/FPDF)
- [ ] Rate limiting Redis integration
- [ ] File upload size validation
- [ ] XLSX file parsing (currently CSV only)
- [ ] Batch import optimization untuk file besar
- [ ] Advanced search dan filtering

---

## Testing

Untuk testing, gunakan file CSV dengan format:

```csv
nik,nama,kodeWilayah,noHP,email
1234567890123456,Nama Pemilih 1,123456,08123456789,user1@example.com
1234567890123457,Nama Pemilih 2,123456,08123456790,user2@example.com
```

---

## Contact & Support

Untuk pertanyaan atau issue, hubungi tim development.
