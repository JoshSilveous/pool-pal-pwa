import { MovableDiv } from '../../../components/MoveableDiv'
import s from './TeamsViewer.module.scss'

export function TeamsViewer() {
	const onMoveStart = (e: any) => {
		console.log('onMoveStart', e)
	}
	const onMove = (e: any) => {
		console.log('onMove', e)
	}
	const onMoveEnd = (e: any) => {
		console.log('onMoveEnd', e)
	}
	// <MovableDiv {...{ onMoveStart, onMove, onMoveEnd }}>Hello</MovableDiv>
	return (
		<div className={s.container}>
			<div className={s.team_container}>
				<div className={s.title}>Team 1</div>
			</div>
			<div className={s.team_container}>
				<div className={s.title}>Team 2</div>
			</div>
		</div>
	)
}
