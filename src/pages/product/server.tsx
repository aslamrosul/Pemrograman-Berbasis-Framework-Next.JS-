import TampilanProduk from "../../views/product";
import { ProductType } from "../../types/Product.type";

const halamanProdukServer = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilanProduk products={products} />
    </div>
  );
};

export default halamanProdukServer;

export async function getServerSideProps() {
  try {
    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/product');
    const response = await res.json();
    console.log("SSR Response:", response);
    return {
      props: {
        products: response.data || [],
      },
    };
  } catch (error) {
    console.error("SSR Error:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}
