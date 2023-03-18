import logo from './logoReact.svg'
import styles from './DivImg.module.css'

function Picture () {

  return(
    <div className ={styles.imagem}>

    <img src={logo} className="App-logo" alt="logo" />
    </div>
  )
}
export default Picture;