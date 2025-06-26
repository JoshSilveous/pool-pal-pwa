import { useRef, type HTMLAttributes } from 'react'
import { MovableDiv, type MoveEvent } from '../../../components/MoveableDiv'
import type { GameController } from '../../../hooks/useGameState'
import s from './TeamsViewer.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
	gameCtrl: GameController
}
export function TeamsViewer({ gameCtrl, className, ...props }: Props) {
	const deleteUserRef = useRef<HTMLDivElement>(null)
	const team1TileContainerRef = useRef<HTMLDivElement>(null)
	const team2TileContainerRef = useRef<HTMLDivElement>(null)

	const handleMoveStart = (e: MoveEvent) => {
		const pid = e.node.dataset.pid!
		const teamkey = e.node.dataset.teamkey as 'one' | 'two'

		const deleteUserNode = deleteUserRef.current!
		deleteUserNode.classList.remove(s.highlighted)
		deleteUserNode.classList.add(s.visible)
		const isInDeleteNodeRect = (x: number, y: number) => {
			const deleteNodeRect = deleteUserNode.getBoundingClientRect()
			return (
				x > deleteNodeRect.x &&
				x < deleteNodeRect.x + deleteNodeRect.width &&
				y > deleteNodeRect.top &&
				y < deleteNodeRect.top + deleteNodeRect.height
			)
		}

		const team1Node = team1TileContainerRef.current!
		const isInTeam1Rect = (x: number, y: number) => {
			const team1Rect = team1Node.getBoundingClientRect()
			return (
				x > team1Rect.x &&
				x < team1Rect.x + team1Rect.width &&
				y > team1Rect.top &&
				y < team1Rect.top + team1Rect.height
			)
		}

		const team2Node = team2TileContainerRef.current!
		const isInTeam2Rect = (x: number, y: number) => {
			const team2Rect = team2Node.getBoundingClientRect()
			return (
				x > team2Rect.x &&
				x < team2Rect.x + team2Rect.width &&
				y > team2Rect.top &&
				y < team2Rect.top + team2Rect.height
			)
		}

		const team1ChildNodes = (() => {
			const nodes = Array.from(team1Node.childNodes) as HTMLDivElement[]

			return teamkey === 'one'
				? nodes.filter((node) => node.dataset.pid !== pid)
				: nodes
		})()
		const team2ChildNodes = (() => {
			const nodes = Array.from(team2Node.childNodes) as HTMLDivElement[]

			return teamkey === 'two'
				? nodes.filter((node) => node.dataset.pid !== pid)
				: nodes
		})()

		const renderGap = (team: 'one' | 'two' | 'none', index: number) => {
			// remove all margin styles first
			// console.log('team1ChildNodes', team1ChildNodes[0])
			team1ChildNodes.forEach((node) => {
				node.style.marginBottom = '0px'
				node.style.marginTop = '0px'
			})
			team2ChildNodes.forEach((node) => {
				node.style.marginBottom = '0px'
				node.style.marginTop = '0px'
			})

			if (team === 'none') return

			if (team === 'one' && team1ChildNodes.length !== 0) {
				if (index === 0) {
					team1ChildNodes[0].style.marginTop = '30px'
				} else {
					team1ChildNodes[index - 1].style.marginBottom = '30px'
				}
			} else if (team === 'two' && team2ChildNodes.length !== 0) {
				if (index === 0) {
					team2ChildNodes[0].style.marginTop = '30px'
				} else {
					team2ChildNodes[index - 1].style.marginBottom = '30px'
				}
			}
		}

		const team1Breakpoints = (() => {
			const breakpoints = [team1Node.getBoundingClientRect().top]

			const gap = parseInt(getComputedStyle(team1Node).gap)
			team1ChildNodes.forEach((node) => {
				breakpoints.push(
					breakpoints.at(-1)! + node.getBoundingClientRect().height + gap
				)
			})
			return breakpoints
		})()
		const team2Breakpoints = (() => {
			const breakpoints = [team2Node.getBoundingClientRect().top]

			const gap = parseInt(getComputedStyle(team2Node).gap)
			team2ChildNodes.forEach((node) => {
				breakpoints.push(
					breakpoints.at(-1)! + node.getBoundingClientRect().height + gap
				)
			})
			return breakpoints
		})()

		const getClosestBreakpointIndex = (yPos: number, team: 'one' | 'two') => {
			if (team === 'one') {
				const distances = team1Breakpoints.map((bkpt) => Math.abs(bkpt - yPos))
				return distances.indexOf(Math.min(...distances))
			} else {
				const distances = team2Breakpoints.map((bkpt) => Math.abs(bkpt - yPos))
				return distances.indexOf(Math.min(...distances))
			}
		}

		const handleMove = (x: number, y: number) => {
			deleteUserNode.classList.remove(s.highlighted)
			if (isInTeam1Rect(x, y)) {
				renderGap('one', getClosestBreakpointIndex(y, 'one'))
			} else if (isInTeam2Rect(x, y)) {
				renderGap('two', getClosestBreakpointIndex(y, 'two'))
			} else if (isInDeleteNodeRect(x, y)) {
				renderGap('none', 0)
				// highlight delete node
				deleteUserNode.classList.add(s.highlighted)
			} else {
				renderGap('none', 0)
			}
		}
		const handleEnd = (x: number, y: number) => {
			renderGap('none', 0)
			if (team1ChildNodes.length !== 0) {
				team1ChildNodes[0].style.marginTop = '0px'
				team1ChildNodes.forEach((node) => {
					node.style.marginBottom = '0px'
					node.style.marginTop = '0px'
				})
			}
			if (team2ChildNodes.length !== 0) {
				team2ChildNodes[0].style.marginTop = '0px'
				team2ChildNodes.forEach((node) => {
					node.style.marginBottom = '0px'
					node.style.marginTop = '0px'
				})
			}
			deleteUserNode.classList.remove(s.visible)
			deleteUserNode.classList.remove(s.highlighted)
			window.removeEventListener('touchmove', handleMoveTouch)
			window.removeEventListener('touchend', handleEndTouch)
			window.removeEventListener('mousemove', handleMoveMouse)
			window.removeEventListener('mouseup', handleEndMouse)

			if (isInTeam1Rect(x, y)) {
				const newIndex = getClosestBreakpointIndex(y, 'one')
				const oldIndex = gameCtrl.teams[teamkey].playerIDs.indexOf(pid)
				gameCtrl.setTeams((prev) => {
					const clone = structuredClone(prev)

					clone.one.playerIDs.splice(
						newIndex,
						0,
						clone[teamkey].playerIDs.splice(oldIndex, 1)[0]
					)
					return clone
				})
			} else if (isInTeam2Rect(x, y)) {
				const newIndex = getClosestBreakpointIndex(y, 'two')
				const oldIndex = gameCtrl.teams[teamkey].playerIDs.indexOf(pid)
				gameCtrl.setTeams((prev) => {
					const clone = structuredClone(prev)

					clone.two.playerIDs.splice(
						newIndex,
						0,
						clone[teamkey].playerIDs.splice(oldIndex, 1)[0]
					)
					return clone
				})
			} else if (isInDeleteNodeRect(x, y)) {
				renderGap('none', 0)
				gameCtrl.deletePlayer(pid)
			} else {
				renderGap('none', 0)
			}
		}

		const handleMoveTouch = (e: TouchEvent) =>
			handleMove(e.touches[0].clientX, e.touches[0].clientY)
		const handleEndTouch = (e: TouchEvent) =>
			handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
		const handleMoveMouse = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
		const handleEndMouse = (e: MouseEvent) => handleEnd(e.clientX, e.clientY)

		window.addEventListener('touchmove', handleMoveTouch)
		window.addEventListener('touchend', handleEndTouch)
		window.addEventListener('mousemove', handleMoveMouse)
		window.addEventListener('mouseup', handleEndMouse)
	}

	return (
		<div className={`${s.container} ${className}`} {...props}>
			<div className={s.table}>
				<div className={s.team_container}>
					<div className={s.title}>Team 1</div>
					<div className={s.tile_container} ref={team1TileContainerRef}>
						{gameCtrl.teams.one.playerIDs.map((pid) => {
							const pName = gameCtrl.players[pid].name
							return (
								<MovableDiv
									className={s.tile}
									onMoveStart={handleMoveStart}
									data-pid={pid}
									data-teamkey='one'
								>
									{pName}
								</MovableDiv>
							)
						})}
					</div>
				</div>
				<div className={s.team_container}>
					<div className={s.title}>Team 2</div>
					<div className={s.tile_container} ref={team2TileContainerRef}>
						{gameCtrl.teams.two.playerIDs.map((pid) => {
							const pName = gameCtrl.players[pid].name
							return (
								<MovableDiv
									className={s.tile}
									onMoveStart={handleMoveStart}
									data-pid={pid}
									data-teamkey='two'
								>
									{pName}
								</MovableDiv>
							)
						})}
					</div>
				</div>
			</div>
			<div ref={deleteUserRef} className={s.delete_user}>
				<img src='/trash.svg' />
				<div>Delete User</div>
			</div>
		</div>
	)
}
