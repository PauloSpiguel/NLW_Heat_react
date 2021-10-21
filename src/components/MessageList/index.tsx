import styles from "./styles.module.scss"

import logoImage from "../../assets/logo.svg"


function MessageList() {
  return <div className={styles.messageListWrapper}>
    <img src={logoImage} alt="Logo DoWhile" />

    <ul className={styles.messageList}>
      {new Array(3).fill(0).map((_, index) => (
        <li key={index} className={styles.message}>
          <p className={styles.messageContent}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo recusandae assumenda ducimus molestias culpa voluptate architecto quam qui non molestiae, vitae iste numquam cum esse error iure sint similique ad.</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/paulospiguel.png" alt="Avatar Paulo Spiguel" />
            </div>
            <span>Paulo Spiguel</span>
          </div>
        </li>
      ))}
    </ul>
  </div>;

}

export { MessageList };
