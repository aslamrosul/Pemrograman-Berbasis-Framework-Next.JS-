import Head from 'next/head';
import styles from '@/styles/404.module.scss';
import Link from 'next/link'; // Import Link dari Next.js


const Custom404 = () => {
    return (
        <div className={styles.error}>
            {/* Tugas 1: Judul halaman di browser */}
            <Head>
                <title>404 | Halaman Tidak Ditemukan</title>
            </Head>

            {/* Tugas 1: Gambar ilustrasi dari folder public */}
            <img
                src="/page-not-found.png"
                alt="404 Not Found"
                className={styles.error__image}
            />

            {/* Tugas 1: Judul dan deskripsi singkat */}
            <h1 className={styles.error__title}>404 - Halaman Tidak Ditemukan</h1>
            <p className={styles.error__description}>
                Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
            </p>
            <Link href="/" className={styles.error__button}>
                Kembali ke Beranda
            </Link>
        </div>
    );
};

export default Custom404;