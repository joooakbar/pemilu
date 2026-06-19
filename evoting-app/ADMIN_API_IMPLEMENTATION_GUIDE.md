# 🔧 Admin API Implementation Guide

## Overview

Panduan cepat untuk memahami dan menggunakan Admin API yang baru dibuat.

---

## 🏗️ Architecture

### Request Flow
```
Client (Frontend)
    ↓
  Routes (Next.js)
    ↓
  withAuth Middleware
    ↓
  Handler Function
    ↓
  Prisma ORM / Sanity Fetch
    ↓
  Database / External Services
    ↓
  Response (ok/err)
    ↓
  Client
```

### Key Components

1. **withAuth Middleware** (`lib/api.ts`)
   - JWT token validation
   - Role-based authorization
   - Request context

2. **Error Handling**
   - Standardized error format
   - HTTP status codes
   - Error logging

3. **Activity Logging**
   - User action tracking
   - Entity changes
   - IP address recording

---

## 📚 File Organization

### API Routes Pattern
```
/api/admin/[feature]/
├── route.ts          (main handler: GET, POST, etc)
├── [id]/route.ts     (specific resource: PATCH, DELETE, etc)
└── [action]/route.ts (nested actions: sync, export, etc)
```

### Example: DPT Management
```
/api/admin/dpt/
├── route.ts          → GET (list), POST (create)
├── import/route.ts   → POST (upload CSV)
└── export/route.ts   → GET (download CSV)
```

---

## 🔐 Authentication & Authorization

### How It Works

1. **Token in Cookie**
   ```
   Cookie: evotis_token=eyJhbGc...
   ```

2. **JWT Payload**
   ```typescript
   {
     sub: "user-id",
     role: "ADMIN", // ADMIN | PANITIA | SAKSI
     name: "John Doe",
     iat: timestamp,
     exp: timestamp
   }
   ```

3. **withAuth Middleware**
   ```typescript
   return withAuth(req, handler, ['ADMIN', 'PANITIA'])
   //                           ↑ required roles (optional)
   ```

4. **Access Control**
   - If no roles specified → require authenticated user
   - If roles specified → require matching role
   - Unauthorized → 401/403 response

### Permission Matrix

| Feature | ADMIN | PANITIA | SAKSI |
|---------|:-----:|:-------:|:-----:|
| View DPT | ✓ | ✓ | ✓ |
| Import DPT | ✓ | ✓ | ✗ |
| Manage Users | ✓ | ✗ | ✗ |
| Sync Election | ✓ | ✗ | ✗ |
| Emergency Stop | ✓ | ✗ | ✗ |
| Generate Tokens | ✓ | ✓ | ✗ |
| Broadcast Tokens | ✓ | ✓ | ✗ |

---

## 🗂️ Database Models

### Key Relationships

```
User → LogAktivitas (activity tracking)
       LoginOTP (2FA)

Pemilihan → Kandidat (1:many)
         → Votes (1:many)
         → VoteToken (1:many)

Kandidat → Votes (1:many)

DPT → VoteToken (1:many)
    → Votes (indirect via vote token)

VoteToken → Votes (1:1)
```

### Schema Highlights

**User**
- `username` (unique)
- `email` (unique)
- `passwordHash` (bcrypt)
- `role` (enum: ADMIN, PANITIA, SAKSI)
- `isActive` (toggle)

**Pemilihan**
- `sanityId` (sync marker)
- `status` (DRAFT, ACTIVE, SUSPENDED, ENDED)
- `startTime`, `endTime` (validation)

**Kandidat**
- `noUrut` (unique per election)
- `sanityId` (sync marker)
- `isActive`

**VoteToken**
- `tokenHash` (not stored plaintext)
- `expiredAt` (auto-expire)
- `sentViaWA`, `sentViaEmail` (tracking)
- `isUsed` (vote validation)

**DPT**
- `nik` (unique, 16 digits)
- `kodeWilayah` (6 digits)
- `hasVoted`, `votedAt` (tracking)

---

## 📡 Common API Patterns

### 1. List with Pagination & Search
```typescript
GET /api/admin/dpt?q=john&page=2&limit=50

Response:
{
  success: true,
  data: [ ... ],
  pagination: { page, limit, total, pages }
}
```

### 2. Create & Update
```typescript
POST   /api/admin/users          → Create
PATCH  /api/admin/users/[id]     → Update
DELETE /api/admin/users/[id]     → Delete
```

### 3. File Operations
```typescript
POST /api/admin/dpt/import       → Upload file
GET  /api/admin/dpt/export       → Download file
```

### 4. Sync Operations
```typescript
POST /api/admin/election/sync    → Sync from Sanity
POST /api/admin/kandidat/sync    → Sync from Sanity
```

### 5. State Management
```typescript
PATCH /api/admin/election/[id]   → Update status
POST  /api/admin/election/emergency → Emergency action
```

---

## 🛠️ Common Tasks

### Adding a New Endpoint

1. **Create file structure**
   ```bash
   mkdir -p app/api/admin/[feature]/[action]
   touch app/api/admin/[feature]/route.ts
   ```

2. **Implement handler**
   ```typescript
   import { NextRequest } from 'next/server'
   import { ok, err, withAuth, logActivity } from '@/lib/api'

   export async function POST(req: NextRequest) {
     return withAuth(req, async (req, payload) => {
       // Your logic here
       return ok(data)
     }, ['ADMIN']) // required roles
   }
   ```

3. **Add tests**
   - Test success case
   - Test auth failure
   - Test validation error
   - Test error handling

### Modifying Database

```typescript
// Create
const user = await prisma.user.create({
  data: { username, email, passwordHash, role }
})

// Read
const user = await prisma.user.findUnique({
  where: { id }
})

// Update
const user = await prisma.user.update({
  where: { id },
  data: { isActive: true }
})

// Delete
await prisma.user.delete({ where: { id } })

// List with filter
const users = await prisma.user.findMany({
  where: { role: 'ADMIN' },
  take: 10,
  skip: 0
})
```

### Error Handling Pattern
```typescript
try {
  // Do something
  return ok(data)
} catch (e: unknown) {
  return err(
    e instanceof Error ? e.message : 'Unknown error',
    500
  )
}
```

### Activity Logging
```typescript
await logActivity({
  userId: payload.sub,
  role: payload.role,
  action: 'IMPORT_DPT',
  entity: 'dpt',
  entityId: null,
  ipAddress: getIP(req),
  metadata: { count: 100, errors: [] }
})
```

---

## 🐛 Debugging Tips

### Check User Authentication
```typescript
console.log('Payload:', payload) // { sub, role, name, iat, exp }
console.log('Token valid:', payload !== null)
```

### Check Database Connection
```typescript
const health = await prisma.user.count()
console.log('DB connection:', health >= 0)
```

### Enable Request Logging
```typescript
console.log('URL:', req.url)
console.log('Method:', req.method)
console.log('Headers:', req.headers)
console.log('Body:', await req.json())
```

### Verify Role Authorization
```typescript
if (!['ADMIN', 'PANITIA'].includes(payload.role)) {
  return err('Insufficient permission', 403)
}
```

---

## 📊 Performance Tips

### Pagination
```typescript
// Always paginate large datasets
const limit = Math.min(req.limit || 50, 1000)
const skip = (page - 1) * limit
await prisma.model.findMany({ take: limit, skip })
```

### Indexing
```prisma
// Add indexes for frequently queried fields
@@index([createdAt])
@@index([userId])
```

### Query Optimization
```typescript
// Select only needed fields
await prisma.user.findMany({
  select: { id: true, username: true, email: true }
})

// Use includes for related data
await prisma.pemilihan.findMany({
  include: { kandidat: true, votes: true }
})
```

---

## 🧪 Testing Examples

### Test with cURL
```bash
# GET request
curl -H "Cookie: evotis_token=TOKEN" \
  http://localhost:3000/api/admin/users

# POST request
curl -X POST \
  -H "Cookie: evotis_token=TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"secure123","role":"ADMIN"}' \
  http://localhost:3000/api/admin/users

# File upload
curl -X POST \
  -H "Cookie: evotis_token=TOKEN" \
  -F "file=@dpt.csv" \
  http://localhost:3000/api/admin/dpt/import
```

### Test with Fetch (Browser Console)
```javascript
// GET
fetch('/api/admin/users').then(r => r.json()).then(console.log)

// POST
fetch('/api/admin/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john',
    email: 'john@example.com',
    password: 'secure123',
    role: 'ADMIN'
  })
}).then(r => r.json()).then(console.log)
```

---

## 📋 Checklist untuk Production

- [ ] Enable HTTPS
- [ ] Set strong JWT_SECRET in .env
- [ ] Configure rate limiting
- [ ] Setup monitoring/alerting
- [ ] Enable CORS properly
- [ ] Add request validation middleware
- [ ] Setup error tracking (Sentry)
- [ ] Configure logging system
- [ ] Database backup strategy
- [ ] Load testing
- [ ] Security audit
- [ ] Documentation review

---

## 🚨 Common Issues & Solutions

### Issue: "Unauthorized" on valid token
**Solution:** Check JWT_SECRET matches between token generation and verification

### Issue: CORS error on file upload
**Solution:** Configure CORS headers for multipart/form-data

### Issue: Slow query performance
**Solution:** Add database indexes, use pagination, select specific fields

### Issue: Token expiration too frequent
**Solution:** Adjust JWT_EXPIRES_IN in .env (default: 8h)

### Issue: Cannot delete user
**Solution:** Ensure user is not deleting their own account

---

## 📞 Support Resources

- **Prisma Docs**: https://www.prisma.io/docs/
- **Next.js API Routes**: https://nextjs.org/docs/api-routes/introduction
- **JWT**: https://jwt.io/
- **Bcryptjs**: https://www.npmjs.com/package/bcryptjs

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-06-19 | Initial release with 18 endpoints |

---

Generated: June 19, 2024
