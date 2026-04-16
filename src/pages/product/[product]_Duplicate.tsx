import { useRouter } from "next/router";

const HalamanProduk = () => {
    // const Router = useRouter();
    // console.log(Router);
    const {query} = useRouter();
    return (
        <div>
            <h1>Halaman Produk</h1> <br />
            <p>Produk : {query.product}</p>
        </div>
    );
};

export default HalamanProduk;