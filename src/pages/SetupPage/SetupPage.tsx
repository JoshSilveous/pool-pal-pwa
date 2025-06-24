import type { GameController } from '../../hooks/useGameState'
import AddPlayerInput from './components/AddPlayerInput'
import { RandomizeButton } from './components/RandomizeButton'
import { StartGameButton } from './components/StartGameButton'
import { TeamsViewer } from './components/TeamsViewer'
import s from './SetupPage.module.scss'

interface Props {
	gameCtrl: GameController
}
export function SetupPage({ gameCtrl }: Props) {
	return (
		<div className={s.container}>
			<div className={s.title}>Team Setup</div>
			<TeamsViewer className={s.teams_viewer} gameCtrl={gameCtrl} />
			<AddPlayerInput className={s.add_player} gameCtrl={gameCtrl} />
			<RandomizeButton className={s.randomize} gameCtrl={gameCtrl} />
			<StartGameButton className={s.start_game} gameCtrl={gameCtrl} />
		</div>
	)
}
