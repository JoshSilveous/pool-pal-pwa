import { useRef, useState, type HTMLAttributes, type TouchEventHandler } from 'react'
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
		const teamkey = e.node.dataset.teamkey!

		const deleteUserNode = deleteUserRef.current!
		const isInDeleteNodeRec = (x: number, y: number) => {
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
			team1ChildNodes[0].style.marginTop = '20px'
			team1ChildNodes.forEach((node) => (node.style.marginBottom = '0px'))
			team2ChildNodes[0].style.marginTop = '20px'
			team2ChildNodes.forEach((node) => (node.style.marginBottom = '0px'))

			if (team === 'none') return

			if (team === 'one') {
				if (index === 0) {
					team1ChildNodes[0].style.marginTop = '20px'
				} else {
					team1ChildNodes[index - 1].style.marginBottom = '20px'
				}
			} else if (team === 'two') {
				if (index === 0) {
					team2ChildNodes[0].style.marginTop = '20px'
				} else {
					team2ChildNodes[index - 1].style.marginBottom = '20px'
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
				console.log(distances)
			}
		}

		deleteUserRef.current!.classList.add(s.visible)

		const handleMove: TouchEventHandler = (e) => {
			console.log('moved')
			getClosestBreakpointIndex(e.touches[0].clientY, 'one')
		}
		const handleEnd = () => {
			console.log('move ended')
			window.removeEventListener('touchmove', handleMove as any)
			window.removeEventListener('touchend', handleEnd)
			window.removeEventListener('mousemove', handleMove as any)
			window.removeEventListener('mouseup', handleEnd)
		}
		window.addEventListener('touchmove', handleMove as any)
		window.addEventListener('touchend', handleEnd)
		window.addEventListener('mousemove', handleMove as any)
		window.addEventListener('mouseup', handleEnd)
	}
	// const onMove = (e: MoveEvent) => {
	// 	const pid = e.node.dataset.pid!
	// 	const teamkey = e.node.dataset.teamkey!

	// 	const team1Rect = team1TileContainerRef.current!.getBoundingClientRect()
	// 	const team2Rect = team2TileContainerRef.current!.getBoundingClientRect()
	// 	const deleteUserRect = deleteUserRef.current!.getBoundingClientRect()

	// 	const isInTeam1Rect =
	// 		e.x > team1Rect.x &&
	// 		e.x < team1Rect.x + team1Rect.width &&
	// 		e.y > team1Rect.top &&
	// 		e.y < team1Rect.top + team1Rect.height
	// 	const isInTeam2Rect =
	// 		e.x > team2Rect.x &&
	// 		e.x < team2Rect.x + team2Rect.width &&
	// 		e.y > team2Rect.top &&
	// 		e.y < team2Rect.top + team2Rect.height
	// 	const isHoveringOverDelete =
	// 		e.x > deleteUserRect.x &&
	// 		e.x < deleteUserRect.x + deleteUserRect.width &&
	// 		e.y > deleteUserRect.top &&
	// 		e.y < deleteUserRect.top + deleteUserRect.height

	// 	console.log(isHoveringOverDelete)

	// 	// hide highlight effects
	// 	const team1ChildNodes = Array.from(
	// 		team1TileContainerRef.current!.childNodes
	// 	) as HTMLDivElement[]
	// 	const team2ChildNodes = Array.from(
	// 		team2TileContainerRef.current!.childNodes
	// 	) as HTMLDivElement[]

	// 	if (isInTeam1Rect) {
	// 		// figure out which tile the user's cursor is closest to (0 being before tile 1)
	// 		const closestInsertIndex = (() => {
	// 			const breakpoints = team1ChildNodes.map((childNode) => {
	// 				const rect = childNode.getBoundingClientRect()
	// 				return rect.top
	// 			})
	// 			breakpoints.push(
	// 				breakpoints.at(-1)! +
	// 					team1ChildNodes.at(-1)!.getBoundingClientRect().height
	// 			)
	// 			const breakpointsDistances = breakpoints.map((br) => Math.abs(br - e.y))
	// 			return breakpointsDistances.indexOf(Math.min(...breakpointsDistances))
	// 		})()
	// 	}
	// 	if (isInTeam2Rect) {
	// 		// figure out which tile the user's cursor is closest to (0 being before tile 1)
	// 		const closestInsertIndex = (() => {
	// 			const breakpoints = team2ChildNodes.map((childNode) => {
	// 				const rect = childNode.getBoundingClientRect()
	// 				return rect.top
	// 			})
	// 			breakpoints.push(
	// 				breakpoints.at(-1)! +
	// 					team2ChildNodes.at(-1)!.getBoundingClientRect().height
	// 			)
	// 			const breakpointsDistances = breakpoints.map((br) => Math.abs(br - e.y))
	// 			return breakpointsDistances.indexOf(Math.min(...breakpointsDistances))
	// 		})()
	// 	}
	// }
	// const onMoveEnd = (e: MoveEvent) => {
	// 	const pid = e.node.dataset.pid!
	// 	const teamkey = e.node.dataset.teamkey!

	// 	deleteUserRef.current!.classList.remove(s.visible)
	// 	// if deleting
	// 	// gameCtrl.deletePlayer(pid)
	// 	console.log(e.node.dataset)
	// }
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
