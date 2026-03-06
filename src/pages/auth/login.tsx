// login.tsx
import Link from "next/link";
import { useRouter } from "next/router";

const halamanLogin = () => {
  const { push } = useRouter();

  const handleLogin = () => {
    // Navigasi imperatif menggunakan router.push
    push("/produk");
  };

  return (
    <div>
      <h1>Halaman Login</h1>
      <button onClick={handleLogin}>Login ke Product</button>
      <br />
      <Link href="/auth/register">Ke Halaman Register (Link)</Link>
    </div>
  );
};
export default halamanLogin;