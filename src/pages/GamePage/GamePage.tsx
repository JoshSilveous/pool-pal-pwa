import type { SetCurPage } from '../../App'
import type { GameController } from '../../hooks/useGameState'
import s from './GamePage.module.scss'

export function GamePage({
	gameCtrl,
	setCurPage,
}: {
	gameCtrl: GameController
	setCurPage: SetCurPage
}) {
	gameCtrl.active

	const rows = (() => {
		const temp = []
		for (let i = 0; i < 7; i++) {
			const thisUserID = gameCtrl.active.turnOrder[gameCtrl.active.curTurnIndex + i]
			const thisUserTeam = gameCtrl.teams.one.playerIDs.includes(thisUserID)
				? 'one'
				: 'two'

			const teamLabel = gameCtrl.teams[thisUserTeam].side
				? gameCtrl.teams[thisUserTeam].side
				: thisUserTeam
			temp.push(
				<tr className={i === 0 ? s.current : undefined}>
					<td>{gameCtrl.players[thisUserID].name}</td>
					<td>{teamLabel.charAt(0).toUpperCase() + teamLabel.slice(1)}</td>
				</tr>
			)
		}
		return temp
	})()

	const endGame = () => {
		setCurPage('setup')
		gameCtrl.endGame()
	}

	return (
		<div className={s.container}>
			<h1>Game</h1>
			<table>
				<tr>
					<th>Name</th>
					<th>Team</th>
				</tr>
				{rows}
			</table>
			<div className={s.nav_container}>
				<button
					onClick={gameCtrl.active.gotoPrevPlayer}
					disabled={gameCtrl.active.curTurnIndex === 0}
				>
					Prev
				</button>
				<button onClick={gameCtrl.active.gotoNextPlayer}>Next</button>
			</div>
			{!gameCtrl.teams.one.side && (
				<div className={s.set_sides}>
					<h2>Set Sides</h2>
					<div className={s.team_container}>
						<div className={s.title}>Team 1</div>
						<button onClick={() => gameCtrl.setTeamSides('stripe', 'solid')}>
							Stripes
						</button>
						<button onClick={() => gameCtrl.setTeamSides('solid', 'stripe')}>
							Solids
						</button>
					</div>
					<div className={s.team_container}>
						<div className={s.title}>Team 2</div>
						<button onClick={() => gameCtrl.setTeamSides('stripe', 'solid')}>
							Stripes
						</button>
						<button onClick={() => gameCtrl.setTeamSides('solid', 'stripe')}>
							Solids
						</button>
					</div>
				</div>
			)}
			<div className={s.end_game_container}>
				<button onClick={endGame}>End Game</button>
			</div>
		</div>
	)
}
