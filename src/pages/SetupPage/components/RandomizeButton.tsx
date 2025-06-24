import s from './RandomizeButton.module.scss'
import type { GameController } from '../../../hooks/useGameState'
import type { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
	gameCtrl: GameController
}
export function RandomizeButton({ gameCtrl, className, ...props }: Props) {
	return (
		<div className={`${s.container} ${className}`} {...props}>
			<button>
				<img src='/dice.svg' />
				<div>Randomize Teams</div>
			</button>
		</div>
	)
}
