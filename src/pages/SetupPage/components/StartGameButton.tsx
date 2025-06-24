import s from './StartGameButton.module.scss'
import type { GameController } from '../../../hooks/useGameState'

type Props = {
	gameCtrl: GameController
}
export function StartGameButton({ gameCtrl }: Props) {
	return (
		<div className={s.container}>
			<button>
				<img src='/8ball.svg' />
				<div>Start Game</div>
			</button>
		</div>
	)
}
