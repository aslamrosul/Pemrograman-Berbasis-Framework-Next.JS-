import Link from "next/link";
import styles from "./register.module.scss";

const RegisterView = () => {
  return (
    <div className={styles.register}>
      <h1>Create Account</h1>
      <div className={styles.form}>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
        <button type="button">Register</button>
      </div>
      <p>
        Already have an account? <Link href="/auth/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterView;