# Dokumentasi Praktikum Next.js

## Daftar Isi
1. [Optimasi Image dengan next/image](#1-optimasi-image)
2. [Optimasi Font dengan next/font](#2-optimasi-font)
3. [Optimasi Script dengan next/script](#3-optimasi-script)
4. [Dynamic Import](#4-dynamic-import)
5. [Unit Testing dengan Jest](#5-unit-testing)
6. [Refleksi & Diskusi](#6-refleksi--diskusi)

---

## 1. Optimasi Image dengan next/image

### Lokasi File yang Dioptimasi:

#### a. Navbar - Avatar User (Google & GitHub)
**File:** `src/components/layouts/navbar/index.tsx`

**Sebelum:**
```tsx
<img src={session.user?.image} alt="avatar" />
```

**Sesudah:**
```tsx
<Image 
  src={session.user?.image || "/default-avatar.png"} 
  alt="avatar" 
  width={40} 
  height={40}
/>
```

#### b. Halaman 404 - Error Illustration
**File:** `src/pages/404.tsx`

**Sebelum:**
```tsx
<img src="/page-not-found.png" alt="404" />
```

**Sesudah:**
```tsx
<Image 
  src="/page-not-found.png" 
  alt="404 Not Found" 
  width={400} 
  height={400}
/>
```

#### c. Product List - Daftar Produk
**File:** `src/views/product/index.tsx`

**Sebelum:**
```tsx
<img src={product.image} alt={product.name} />
```

**Sesudah:**
```tsx
<Image 
  src={product.image} 
  alt={product.name} 
  width={200} 
  height={200}
/>
```

#### d. Product Detail - Detail Produk
**File:** `src/views/DetailProduct/index.tsx`

**Sebelum:**
```tsx
<img src={product.image} alt={product.name} />
```

**Sesudah:**
```tsx
<Image 
  src={product.image} 
  alt={product.name} 
  width={500} 
  height={500}
/>
```

### Konfigurasi Remote Patterns
**File:** `next.config.js`

```javascript
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.uniqlo.com',
      },
      {
        protocol: 'https',
        hostname: 'ribsgold.com',
      },
      {
        protocol: 'https',
        hostname: 'down-id.img.susercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'atmos.co.id',
      },
      {
        protocol: 'https',
        hostname: 'www.russ.co.id',
      },
      {
        protocol: 'https',
        hostname: 'images.tokopedia.net',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
}
```

### Keuntungan Optimasi Image:
- ✅ Automatic lazy loading
- ✅ Responsive images
- ✅ Format modern (WebP/AVIF)
- ✅ Ukuran file lebih kecil
- ✅ Performa loading lebih cepat
- ✅ Mencegah Cumulative Layout Shift (CLS)

---

## 2. Optimasi Font dengan next/font

### Lokasi File:
**File:** `src/components/layouts/AppShell/index.tsx`

### Implementasi:

```tsx
import { Roboto } from "next/font/google"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

export default function AppShell(props: AppShellProps) {
  const { children } = props
  const { data: session }: { data: any } = useSession()

  return (
    <main className={roboto.className}>
      {session && <Navbar />}
      {children}
    </main>
  )
}
```

### Keuntungan next/font:
- ✅ Font di-host secara lokal (self-hosted)
- ✅ Tidak ada external request ke Google Fonts
- ✅ Zero layout shift dengan CSS size-adjust otomatis
- ✅ Performa lebih cepat
- ✅ Privacy-friendly (tidak ada tracking dari Google)

---

## 3. Optimasi Script dengan next/script

### a. Dynamic Title Script (Navbar)
**File:** `src/components/layouts/navbar/index.tsx`

```tsx
import Script from "next/script"

<Script 
  id="title-script" 
  strategy="lazyOnload"
>
  {`
    document.addEventListener('DOMContentLoaded', function() {
      const currentPath = window.location.pathname;
      const pageName = currentPath.split('/').filter(Boolean).pop() || 'Home';
      document.title = pageName.charAt(0).toUpperCase() + pageName.slice(1) + ' - My App';
    });
  `}
</Script>
```

### b. Google Analytics (_app.tsx)
**File:** `src/pages/_app.tsx`

```tsx
import Script from "next/script"

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>

      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </SessionProvider>
  )
}
```

### Strategy Options:
- **beforeInteractive**: Load sebelum halaman interactive (untuk critical scripts)
- **afterInteractive**: Load setelah halaman interactive (untuk analytics)
- **lazyOnload**: Load saat browser idle (untuk non-critical scripts)
- **worker**: Load di web worker (experimental)

### Keuntungan next/script:
- ✅ Kontrol loading strategy
- ✅ Mencegah blocking rendering
- ✅ Optimasi performa otomatis
- ✅ Mengurangi Time to Interactive

---

## 4. Dynamic Import

### Lokasi File:
**File:** `src/components/layouts/AppShell/index.tsx`

### Implementasi:

```tsx
import dynamic from "next/dynamic"

const Navbar = dynamic(() => import("../navbar"), {
  ssr: false,
})

export default function AppShell(props: AppShellProps) {
  const { children } = props
  const { data: session }: { data: any } = useSession()

  return (
    <main className={roboto.className}>
      {session && <Navbar />}
      {children}
    </main>
  )
}
```

### Konfigurasi:
- `ssr: false` - Komponen hanya di-render di client-side
- Menghindari hydration mismatch
- Mengurangi initial bundle size

### Kapan Menggunakan Dynamic Import:
- ✅ Komponen yang hanya muncul setelah interaksi user (modal, dropdown)
- ✅ Komponen berat yang tidak diperlukan saat initial load
- ✅ Komponen yang hanya dibutuhkan di client-side
- ✅ Library besar yang jarang digunakan

---

## 5. Unit Testing dengan Jest

### Konfigurasi Jest
**File:** `jest.config.mjs`

```javascript
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './',
})

const config = {
    testEnvironment: 'jsdom',
    modulePaths: ['<rootDir>/src/'],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/components/layouts/footer/**/*.{ts,tsx}',
        'src/pages/404.tsx',
        'src/pages/about/**/*.{ts,tsx}',
        'src/views/product/**/*.{ts,tsx}',
    ]
}

export default createJestConfig(config)
```

### TypeScript Configuration
**File:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["jest", "@testing-library/jest-dom"],
    // ... other options
  }
}
```

### Test Files Created:

#### a. Test Halaman About
**File:** `src/__test__/pages/about.spec.tsx`

```tsx
import { render } from "@testing-library/react"
import AboutPage from "@/pages/about"

describe("About Page", () => {
    it("renders about page correctly", () => {
        const { container } = render(<AboutPage />)
        expect(container).toMatchSnapshot()
    })

    it("displays correct title text", () => {
        const { getByTestId } = render(<AboutPage />)
        const title = getByTestId("title")
        expect(title.textContent).toBe("About Page")
    })
})
```

#### b. Test Halaman Product (View Component)
**File:** `src/__test__/pages/product.spec.tsx`

```tsx
import { render } from "@testing-library/react"
import TampilanProduk from "@/views/product"

describe("Product View Component", () => {
    const mockProducts = [
        {
            id: "1",
            name: "Test Product",
            price: 100000,
            image: "/test.jpg",
            category: "Test Category"
        },
        {
            id: "2",
            name: "Test Product 2",
            price: 200000,
            image: "/test2.jpg",
            category: "Test Category 2"
        }
    ]

    it("renders product view correctly", () => {
        const { container } = render(<TampilanProduk products={mockProducts} />)
        expect(container).toMatchSnapshot()
    })

    it("displays correct title", () => {
        const { getByTestId } = render(<TampilanProduk products={mockProducts} />)
        const title = getByTestId("title")
        expect(title.textContent).toBe("Daftar Produk")
    })

    it("shows skeleton when no products", () => {
        const { container } = render(<TampilanProduk products={[]} />)
        const skeletons = container.querySelectorAll(".produk__content__skeleton")
        expect(skeletons.length).toBe(3)
    })

    it("renders product items when products exist", () => {
        const { container } = render(<TampilanProduk products={mockProducts} />)
        const productItems = container.querySelectorAll(".produk__content__item")
        expect(productItems.length).toBe(2)
    })

    it("displays product name correctly", () => {
        const { container } = render(<TampilanProduk products={mockProducts} />)
        const productName = container.querySelector(".produk__content__item__name")
        expect(productName?.textContent).toBe("Test Product")
    })

    it("displays formatted price correctly", () => {
        const { container } = render(<TampilanProduk products={mockProducts} />)
        const productPrice = container.querySelector(".produk__content__item__price")
        expect(productPrice?.textContent).toBe("Rp 100.000")
    })
})
```

#### c. Test Halaman 404
**File:** `src/__test__/pages/404.spec.tsx`

```tsx
import { render } from "@testing-library/react"
import Custom404 from "@/pages/404"

describe("404 Page", () => {
    it("renders 404 page correctly", () => {
        const { container } = render(<Custom404 />)
        expect(container).toMatchSnapshot()
    })

    it("displays 404 heading", () => {
        const { container } = render(<Custom404 />)
        const heading = container.querySelector("h1")
        expect(heading?.textContent).toBe("404 - Halaman Tidak Ditemukan")
    })

    it("displays error message", () => {
        const { container } = render(<Custom404 />)
        const message = container.querySelector("p")
        expect(message?.textContent).toContain("Maaf, halaman yang Anda cari tidak tersedia")
    })
})
```

#### d. Test Komponen Footer
**File:** `src/__test__/components/footer.spec.tsx`

```tsx
import { render } from "@testing-library/react"
import Footer from "@/components/layouts/footer"

describe("Footer Component", () => {
    it("renders footer component correctly", () => {
        const { container } = render(<Footer />)
        expect(container).toMatchSnapshot()
    })

    it("displays footer title", () => {
        const { getByTestId } = render(<Footer />)
        const footerTitle = getByTestId("footer-title")
        expect(footerTitle.textContent).toBe("Footer")
    })

    it("has footer container", () => {
        const { getByTestId } = render(<Footer />)
        const footer = getByTestId("footer")
        expect(footer).toBeTruthy()
    })
})
```

#### e. Test Product Page Wrapper (dengan SWR Mock)
**File:** `src/__test__/pages/product-page.spec.tsx`

```tsx
import { render } from "@testing-library/react"
import ProductPage from "@/pages/product"

// Mock SWR
jest.mock("swr", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        data: {
            data: [
                {
                    id: "1",
                    name: "Test Product",
                    price: 100000,
                    image: "/test.jpg",
                    category: "Test"
                }
            ]
        },
        error: null,
        isLoading: false
    }))
}))

// Mock next/router
jest.mock("next/router", () => ({
    useRouter: jest.fn(() => ({
        route: "/product",
        pathname: "/product",
        query: {},
        asPath: "/product",
        push: jest.fn(),
    }))
}))

describe("Product Page Wrapper", () => {
    it("renders product page wrapper correctly", () => {
        const { container } = render(<ProductPage />)
        expect(container).toMatchSnapshot()
    })

    it("renders product view component", () => {
        const { container } = render(<ProductPage />)
        const productView = container.querySelector(".produk")
        expect(productView).toBeTruthy()
    })
})
```

#### f. Test Detail Product View
**File:** `src/__test__/views/detail-product.spec.tsx`

```tsx
import { render } from "@testing-library/react"
import DetailProduct from "@/views/DetailProduct"

describe("Detail Product View", () => {
    const mockProducts = {
        id: "1",
        name: "Test Product",
        price: 100000,
        image: "/test.jpg",
        category: "Test Category"
    }

    it("renders detail product view correctly", () => {
        const { container } = render(<DetailProduct products={mockProducts} />)
        expect(container).toMatchSnapshot()
    })

    it("displays product name", () => {
        const { container } = render(<DetailProduct products={mockProducts} />)
        const productName = container.querySelector(".produkdetail__name")
        expect(productName?.textContent).toBe("Test Product")
    })

    it("displays product category", () => {
        const { container } = render(<DetailProduct products={mockProducts} />)
        const category = container.querySelector(".produkdetail__category")
        expect(category?.textContent).toBe("Test Category")
    })

    it("displays formatted price", () => {
        const { container } = render(<DetailProduct products={mockProducts} />)
        const price = container.querySelector(".produkdetail__price")
        expect(price?.textContent).toContain("100")
    })

    it("renders product image", () => {
        const { container } = render(<DetailProduct products={mockProducts} />)
        const image = container.querySelector("img")
        expect(image).toBeTruthy()
    })

    it("displays detail title", () => {
        const { container } = render(<DetailProduct products={mockProducts} />)
        const title = container.querySelector("h1")
        expect(title?.textContent).toBe("Detail Produk")
    })
})
```

#### g. Test Login View
**File:** `src/__test__/views/login.spec.tsx`

```tsx
import { render } from "@testing-library/react"
import LoginView from "@/views/auth/login"

// Mock next-auth
jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
}))

// Mock next/router
jest.mock("next/router", () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        query: {},
    }))
}))

describe("Login View", () => {
    it("renders login view correctly", () => {
        const { container } = render(<LoginView />)
        expect(container).toMatchSnapshot()
    })

    it("displays login heading", () => {
        const { container } = render(<LoginView />)
        const heading = container.querySelector("h1")
        expect(heading?.textContent).toContain("Login")
    })

    it("has email input field", () => {
        const { container } = render(<LoginView />)
        const emailInput = container.querySelector('input[type="email"]')
        expect(emailInput).toBeTruthy()
    })

    it("has password input field", () => {
        const { container } = render(<LoginView />)
        const passwordInput = container.querySelector('input[type="password"]')
        expect(passwordInput).toBeTruthy()
    })

    it("has login button", () => {
        const { container } = render(<LoginView />)
        const loginButton = container.querySelector('button[type="submit"]')
        expect(loginButton).toBeTruthy()
    })

    it("has Google login button", () => {
        const { container } = render(<LoginView />)
        const buttons = container.querySelectorAll("button")
        const googleButton = Array.from(buttons).find(btn => 
            btn.textContent?.includes("Google")
        )
        expect(googleButton).toBeTruthy()
    })

    it("has GitHub login button", () => {
        const { container } = render(<LoginView />)
        const buttons = container.querySelectorAll("button")
        const githubButton = Array.from(buttons).find(btn => 
            btn.textContent?.includes("GitHub")
        )
        expect(githubButton).toBeTruthy()
    })
})
```

#### h. Test Register View
**File:** `src/__test__/views/register.spec.tsx`

```tsx
import { render } from "@testing-library/react"
import RegisterView from "@/views/auth/register"

// Mock next/router
jest.mock("next/router", () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    }))
}))

describe("Register View", () => {
    it("renders register view correctly", () => {
        const { container } = render(<RegisterView />)
        expect(container).toMatchSnapshot()
    })

    it("displays register heading", () => {
        const { container } = render(<RegisterView />)
        const heading = container.querySelector("h1")
        expect(heading?.textContent).toContain("Register")
    })

    it("has fullname input field", () => {
        const { container } = render(<RegisterView />)
        const fullnameInput = container.querySelector('input[name="fullname"]')
        expect(fullnameInput).toBeTruthy()
    })

    it("has email input field", () => {
        const { container } = render(<RegisterView />)
        const emailInput = container.querySelector('input[type="email"]')
        expect(emailInput).toBeTruthy()
    })

    it("has password input field", () => {
        const { container } = render(<RegisterView />)
        const passwordInput = container.querySelector('input[type="password"]')
        expect(passwordInput).toBeTruthy()
    })

    it("has register button", () => {
        const { container } = render(<RegisterView />)
        const registerButton = container.querySelector('button[type="submit"]')
        expect(registerButton).toBeTruthy()
    })

    it("has link to login page", () => {
        const { container } = render(<RegisterView />)
        const loginLink = container.querySelector('a[href="/auth/login"]')
        expect(loginLink).toBeTruthy()
    })
})
```

### Menambahkan data-testid pada Komponen:

#### About Page
**File:** `src/pages/about/index.tsx`
```tsx
<h1 data-testid="title">About Page</h1>
```

#### Product View
**File:** `src/views/product/index.tsx`
```tsx
<h1 className={styles.produk__title} data-testid="title">Daftar Produk</h1>
```

#### Footer Component
**File:** `src/components/layouts/footer/index.tsx`
```tsx
<div className="footer" data-testid="footer">
    <div><h1 data-testid="footer-title">Footer</h1></div>       
</div>
```

### Menjalankan Test:

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Hasil Testing:

```
Test Suites: 8 passed, 8 total
Tests:       36 passed, 36 total
Snapshots:   8 passed, 8 total
Coverage:    55.55%
```

### Coverage Report:
```
---------------------------|---------|----------|---------|---------|-------------------
File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------|---------|----------|---------|---------|-------------------
All files                  |   55.55 |    28.94 |   71.42 |      52 |                   
 components/layouts/footer |     100 |      100 |     100 |     100 |                   
  index.tsx                |     100 |      100 |     100 |     100 |                   
 pages                     |     100 |      100 |     100 |     100 |                   
  404.tsx                  |     100 |      100 |     100 |     100 |                   
 pages/about               |     100 |      100 |     100 |     100 |                  
  index.tsx                |     100 |      100 |     100 |     100 |                  
 pages/product             |     100 |       50 |     100 |     100 |                  
  index.tsx                |     100 |       50 |     100 |     100 | 20               
 views/DetailProduct       |     100 |      100 |     100 |     100 |                  
  index.tsx                |     100 |      100 |     100 |     100 |                  
 views/auth/login          |   34.21 |    23.52 |      25 |   32.43 |                  
  index.tsx                |   34.21 |    23.52 |      25 |   32.43 | 14-121           
 views/auth/register       |   32.35 |    13.33 |      50 |    30.3 |                  
  index.tsx                |   32.35 |    13.33 |      50 |    30.3 | 12-51            
 views/product             |     100 |      100 |     100 |     100 |                  
  index.tsx                |     100 |      100 |     100 |     100 |                  
---------------------------|---------|----------|---------|---------|-------------------
```

### Checklist Tugas Testing:

- ✅ **Unit test untuk Halaman Product** - `src/__test__/pages/product.spec.tsx` (6 tests)
- ✅ **Unit test untuk 1 Komponen** - `src/__test__/components/footer.spec.tsx` (3 tests)
- ✅ **Minimal 1 Snapshot test** - Semua test file memiliki snapshot test (8 snapshots)
- ✅ **Minimal 1 toBe()** - Digunakan untuk exact matching di semua test
- ✅ **Minimal 1 getByTestId()** - Digunakan di About dan Product tests
- ✅ **Coverage minimal 50%** - Achieved 55.55% coverage
- ✅ **Mocking untuk router** - Implemented di product-page, login, dan register tests

### Daftar Lengkap Test Files:

1. **`src/__test__/pages/about.spec.tsx`** - 2 tests (About page)
2. **`src/__test__/pages/404.spec.tsx`** - 3 tests (404 page)
3. **`src/__test__/pages/product.spec.tsx`** - 6 tests (Product view component)
4. **`src/__test__/pages/product-page.spec.tsx`** - 2 tests (Product page wrapper dengan SWR mock)
5. **`src/__test__/components/footer.spec.tsx`** - 3 tests (Footer component)
6. **`src/__test__/views/detail-product.spec.tsx`** - 6 tests (Detail product view)
7. **`src/__test__/views/login.spec.tsx`** - 7 tests (Login view)
8. **`src/__test__/views/register.spec.tsx`** - 7 tests (Register view)

**Total: 8 test suites, 36 tests, all passing, 55.55% coverage**

---

## 6. Refleksi & Diskusi

### 1. Mengapa `<img>` biasa tidak optimal?

Tag `<img>` biasa tidak optimal karena tidak memiliki optimasi otomatis seperti lazy loading, responsive sizing, dan format modern (WebP/AVIF), sehingga menghasilkan ukuran file lebih besar dan performa loading yang lebih lambat dibanding Next.js Image component.

**Masalah dengan `<img>` biasa:**
- Tidak ada lazy loading otomatis
- Tidak ada optimasi format gambar
- Tidak ada responsive sizing
- Menyebabkan Cumulative Layout Shift (CLS)
- Ukuran file tidak terkompresi
- Tidak ada caching otomatis

**Keuntungan `next/image`:**
- Lazy loading otomatis
- Format modern (WebP/AVIF)
- Responsive images
- Optimasi ukuran otomatis
- Mencegah CLS dengan placeholder
- Built-in caching

---

### 2. Apa perbedaan font CDN dan next/font?

Font CDN memerlukan request eksternal ke server Google Fonts yang bisa lambat dan menimbulkan layout shift, sedangkan next/font mengunduh dan meng-host font secara lokal saat build time sehingga lebih cepat, tidak ada external request, dan menghilangkan layout shift dengan CSS size-adjust otomatis.

**Font CDN (Google Fonts):**
- ❌ External request ke Google servers
- ❌ Bisa lambat tergantung koneksi
- ❌ Layout shift saat font loading
- ❌ Privacy concern (Google tracking)
- ❌ Tergantung availability Google CDN

**next/font:**
- ✅ Self-hosted (lokal)
- ✅ Zero external requests
- ✅ Zero layout shift
- ✅ Privacy-friendly
- ✅ Optimasi otomatis saat build
- ✅ CSS size-adjust otomatis

---

### 3. Mengapa script bisa membuat website lambat?

Script dapat membuat website lambat karena browser harus mendownload, parse, dan execute JavaScript yang memblokir rendering halaman (blocking), terutama jika script besar atau banyak, sehingga menunda First Contentful Paint dan Time to Interactive.

**Penyebab script membuat website lambat:**
- **Download time**: Script harus diunduh dari server
- **Parse time**: Browser harus mem-parse JavaScript
- **Execution time**: Browser harus menjalankan kode
- **Blocking rendering**: Script blocking menghentikan rendering
- **Main thread busy**: JavaScript berjalan di main thread

**Solusi dengan next/script:**
- Strategy `afterInteractive` untuk non-critical scripts
- Strategy `lazyOnload` untuk scripts yang tidak urgent
- Defer/async loading otomatis
- Prioritas loading yang tepat

---

### 4. Kapan harus menggunakan dynamic import?

Dynamic import sebaiknya digunakan untuk komponen yang tidak diperlukan saat initial load seperti modal, komponen berat yang hanya muncul setelah interaksi user, atau komponen yang hanya dibutuhkan di client-side (ssr: false) untuk mengurangi bundle size awal dan mempercepat loading.

**Gunakan dynamic import untuk:**
- ✅ Modal/Dialog yang muncul setelah user action
- ✅ Komponen berat (charts, editors, maps)
- ✅ Komponen yang hanya di client-side
- ✅ Library besar yang jarang digunakan
- ✅ Komponen di bawah fold (below the fold)
- ✅ Feature yang conditional (berdasarkan role/permission)

**Contoh use case:**
```tsx
// Modal - hanya load saat dibutuhkan
const Modal = dynamic(() => import('./Modal'))

// Chart library - berat, load saat dibutuhkan
const Chart = dynamic(() => import('react-chartjs-2'))

// Client-only component - hindari SSR
const ClientComponent = dynamic(() => import('./ClientComponent'), {
  ssr: false
})
```

---

### 5. Apa dampak bundle size terhadap UX?

Bundle size yang besar berdampak negatif pada UX karena memperlambat download time terutama di koneksi lambat, meningkatkan waktu parse/compile JavaScript, menunda interaktivitas halaman, dan menghabiskan lebih banyak data pengguna mobile yang dapat menyebabkan bounce rate tinggi.

**Dampak negatif bundle size besar:**
- ⚠️ **Download time lebih lama** - Terutama di koneksi lambat (3G/4G)
- ⚠️ **Parse/Compile time meningkat** - JavaScript harus di-parse dan compile
- ⚠️ **Time to Interactive (TTI) lambat** - User harus menunggu lebih lama
- ⚠️ **Konsumsi data tinggi** - Boros kuota internet user
- ⚠️ **Battery drain** - Lebih banyak processing = lebih boros baterai
- ⚠️ **Bounce rate tinggi** - User meninggalkan site karena lambat

**Metrik yang terpengaruh:**
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)

**Solusi:**
- Code splitting dengan dynamic import
- Tree shaking untuk remove unused code
- Minification dan compression
- Lazy loading untuk komponen non-critical

---

## Lokasi File untuk Screenshot

### 1. Optimasi Image
- `src/components/layouts/navbar/index.tsx` (line 30-35)
- `src/pages/404.tsx` (line 15-20)
- `src/views/product/index.tsx` (line 25-30)
- `src/views/DetailProduct/index.tsx` (line 10-18)
- `next.config.js` (full file)

### 2. Optimasi Font
- `src/components/layouts/AppShell/index.tsx` (line 1-10, line 20)

### 3. Optimasi Script
- `src/components/layouts/navbar/index.tsx` (line 45-55)
- `src/pages/_app.tsx` (line 10-25)

### 4. Dynamic Import
- `src/components/layouts/AppShell/index.tsx` (line 5-8)

### 5. Unit Testing
- `src/__test__/pages/about.spec.tsx` (full file)
- `src/__test__/pages/product.spec.tsx` (full file)
- `src/__test__/pages/404.spec.tsx` (full file)
- `src/__test__/pages/product-page.spec.tsx` (full file)
- `src/__test__/components/footer.spec.tsx` (full file)
- `src/__test__/views/detail-product.spec.tsx` (full file)
- `src/__test__/views/login.spec.tsx` (full file)
- `src/__test__/views/register.spec.tsx` (full file)
- `jest.config.mjs` (full file)
- Terminal: `npm run test:coverage` output
- Browser: `coverage/lcov-report/index.html`

---

## Cara Menjalankan

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Testing
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### View Coverage Report
```bash
# Open in browser
start coverage/lcov-report/index.html
```

---

## Dependencies

### Production
```json
{
  "next": "16.1.6",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "next-auth": "^4.24.13",
  "firebase": "^12.11.0",
  "bcrypt": "^6.0.0",
  "swr": "^2.4.1"
}
```

### Development
```json
{
  "jest": "^30.3.0",
  "jest-environment-jsdom": "^30.3.0",
  "@testing-library/react": "^16.3.2",
  "@testing-library/jest-dom": "^6.9.1",
  "sass": "^1.97.3"
}
```

---

## Kesimpulan

Semua optimasi telah berhasil diimplementasikan:

✅ **Image Optimization** - Semua `<img>` diganti dengan `next/image`
✅ **Font Optimization** - Menggunakan `next/font` untuk Roboto
✅ **Script Optimization** - Menggunakan `next/script` dengan strategy yang tepat
✅ **Dynamic Import** - Navbar di-load secara dynamic
✅ **Unit Testing** - 8 test suites, 36 tests dengan 55.55% coverage

**Hasil Akhir:**
- Performa website meningkat
- Bundle size lebih kecil
- Loading time lebih cepat
- User experience lebih baik
- Code quality terjaga dengan testing
- Coverage melebihi target minimal 50%

**Detail Testing:**
- Total Test Suites: 8
- Total Tests: 36
- All Tests: PASSED ✅
- Coverage: 55.55% (melebihi target 50%)
- Snapshots: 8 passed

---

**Dibuat oleh:** [Nama Anda]
**Tanggal:** [Tanggal]
**Mata Kuliah:** Pemrograman Berbasis Framework (Next.js)
