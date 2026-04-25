# Panduan Screenshot untuk Dokumentasi Praktikum

## 📸 Daftar Screenshot yang Diperlukan

---

## 1. OPTIMASI IMAGE (next/image)

### Screenshot 1: Navbar - Avatar User
**File:** `src/components/layouts/navbar/index.tsx`
**Line:** 30-35
**Tampilkan:**
```tsx
<Image 
  src={session.user?.image || "/default-avatar.png"} 
  alt="avatar" 
  width={40} 
  height={40}
/>
```

### Screenshot 2: Halaman 404
**File:** `src/pages/404.tsx`
**Line:** 15-20
**Tampilkan:**
```tsx
<Image 
  src="/page-not-found.png" 
  alt="404 Not Found" 
  width={400} 
  height={400}
/>
```

### Screenshot 3: Product List
**File:** `src/views/product/index.tsx`
**Line:** 25-30
**Tampilkan:**
```tsx
<Image 
  src={product.image} 
  alt={product.name} 
  width={200} 
  height={200}
/>
```

### Screenshot 4: Product Detail
**File:** `src/views/DetailProduct/index.tsx`
**Line:** 10-18
**Tampilkan:**
```tsx
<Image 
  src={products.image} 
  alt={products.name}
  width={400}
  height={400}
/>
```

### Screenshot 5: Next Config - Remote Patterns
**File:** `next.config.js`
**Tampilkan:** Full file dengan semua remotePatterns

---

## 2. OPTIMASI FONT (next/font)

### Screenshot 6: Font Import & Usage
**File:** `src/components/layouts/AppShell/index.tsx`
**Line:** 1-10 dan 20
**Tampilkan:**
```tsx
import { Roboto } from "next/font/google"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

// Dan penggunaannya:
<main className={roboto.className}>
```

---

## 3. OPTIMASI SCRIPT (next/script)

### Screenshot 7: Dynamic Title Script
**File:** `src/components/layouts/navbar/index.tsx`
**Line:** 45-55
**Tampilkan:**
```tsx
<Script 
  id="title-script" 
  strategy="lazyOnload"
>
  {`document.addEventListener...`}
</Script>
```

### Screenshot 8: Google Analytics
**File:** `src/pages/_app.tsx`
**Line:** 10-25
**Tampilkan:**
```tsx
<Script
  strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`...`}
</Script>
```

---

## 4. DYNAMIC IMPORT

### Screenshot 9: Dynamic Import Navbar
**File:** `src/components/layouts/AppShell/index.tsx`
**Line:** 5-8
**Tampilkan:**
```tsx
const Navbar = dynamic(() => import("../navbar"), {
  ssr: false,
})
```

---

## 5. UNIT TESTING

### Screenshot 10-17: Test Files (8 files)

#### Screenshot 10: About Test
**File:** `src/__test__/pages/about.spec.tsx`
**Tampilkan:** Full file

#### Screenshot 11: Product Test
**File:** `src/__test__/pages/product.spec.tsx`
**Tampilkan:** Full file

#### Screenshot 12: 404 Test
**File:** `src/__test__/pages/404.spec.tsx`
**Tampilkan:** Full file

#### Screenshot 13: Product Page Test
**File:** `src/__test__/pages/product-page.spec.tsx`
**Tampilkan:** Full file (dengan SWR mock)

#### Screenshot 14: Footer Test
**File:** `src/__test__/components/footer.spec.tsx`
**Tampilkan:** Full file

#### Screenshot 15: Detail Product Test
**File:** `src/__test__/views/detail-product.spec.tsx`
**Tampilkan:** Full file

#### Screenshot 16: Login Test
**File:** `src/__test__/views/login.spec.tsx`
**Tampilkan:** Full file

#### Screenshot 17: Register Test
**File:** `src/__test__/views/register.spec.tsx`
**Tampilkan:** Full file

### Screenshot 18: Jest Config
**File:** `jest.config.mjs`
**Tampilkan:** Full file dengan collectCoverageFrom lengkap

### Screenshot 19: Terminal - Test Results
**Command:** `npm run test:coverage`
**Tampilkan:**
```
Test Suites: 8 passed, 8 total
Tests:       36 passed, 36 total
Snapshots:   8 passed, 8 total
Coverage:    55.55%
```

### Screenshot 20: Coverage Report (Browser)
**File:** `coverage/lcov-report/index.html`
**Buka di browser**
**Tampilkan:** Coverage summary dengan 55.55%

---

## 6. REFLEKSI & DISKUSI

### Screenshot 21: Jawaban Refleksi
**File:** `DOKUMENTASI_PRAKTIKUM.md`
**Section:** "6. Refleksi & Diskusi"
**Tampilkan:** Semua 5 jawaban pertanyaan

---

## 📋 Checklist Screenshot

Gunakan checklist ini untuk memastikan semua screenshot sudah diambil:

- [ ] 1. Navbar Avatar (next/image)
- [ ] 2. 404 Page Image (next/image)
- [ ] 3. Product List Image (next/image)
- [ ] 4. Product Detail Image (next/image)
- [ ] 5. Next Config Remote Patterns
- [ ] 6. Font Import & Usage (next/font)
- [ ] 7. Dynamic Title Script (next/script)
- [ ] 8. Google Analytics Script (next/script)
- [ ] 9. Dynamic Import Navbar
- [ ] 10. About Test File
- [ ] 11. Product Test File
- [ ] 12. 404 Test File
- [ ] 13. Product Page Test File (SWR mock)
- [ ] 14. Footer Test File
- [ ] 15. Detail Product Test File
- [ ] 16. Login Test File
- [ ] 17. Register Test File
- [ ] 18. Jest Config File
- [ ] 19. Terminal Test Results
- [ ] 20. Coverage Report Browser
- [ ] 21. Jawaban Refleksi

---

## 💡 Tips Screenshot

1. **Gunakan theme yang jelas** (light/dark sesuai preferensi)
2. **Zoom yang cukup** agar code terbaca jelas
3. **Highlight code penting** jika memungkinkan
4. **Sertakan line numbers** untuk referensi
5. **Full screen** untuk terminal output
6. **Crop yang rapi** untuk hasil profesional

---

## 🎯 Prioritas Screenshot

### WAJIB (Must Have):
- Jest Config (Screenshot 18)
- Terminal Test Results (Screenshot 19)
- Coverage Report Browser (Screenshot 20)
- Minimal 2-3 test files (Screenshot 10-12)

### PENTING (Should Have):
- Semua test files (Screenshot 10-17)
- Next/image implementations (Screenshot 1-4)
- Next Config (Screenshot 5)

### TAMBAHAN (Nice to Have):
- Font optimization (Screenshot 6)
- Script optimization (Screenshot 7-8)
- Dynamic import (Screenshot 9)
- Refleksi (Screenshot 21)

---

## 📁 Struktur Folder Screenshot (Rekomendasi)

```
screenshots/
├── 01-optimasi-image/
│   ├── navbar-avatar.png
│   ├── 404-page.png
│   ├── product-list.png
│   ├── product-detail.png
│   └── next-config.png
├── 02-optimasi-font/
│   └── font-implementation.png
├── 03-optimasi-script/
│   ├── dynamic-title.png
│   └── google-analytics.png
├── 04-dynamic-import/
│   └── navbar-dynamic.png
└── 05-testing/
    ├── test-about.png
    ├── test-product.png
    ├── test-404.png
    ├── test-product-page.png
    ├── test-footer.png
    ├── test-detail-product.png
    ├── test-login.png
    ├── test-register.png
    ├── jest-config.png
    ├── terminal-results.png
    └── coverage-report.png
```

---

## ✅ Verifikasi Akhir

Sebelum submit, pastikan:
- [ ] Semua screenshot jelas dan terbaca
- [ ] File names konsisten dan deskriptif
- [ ] Coverage menunjukkan 55.55% atau lebih
- [ ] Test results menunjukkan "36 passed"
- [ ] Tidak ada test yang failed
- [ ] Jest config menunjukkan collectCoverageFrom lengkap

---

**Good luck! 🚀**
