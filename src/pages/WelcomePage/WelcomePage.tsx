import type { SetCurPage } from '../../App'
import s from './WelcomePage.module.scss'

export function WelcomePage({ setCurPage }: { setCurPage: SetCurPage }) {
	return (
		<div className={s.container}>
			<h1>Welcome!</h1>
			<p>
				This is a basic app that helps you keep track of teams & turn order when
				playing pool. Because after a few drinks, things can fall apart fast.
			</p>
			<button onClick={() => setCurPage('setup')}>Set up Game</button>
		</div>
	)
}
