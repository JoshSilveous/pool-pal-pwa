import { MovableDiv } from '../../../components/MoveableDiv'
import type { GameController } from '../../../hooks/useGameState'
import s from './TeamsViewer.module.scss'

interface Props {
	gameCtrl: GameController
}
export function TeamsViewer({ gameCtrl }: Props) {
	const onMoveStart = (e: any) => {
		console.log('onMoveStart', e)
	}
	const onMove = (e: any) => {
		console.log('onMove', e)
	}
	const onMoveEnd = (e: any) => {
		console.log('onMoveEnd', e)
	}
	return (
		<div className={s.container}>
			<div className={s.team_container}>
				<div className={s.title}>Team 1</div>
				<div className={s.tile_container}>
					{gameCtrl.teams.one.playerIDs.map((pid) => {
						const pName = gameCtrl.players[pid].name
						return <MovableDiv className={s.tile}>{pName}</MovableDiv>
					})}
				</div>
				<div className={s.delete_user}>Delete</div>
			</div>
			<div className={s.team_container}>
				<div className={s.title}>Team 2</div>
				<div className={s.tile_container}>
					{gameCtrl.teams.two.playerIDs.map((pid) => {
						const pName = gameCtrl.players[pid].name
						return <MovableDiv className={s.tile}>{pName}</MovableDiv>
					})}
				</div>
				<div className={s.delete_user}>Delete</div>
			</div>
		</div>
	)
}
