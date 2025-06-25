import type { SetCurPage } from '../../App'
import type { GameController } from '../../hooks/useGameState'
import AddPlayerInput from './components/AddPlayerInput'
import { RandomizeButton } from './components/RandomizeButton'
import { StartGameButton } from './components/StartGameButton'
import { TeamsViewer } from './components/TeamsViewer'
import s from './SetupPage.module.scss'

interface Props {
	gameCtrl: GameController
	setCurPage: SetCurPage
}
export function SetupPage({ gameCtrl, setCurPage }: Props) {
	return (
		<div className={s.container}>
			<h1>Team Setup</h1>
			<TeamsViewer className={s.teams_viewer} gameCtrl={gameCtrl} />
			<AddPlayerInput className={s.add_player} gameCtrl={gameCtrl} />
			<RandomizeButton className={s.randomize} gameCtrl={gameCtrl} />
			<StartGameButton
				className={s.start_game}
				gameCtrl={gameCtrl}
				setCurPage={setCurPage}
			/>
		</div>
	)
}
