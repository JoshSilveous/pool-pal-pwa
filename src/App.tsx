import { useState } from 'react'
import s from './App.module.scss'
import { TopBar } from './TopBar/TopBar'
import { WelcomePage } from './pages/WelcomePage/WelcomePage'
import { SetupPage } from './pages/SetupPage/SetupPage'
import { GamePage } from './pages/GamePage/GamePage'
import useGameLogic from './hooks/useGameState'

function App() {
	const [curPage, setCurPage] = useState<PageName>('welcome')
	const gameCtrl = useGameLogic()

	return (
		<div className={s.main}>
			<div className={s.topbar_container}>
				<TopBar />
			</div>
			<div className={s.content_container}>
				{curPage === 'welcome' && <WelcomePage setCurPage={setCurPage} />}
				{curPage === 'setup' && (
					<SetupPage gameCtrl={gameCtrl} setCurPage={setCurPage} />
				)}
				{curPage === 'game' && (
					<GamePage gameCtrl={gameCtrl} setCurPage={setCurPage} />
				)}
			</div>
		</div>
	)
}
export type SetCurPage = React.Dispatch<React.SetStateAction<PageName>>

export default App
