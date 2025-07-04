import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import '@fontsource/inter/index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
		<div id='popout_root' />
	</StrictMode>
)
