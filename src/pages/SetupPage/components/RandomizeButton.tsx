import s from './RandomizeButton.module.scss'
import type { GameController } from '../../../hooks/useGameState'

type Props = {
	gameCtrl: GameController
}
export function RandomizeButton({ gameCtrl }: Props) {
	return (
		<div className={s.container}>
			<button>
				<img src='/dice.svg' />
				<div>Randomize Teams</div>
			</button>
		</div>
	)
}
