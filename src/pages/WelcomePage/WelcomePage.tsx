import s from './WelcomePage.module.scss'
import { MovableDiv } from '../../components/MoveableDiv'
import type { SetCurPage } from '../../App'

export function WelcomePage({ setCurPage }: { setCurPage: SetCurPage }) {
	return (
		<div>
			<h1>Welcome!</h1>
			<button onClick={() => setCurPage('setup')}>Set up Game</button>
		</div>
	)
}
