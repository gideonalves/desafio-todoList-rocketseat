import './global.css';
import styles from './components/App.module.css';

import { Header } from "./components/Header";
import { Tasks } from './components/Tasks';

function App() {

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <main>
            <Tasks />
        </main>
      </div>
        
    </div>
  )
}

export default App
