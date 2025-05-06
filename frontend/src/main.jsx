import 'bootstrap/dist/css/bootstrap.min.css'
import { createRoot } from 'react-dom/client'
import init from './init.jsx'

const app = async () => {
  const root = createRoot(document.getElementById('root'))
  root.render(await init())
}

app()
