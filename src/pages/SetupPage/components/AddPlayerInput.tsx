import { useRef, useState } from 'react'
import type { GameController } from '../../../hooks/useGameState'
import s from './AddPlayerInput.module.scss'

type Props = {
	gameCtrl: GameController
}
export default function AddPlayerInput({ gameCtrl }: Props) {
	const [newPlayerName, setNewPlayerName] = useState('')
	const [teamToAddTo, setTeamToAddTo] = useState<keyof Teams>('one')
	const inputRef = useRef<HTMLInputElement>(null)

	const handleAddPlayer = () => {
		if (newPlayerName.trim().length === 0) return

		gameCtrl.addNewPlayer(newPlayerName, teamToAddTo)
		setNewPlayerName('')
		setTeamToAddTo((prev) => (prev === 'one' ? 'two' : 'one'))
		inputRef.current!.focus()
	}

	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			console.log('entered')
			handleAddPlayer()
			setNewPlayerName('')
		}
	}

	return (
		<div className={s.container}>
			<input
				ref={inputRef}
				value={newPlayerName}
				type='text'
				placeholder='Player Name'
				onChange={(e) => setNewPlayerName(e.currentTarget.value)}
				onKeyDown={handleKeyDown}
				autoCapitalize='words'
			/>
			<button onClick={handleAddPlayer}>Add</button>
		</div>
	)
}
