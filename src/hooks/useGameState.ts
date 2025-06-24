import { useState } from 'react'

export default function useGameLogic() {
	const [players, setPlayers] = useState<Players>({})
	const [teams, setTeams] = useState<Teams>({
		one: { playerIDs: [], side: null },
		two: { playerIDs: [], side: null },
	})
	const [curPlayerID, setCurPlayerID] = useState<string>('')
	const [prevPlayerID, setPrevPlayerID] = useState<string>('')
	const [nextPlayerID, setNextPlayerID] = useState<string>('')
	const [curTeam, setCurTeam] = useState<GameController['curTeam']>('one')

	const gotoNextPlayer = () => {
		// using the current player, determine who the new nextPlayer is
		const curPlayerIndex = teams[curTeam].playerIDs.indexOf(curPlayerID)
		const calcedNextPlayerID =
			teams[curTeam].playerIDs.length - 1 === curPlayerIndex
				? teams[curTeam].playerIDs[0]
				: teams[curTeam].playerIDs[curPlayerIndex + 1]

		// set prevPlayerID to current curPlayerID
		setPrevPlayerID(curPlayerID)

		// set curPlayerID to current nextPlayerID
		setCurPlayerID(nextPlayerID)

		// set nextPlayerID to the calculated next player ID
		setNextPlayerID(calcedNextPlayerID)

		// update curTeam
		setCurTeam((prev) => (prev === 'one' ? 'two' : 'one'))
	}

	const gotoPrevPlayer = () => {
		// using the current player, determine who the new prevPlayer is
		const curPlayerIndex = teams[curTeam].playerIDs.indexOf(curPlayerID)
		const calcedPrevPlayerID =
			curPlayerIndex === 0
				? teams[curTeam].playerIDs.at(-1)!
				: teams[curTeam].playerIDs[curPlayerIndex - 1]

		// set nextPlayerID to current curPlayerID
		setNextPlayerID(curPlayerID)

		// set curPlayerID to current prevPlayerID
		setCurPlayerID(prevPlayerID)

		// set prevPlayerID to the calculated next player
		setPrevPlayerID(calcedPrevPlayerID)

		// update curTeam
		setCurTeam((prev) => (prev === 'one' ? 'two' : 'one'))
	}

	const setTeamSides: GameController['setTeamSides'] = (teamOneSide, teamTwoSide) => {
		// call setTeams to update info
		setTeams((prev) => {
			const clone = structuredClone(prev)
			clone.one.side = teamOneSide
			clone.two.side = teamTwoSide
			return clone
		})
	}

	const addNewPlayer: GameController['addNewPlayer'] = (name, team) => {
		const newPlayerID = Math.random().toString(36).substr(2, 9)
		setPlayers((prev) => ({ ...prev, [newPlayerID]: { name: name } }))
		setTeams((prev) => {
			const clone = structuredClone(prev)
			clone[team].playerIDs = [...clone[team].playerIDs, newPlayerID]
			return clone
		})
	}

	const deletePlayer: GameController['deletePlayer'] = (id) => {
		setPlayers((prev) => {
			const clone = structuredClone(prev)
			delete clone[id]
			return clone
		})
		setTeams((prev) => {
			const clone = structuredClone(prev)
			const teamOneIndex = clone.one.playerIDs.findIndex((pid) => pid === id)
			const teamTwoIndex = clone.one.playerIDs.findIndex((pid) => pid === id)
			if (teamOneIndex !== -1) {
				clone.one.playerIDs.splice(teamOneIndex, 1)
			} else if (teamTwoIndex !== -1) {
				clone.one.playerIDs.splice(teamTwoIndex, 1)
			}
			return clone
		})
	}

	const controller: GameController = {
		players,
		teams,
		curTeam,
		setTeamSides,
		addNewPlayer,
		setTeams,
		deletePlayer,
		active: {
			curPlayerID,
			prevPlayerID,
			nextPlayerID,
			gotoNextPlayer,
			gotoPrevPlayer,
		},
	}

	return controller
}

export interface GameController {
	players: Players
	teams: Teams
	curTeam: 'one' | 'two'
	setTeams: React.Dispatch<React.SetStateAction<Teams>>
	setTeamSides: (teamOneSide: 'stripe' | 'solid', teamTwoSide: 'stripe' | 'solid') => void
	addNewPlayer: (name: string, team: 'one' | 'two') => void
	deletePlayer: (id: string) => void
	active: {
		curPlayerID: string | null
		prevPlayerID: string | null
		nextPlayerID: string | null
		gotoNextPlayer: () => void
		gotoPrevPlayer: () => void
	}
}
