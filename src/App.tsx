import { useState } from 'react'
import s from './App.module.scss'
import { TopBar } from './TopBar/TopBar'
import { WelcomePage } from './pages/WelcomePage/WelcomePage'
import { SetupPage } from './pages/SetupPage/SetupPage'
import { GamePage } from './pages/GamePage/GamePage'

function App() {
	const [curPage, setCurPage] = useState<PageName>('welcome')

	return (
		<div className={s.main}>
			<div className={s.topbar_container}>
				<TopBar />
			</div>
			<div className={s.content_container}>
				{curPage === 'welcome' && <WelcomePage />}
				{curPage === 'setup' && <SetupPage />}
				{curPage === 'game' && <GamePage />}
			</div>
		</div>
	)
}

export default App
