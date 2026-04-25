import styles from "./product.module.scss";
import Link from "next/link";
import Image from "next/image";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

// Helper function untuk format harga konsisten
const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const TampilanProduk = ({ products }: { products: ProductType[] }) => {
  // Safety check untuk products  
  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title} data-testid="title">Daftar Produk</h1>
      <div className={styles.produk__content}>
        {products?.length > 0 ? (
          <>
            {products?.map((product: ProductType) => (
              <Link href={`/product/${product.id}`} key={product.id} className={styles.produk__content__item}>
                <div className={styles.produk__content__item__image}>
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={200} 
                    height={200}
                  />
                </div>
                <h4 className={styles.produk__content__item__name}>
                  {product.name}
                </h4>
                <p className={styles.produk__content__item__category}>
                  {product.category}
                </p>
                <p className={styles.produk__content__item__price}>
                  Rp {formatPrice(product.price)}
                </p>
              </Link>
            ))}
          </>
        ) : (
          <>
            <div className={styles.produk__content__skeleton}>
              <div className={styles.produk__content__skeleton__image}></div>
              <div className={styles.produk__content__skeleton__name}></div>
              <div className={styles.produk__content__skeleton__category}></div>
              <div className={styles.produk__content__skeleton__price}></div>
            </div>
            <div className={styles.produk__content__skeleton}>
              <div className={styles.produk__content__skeleton__image}></div>
              <div className={styles.produk__content__skeleton__name}></div>
              <div className={styles.produk__content__skeleton__category}></div>
              <div className={styles.produk__content__skeleton__price}></div>
            </div>
            <div className={styles.produk__content__skeleton}>
              <div className={styles.produk__content__skeleton__image}></div>
              <div className={styles.produk__content__skeleton__name}></div>
              <div className={styles.produk__content__skeleton__category}></div>
              <div className={styles.produk__content__skeleton__price}></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;
