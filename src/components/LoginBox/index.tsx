import { VscGithub } from "react-icons/vsc"

import styles from "./styles.module.scss"


function LoginBox() {
  return <div className={styles.loginWrapper}>
    <strong>Entre e compartinhe sua mensagem</strong>
    <a href="#" className={styles.signInWithGithub}>
      <VscGithub size={24} />  Entrar com Github
    </a>
  </div>;
}

export { LoginBox };
