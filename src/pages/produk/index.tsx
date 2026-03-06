import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const produk = () => {
  const [isLogin, setIsLogin] = useState(false); // Simulasi status login
  const { push } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      push("/auth/login"); // Redirect otomatis jika belum login
    }
  }, [isLogin, push]);

  return <div>Produk User Page</div>;
};
export default produk;