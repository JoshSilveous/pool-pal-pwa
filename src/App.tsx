import s from './App.module.scss'
import { TopBar } from './TopBar/TopBar'

function App() {
	return (
		<div className={s.main}>
			<div className={s.topbar_container}>
				<TopBar />
			</div>
			<div className={s.content_container}></div>
		</div>
	)
}

export default App
