import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {init, miniApp} from "@telegram-apps/sdk-react"

const initialize = async ()=>{
  try{
    await init()
    if (miniApp.ready.isAvailable()){
      await miniApp.ready()
      console.log("Готово")
    }
  }catch(error){
    console.error(error)   
  }
}

initialize()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
