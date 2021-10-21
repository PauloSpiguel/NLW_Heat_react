import { useEffect } from "react";
import { VscGithub } from "react-icons/vsc"
import { api } from "../../services/api";

import styles from "./styles.module.scss"

interface GithubResponse {
  token: string;
  user: {
    id: number;
    login: string;
    name: string;
    avatar_url: string;
  }
}


function LoginBox() {

  const siginInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`

  async function siginIn(githubCode: string) {
    const response = await api.post<GithubResponse>("authenticate", {
      code: githubCode
    })

    const { token, user } = response.data

    localStorage.setItem("@doWhile.token", token)

    console.log(user);

  }

  useEffect(() => {

    const url = window.location.href
    const [urlWithoutCode, githubCode] = url.split("?code=")

    console.log({ urlWithoutCode, githubCode })

    window.history.pushState({}, "", urlWithoutCode)

    siginIn(githubCode)

  }, [])

  return <div className={styles.loginWrapper}>
    <strong>Entre e compartinhe sua mensagem</strong>
    <a href={siginInUrl} className={styles.signInWithGithub}>
      <VscGithub size={24} />  Entrar com Github
    </a>
  </div>;
}

export { LoginBox };
