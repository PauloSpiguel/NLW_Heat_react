import { createContext, ReactNode, useState, useEffect } from "react"
import { api } from "../services/api"

type AuthContext = {
  children: ReactNode
}

type User = {
  id: string
  github_id: number
  login: string
  avatar_url: string
}

type AuthContextData = {
  user: User | null
  signInUrl: string
  signOut: () => void
}

type GithubResponse = {
  token: string;
  user: {
    id: string;
    login: string;
    name: string;
    avatar_url: string;
    github_id: number
  }
}

export const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({ children }: AuthContext) => {

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`

  const [user, setUser] = useState<User | null>(null)

  async function signIn(githubCode: string) {
    const response = await api.post<GithubResponse>("/authenticate", {
      code: githubCode
    })

    const { token, user } = response.data

    localStorage.setItem("@doWhile:token", token)

    setUser(user);
  }

  function signOut() {
    setUser(null)

    localStorage.removeItem("@doWhile:token")
  }

  useEffect(() => {
    const token = localStorage.getItem("@doWhile:token")

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`

      api.get<User>("/profile").then(response => {
        setUser(response.data);
      })
    }
  }, [])

  useEffect(() => {
    const url = window.location.href

    const hasGithubCode = url.includes("?code=")

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=")
      window.history.pushState({}, "", urlWithoutCode)

      signIn(githubCode)
    }

  }, [])

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }