import type { SetCurPage } from '../../App'
import s from './GamePage.module.scss'

export function GamePage({ setCurPage }: { setCurPage: SetCurPage }) {
	return (
		<div className={s.container}>
			<h1>Game</h1>
		</div>
	)
}
