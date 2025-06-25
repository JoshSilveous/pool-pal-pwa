import s from './StartGameButton.module.scss'
import type { GameController } from '../../../hooks/useGameState'
import type { HTMLAttributes } from 'react'
import type { SetCurPage } from '../../../App'

interface Props extends HTMLAttributes<HTMLDivElement> {
	gameCtrl: GameController
	setCurPage: SetCurPage
}
export function StartGameButton({ gameCtrl, className, setCurPage, ...props }: Props) {
	return (
		<div className={`${s.container} ${className}`} {...props}>
			<button
				disabled={
					gameCtrl.teams.one.playerIDs.length === 0 ||
					gameCtrl.teams.two.playerIDs.length === 0
				}
				onClick={() => {
					setCurPage('game')
				}}
			>
				<img src='/8ball.svg' />
				<div>Start Game</div>
			</button>
		</div>
	)
}
