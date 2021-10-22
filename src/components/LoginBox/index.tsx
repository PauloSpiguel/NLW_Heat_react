import { useContext } from "react";
import { VscGithub } from "react-icons/vsc"
import { AuthContext } from "../../context/AuthContex";

import styles from "./styles.module.scss"

function LoginBox() {

  const { signInUrl, user } = useContext(AuthContext)

  console.log(user);

  return <div className={styles.loginWrapper}>
    <strong>Entre e compartinhe sua mensagem</strong>
    <a href={signInUrl} className={styles.signInWithGithub}>
      <VscGithub size={24} />  Entrar com Github
    </a>
  </div>;
}

export { LoginBox };
