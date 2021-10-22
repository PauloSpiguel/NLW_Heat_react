import { useEffect, useState } from "react";

import logoImage from "../../assets/logo.svg"
import { api } from "../../services/api";

import styles from "./styles.module.scss"
interface Message {
  id: string
  text: string
  user: {
    name: string
    avatar_url: string
  }
}

function MessageList() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    api.get<Message[]>('/messages').then(response => {

      const { data } = response

      setMessages(data)
    })
  }, [])

  return <div className={styles.messageListWrapper}>
    <img src={logoImage} alt="Logo DoWhile" />

    <ul className={styles.messageList}>
      {messages.map((message: Message, index: number) => (
        <li key={index} className={styles.message}>
          <p className={styles.messageContent}>{message.text}</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src={message.user.avatar_url} alt="Avatar Paulo Spiguel" />
            </div>
            <span>{message.user.name}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>;

}

export { MessageList };
