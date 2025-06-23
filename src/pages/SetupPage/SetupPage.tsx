import { TeamsViewer } from './components/TeamsViewer'
import s from './SetupPage.module.scss'

export function SetupPage() {
	return (
		<div className={s.container}>
			<div className={s.title}>Team Setup</div>
			<TeamsViewer />
			<div className={s.addplayer_container}></div>
			<div className={s.randomize_container}></div>
			<div className={s.start_container}></div>
		</div>
	)
}
