import s from './StartGameButton.module.scss'
import type { GameController } from '../../../hooks/useGameState'
import type { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
	gameCtrl: GameController
}
export function StartGameButton({ gameCtrl, className, ...props }: Props) {
	return (
		<div className={`${s.container} ${className}`} {...props}>
			<button>
				<img src='/8ball.svg' />
				<div>Start Game</div>
			</button>
		</div>
	)
}
