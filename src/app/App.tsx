import { Header } from '../layout/Header/Header'
import styles from './App.module.scss'
import { AppRouter } from './AppRouter'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <AppRouter />
    </div>
  )
}

export default App
