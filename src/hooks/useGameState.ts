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
	const [curTeam, setCurTeam] = useState<GameController['active']['curTeam']>('one')

	const [turnOrder, setTurnOrder] = useState<string[]>([])
	const [curTurnIndex, setCurTurnIndex] = useState(0)

	const startGame = () => {
		// generate array of turns (1000)
		const tempTurnOrder = []

		let curIndxTm1 = 0
		let curIndxTm2 = 0
		let curTm = 1
		for (let i = 0; i < 1000; i++) {
			if (curTm === 1) {
				tempTurnOrder.push(teams.one.playerIDs[curIndxTm1])
				if (curIndxTm1 === teams.one.playerIDs.length - 1) {
					curIndxTm1 = 0
				} else {
					curIndxTm1++
				}
				curTm = 2
			} else {
				tempTurnOrder.push(teams.two.playerIDs[curIndxTm2])
				if (curIndxTm2 === teams.two.playerIDs.length - 1) {
					curIndxTm2 = 0
				} else {
					curIndxTm2++
				}
				curTm = 1
			}
		}
		setTurnOrder(tempTurnOrder)
	}
	const gotoNextPlayer = () => {
		setCurTurnIndex((pr) => pr + 1)
	}
	const gotoPrevPlayer = () => {
		setCurTurnIndex((pr) => pr - 1)
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
		setTeams((prev) => {
			const clone = structuredClone(prev)
			const teamOneIndex = clone.one.playerIDs.findIndex((pid) => pid === id)
			const teamTwoIndex = clone.two.playerIDs.findIndex((pid) => pid === id)
			if (teamOneIndex !== -1) {
				clone.one.playerIDs.splice(teamOneIndex, 1)
			} else if (teamTwoIndex !== -1) {
				clone.two.playerIDs.splice(teamTwoIndex, 1)
			}
			return clone
		})
		setPlayers((prev) => {
			const clone = structuredClone(prev)
			delete clone[id]
			return clone
		})
	}

	const endGame = () => {
		setTurnOrder([])
		setCurTurnIndex(0)
	}

	const controller: GameController = {
		players,
		teams,
		setTeamSides,
		addNewPlayer,
		setTeams,
		deletePlayer,
		startGame,
		endGame,
		active: {
			curTeam,
			turnOrder,
			curTurnIndex,
			gotoNextPlayer,
			gotoPrevPlayer,
		},
	}

	return controller
}

export interface GameController {
	players: Players
	teams: Teams
	setTeams: React.Dispatch<React.SetStateAction<Teams>>
	setTeamSides: (teamOneSide: 'stripe' | 'solid', teamTwoSide: 'stripe' | 'solid') => void
	addNewPlayer: (name: string, team: 'one' | 'two') => void
	deletePlayer: (id: string) => void
	startGame: () => void
	endGame: () => void
	active: {
		curTeam: 'one' | 'two'
		turnOrder: string[]
		curTurnIndex: number
		gotoNextPlayer: () => void
		gotoPrevPlayer: () => void
	}
}
