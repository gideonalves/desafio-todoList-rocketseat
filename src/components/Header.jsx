import toDoLogo from "../assets/logoTodo.svg";

import styles from './Header.module.css';

export function Header() {
    return (
        <header className={styles.header}>
            <img src={toDoLogo} alt="Imagem do logo todo list" />
        </header>
    )
}