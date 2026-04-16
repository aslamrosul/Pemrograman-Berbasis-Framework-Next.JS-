# Penjelasan Project Next.js - Praktikum Rendering

## 1. Jelaskan dari project/jobsheet yang sudah Anda kerjakan sebelumnya

### a. Page & Layout

**Pages yang dibuat:**

1. **Homepage (`src/pages/index.tsx`)**
   - Landing page utama aplikasi
   - Route: `/`

2. **Product Pages:**
   - `src/pages/product/index.tsx` - CSR (Client-Side Rendering) dengan SWR
   - `src/pages/product/server.tsx` - SSR (Server-Side Rendering)
   - `src/pages/product/static.tsx` - SSG (Static Site Generation) dengan ISR
   - `src/pages/product/[product].tsx` - Dynamic route untuk detail produk (SSG)

3. **Auth Pages:**
   - `src/pages/auth/login.tsx` - Halaman login
   - `src/pages/auth/register.tsx` - Halaman register

4. **Profile Page:**
   - `src/pages/profile/index.tsx` - Halaman profile user (protected)

5. **Custom Error Page:**
   - `src/pages/404.tsx` - Custom 404 Not Found page

**Layout Components:**

1. **AppShell (`src/components/layouts/AppShell/index.tsx`)**
   - Wrapper layout untuk semua halaman
   - Include Navbar component
   - Digunakan di `_app.tsx`

2. **Navbar (`src/components/layouts/navbar/index.tsx`)**
   - Navigation bar dengan NextAuth integration
   - Show/hide Sign In/Out button based on session
   - Display welcome message dengan user fullname

---

### b. Navigation (Link)

**Navigation menggunakan Next.js Link:**

1. **Di Navbar:**
   ```typescript
   import Link from "next/link";
   
   <Link href="/">Home</Link>
   <Link href="/product">Products</Link>
   <Link href="/profile">Profile</Link>
   ```

2. **Di Product List (TampilanProduk):**
   ```typescript
   <Link href={`/product/${product.id}`}>
     <div>Product Card</div>
   </Link>
   ```

3. **Keuntungan Next.js Link:**
   - Client-side navigation (no full page reload)
   - Prefetching untuk performance
   - Automatic code splitting

---

### c. Styling

**Styling Methods yang digunakan:**

1. **CSS Modules:**
   - `src/views/product/product.module.scss` - Product list styling
   - `src/views/DetailProduct/detailProduct.module.scss` - Product detail styling
   - `src/components/layouts/navbar/navbar.module.css` - Navbar styling
   - `src/views/auth/login/login.module.scss` - Login page styling

2. **Global CSS:**
   - `src/styles/globals.css` - Global styles untuk seluruh aplikasi

3. **SCSS Features:**
   - Nesting
   - Variables
   - Mixins
   - Animations (skeleton loading)

**Contoh Styling:**
```scss
.produk {
  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
    
    &__item {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      transition: transform 0.3s;
      
      &:hover {
        transform: translateY(-8px);
      }
    }
  }
}
```

---

### d. Custom Error Page

**404 Page (`src/pages/404.tsx`):**

```typescript
import Image from "next/image";
import styles from "@/styles/404.module.scss";

const Custom404 = () => {
  return (
    <div className={styles.error}>
      <Image 
        src="/page-not-found.png" 
        alt="404" 
        width={600} 
        height={600} 
      />
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};
```

**Features:**
- Custom design dengan image
- Styling dengan CSS modules
- Link untuk kembali ke homepage
- Automatic routing (Next.js auto-detect 404)

---

### e. API Routes

**API Endpoints yang dibuat:**

1. **Product API (`src/pages/api/[[...product]].ts`)**
   - Catch-all route untuk handle multiple endpoints
   - `GET /api/product` - Get all products
   - `GET /api/product/{id}` - Get product by ID
   - `GET /api/{id}` - Alternative format (backward compatible)

2. **Seed API (`src/pages/api/seed.ts`)**
   - `GET /api/seed` - Populate database dengan sample data
   - Untuk testing dan development

3. **Revalidate API (`src/pages/api/revalidate.ts`)**
   - `GET /api/revalidate?token=xxx&data=produk` - On-demand ISR revalidation
   - Token authentication untuk security
   - Trigger regeneration of static pages

4. **NextAuth API (`src/pages/api/auth/[...nextauth].ts`)**
   - Authentication endpoints
   - `/api/auth/signin` - Sign in
   - `/api/auth/signout` - Sign out
   - `/api/auth/session` - Get session
   - Credentials provider dengan JWT strategy

**API Response Format:**
```typescript
{
  status: boolean,
  status_code: number,
  data: any
}
```

---

### f. Dynamic Routing

**Dynamic Routes yang diimplementasi:**

1. **Product Detail (`src/pages/product/[product].tsx`)**
   - Route: `/product/{id}`
   - Contoh: `/product/abc123`, `/product/def456`
   - Menggunakan SSG dengan `getStaticPaths` dan `getStaticProps`

2. **Catch-All Route (`src/pages/api/[[...product]].ts`)**
   - Optional catch-all dengan `[[...param]]`
   - Handle multiple URL patterns:
     - `/api/product` → Get all
     - `/api/product/123` → Get by ID
     - `/api/123` → Alternative format

3. **NextAuth Catch-All (`src/pages/api/auth/[...nextauth].ts`)**
   - Handle semua auth-related routes
   - `/api/auth/signin`, `/api/auth/signout`, dll

**getStaticPaths Example:**
```typescript
export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/product');
  const response = await res.json();
  
  const paths = response.data.map((product: ProductType) => ({
    params: { product: product.id }
  }));
  
  return {
    paths,
    fallback: false
  };
}
```

---

## 2. Jelaskan code-code nya berdasarkan pemahaman Anda

### Rendering Methods

**1. CSR (Client-Side Rendering) - `/product`**
```typescript
const { data, error, isLoading } = useSWR("/api/product", fetcher);

return (
  <TampilanProduk products={isLoading ? [] : data.data} />
);
```
**Penjelasan:**
- Data di-fetch di client (browser) setelah halaman load
- Menggunakan SWR untuk caching dan revalidation
- Menampilkan skeleton saat loading
- SEO buruk karena HTML awal kosong

**2. SSR (Server-Side Rendering) - `/product/server`**
```typescript
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/product");
  const response = await res.json();
  
  return {
    props: {
      products: response.data || [],
    },
  };
}
```
**Penjelasan:**
- Data di-fetch di server sebelum halaman di-render
- HTML lengkap dikirim ke client
- SEO excellent karena crawler bisa baca konten
- Setiap request hit server (slower TTFB)

**3. SSG (Static Site Generation) - `/product/static`**
```typescript
export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/product');
  const response = await res.json();
  
  return {
    props: {
      products: response.data,
    },
    revalidate: 10, // ISR - revalidate every 10 seconds
  };
}
```
**Penjelasan:**
- Data di-fetch saat build time (`npm run build`)
- Generate static HTML files
- Performance terbaik (serve static files)
- ISR (revalidate: 10) untuk auto-update tanpa rebuild

**4. Dynamic SSG - `/product/[product]`**
```typescript
export async function getStaticPaths() {
  // Generate paths untuk semua produk
  const paths = products.map(p => ({ params: { product: p.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Fetch data untuk specific product
  const product = await fetchProduct(params.product);
  return { props: { product } };
}
```
**Penjelasan:**
- Generate static page untuk setiap produk
- `getStaticPaths` wajib untuk dynamic route
- `fallback: false` → 404 jika path tidak ada

---

### Authentication Flow

**1. NextAuth Configuration:**
```typescript
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        fullname: { label: "Full Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate credentials
        const user = { id: "1", email: credentials?.email, ... };
        return user || null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.fullname = user.fullname;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.fullname = token.fullname;
      return session;
    },
  },
};
```
**Penjelasan:**
- JWT strategy untuk stateless authentication
- Credentials provider untuk email/password login
- JWT callback: Simpan user data ke token
- Session callback: Expose token data ke client

**2. Protected Routes dengan Middleware:**
```typescript
export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    
    if (requireAuth.includes(pathname)) {
      const token = await getToken({ req, secret });
      
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
    
    return middleware(req, next);
  };
}
```
**Penjelasan:**
- Check JWT token untuk protected routes
- Redirect ke `/login` jika tidak ada token
- Middleware wrapper untuk reusability

---

### Firebase Integration

**1. Firebase Config:**
```typescript
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  // ...
};

const app = initializeApp(firebaseConfig);
```

**2. Firestore Service:**
```typescript
export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  return snapshot.data();
}
```
**Penjelasan:**
- `retrieveProducts`: Get all documents dari collection
- `retrieveDataByID`: Get single document by ID
- Data di-map dengan ID dari Firestore

---

## 3. Rekam penjelasan Anda melalui zoom atau OBS

### Struktur Penjelasan Video:

**Part 1: Project Overview (5 menit)**
- Pengenalan project Next.js
- Struktur folder dan file organization
- Tech stack yang digunakan (Next.js, Firebase, NextAuth, TypeScript)

**Part 2: Pages & Routing (10 menit)**
- Penjelasan setiap page yang dibuat
- Demo navigasi antar halaman
- Dynamic routing untuk product detail
- Custom 404 page

**Part 3: Rendering Methods (15 menit)**
- CSR: Demo `/product` dengan skeleton loading
- SSR: Demo `/product/server` dengan data langsung muncul
- SSG: Demo `/product/static` dengan ISR
- Perbandingan Network tab untuk ketiga metode
- View Page Source untuk lihat perbedaan HTML

**Part 4: API Routes (10 menit)**
- Demo `/api/product` - Get all products
- Demo `/api/product/{id}` - Get by ID
- Demo `/api/seed` - Populate data
- Demo `/api/revalidate` - On-demand revalidation dengan token

**Part 5: Authentication (10 menit)**
- Demo sign in dengan NextAuth
- Show session data di navbar
- Demo protected route `/profile`
- Demo redirect ke login jika belum auth
- Demo sign out

**Part 6: Styling & Components (5 menit)**
- CSS Modules untuk scoped styling
- Responsive design
- Skeleton loading animation
- Hover effects dan transitions

**Part 7: Firebase Integration (5 menit)**
- Firestore database structure
- CRUD operations
- Real-time data fetching

**Part 8: Code Walkthrough (10 menit)**
- Penjelasan code penting:
  - getServerSideProps
  - getStaticProps & getStaticPaths
  - useSWR hook
  - NextAuth callbacks
  - Middleware withAuth

**Part 9: Build & Deployment (5 menit)**
- Demo `npm run build`
- Lihat build output dan static pages generated
- Demo `npm start` untuk production mode
- Penjelasan perbedaan dev vs production

**Part 10: Q&A & Kesimpulan (5 menit)**
- Recap fitur-fitur utama
- Best practices yang digunakan
- Lessons learned
- Future improvements

---

## File Structure Summary

```
my-app/
├── src/
│   ├── components/
│   │   └── layouts/
│   │       ├── AppShell/
│   │       └── navbar/
│   ├── pages/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth].ts
│   │   │   ├── [[...product]].ts
│   │   │   ├── revalidate.ts
│   │   │   └── seed.ts
│   │   ├── auth/
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   ├── product/
│   │   │   ├── [product].tsx (Dynamic SSG)
│   │   │   ├── index.tsx (CSR)
│   │   │   ├── server.tsx (SSR)
│   │   │   └── static.tsx (SSG + ISR)
│   │   ├── profile/
│   │   │   └── index.tsx
│   │   ├── 404.tsx
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   ├── views/
│   │   ├── auth/
│   │   ├── product/
│   │   └── DetailProduct/
│   ├── middlewares/
│   │   └── withAuth.ts
│   ├── utils/
│   │   ├── db/
│   │   │   ├── firebase.ts
│   │   │   └── servicefirebase.ts
│   │   └── swr/
│   │       └── fetcher.ts
│   ├── types/
│   │   └── Product.type.ts
│   ├── styles/
│   │   └── globals.css
│   └── middleware.ts
├── .env.local
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Environment Variables

```env
# Firebase
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Revalidate Token
REVALIDATE_TOKEN=your-revalidate-token
```

---

## Key Features Implemented

✅ Multiple rendering methods (CSR, SSR, SSG, ISR)
✅ Dynamic routing dengan getStaticPaths
✅ API routes dengan catch-all pattern
✅ NextAuth authentication dengan JWT
✅ Protected routes dengan middleware
✅ Firebase Firestore integration
✅ SWR untuk data fetching dan caching
✅ CSS Modules untuk scoped styling
✅ Skeleton loading states
✅ Custom 404 page
✅ On-demand ISR revalidation
✅ TypeScript untuk type safety
✅ Responsive design
✅ Environment variables untuk configuration

---

## Kesimpulan

Project ini mendemonstrasikan pemahaman lengkap tentang:
- Next.js rendering strategies
- Authentication & authorization
- API design patterns
- Database integration
- Modern React patterns (hooks, context)
- TypeScript best practices
- CSS architecture
- Performance optimization
