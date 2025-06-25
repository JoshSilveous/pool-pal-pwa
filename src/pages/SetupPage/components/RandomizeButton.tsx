import s from './RandomizeButton.module.scss'
import type { GameController } from '../../../hooks/useGameState'
import type { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
	gameCtrl: GameController
}
export function RandomizeButton({ gameCtrl, className, ...props }: Props) {
	const randomizeTeams = () => {
		const playerIDs = Object.keys(gameCtrl.players)

		// Shuffle the array using Fisher-Yates
		for (let i = playerIDs.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[playerIDs[i], playerIDs[j]] = [playerIDs[j], playerIDs[i]]
		}

		// Split into two teams (Team One gets the extra player if odd)
		const half = Math.ceil(playerIDs.length / 2)
		const teamOneIDs = playerIDs.slice(0, half)
		const teamTwoIDs = playerIDs.slice(half)

		gameCtrl.setTeams({
			one: { playerIDs: teamOneIDs, side: null },
			two: { playerIDs: teamTwoIDs, side: null },
		})
	}
	return (
		<div className={`${s.container} ${className}`} {...props}>
			<button onClick={randomizeTeams}>
				<img src='/dice.svg' />
				<div>Randomize Teams</div>
			</button>
		</div>
	)
}
