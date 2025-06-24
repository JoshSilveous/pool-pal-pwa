import { useRef, useState, type HTMLAttributes } from 'react'
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
	const onMoveStart = (e: MoveEvent) => {
		deleteUserRef.current!.classList.add(s.visible)
	}
	const onMove = (e: MoveEvent) => {
		const pid = e.node.dataset.pid!
		const teamkey = e.node.dataset.teamkey!

		const team1Rect = team1TileContainerRef.current!.getBoundingClientRect()
		const team2Rect = team2TileContainerRef.current!.getBoundingClientRect()

		const isInTeam1Rect =
			e.x > team1Rect.x &&
			e.x < team1Rect.x + team1Rect.width &&
			e.y > team1Rect.top &&
			e.y < team1Rect.top + team1Rect.height
		const isInTeam2Rect =
			e.x > team2Rect.x &&
			e.x < team2Rect.x + team2Rect.width &&
			e.y > team2Rect.top &&
			e.y < team2Rect.top + team2Rect.height

		// hide highlight effects
		const team1ChildNodes = Array.from(
			team1TileContainerRef.current!.childNodes
		) as HTMLDivElement[]
		const team2ChildNodes = Array.from(
			team2TileContainerRef.current!.childNodes
		) as HTMLDivElement[]

		if (isInTeam1Rect) {
			// figure out which tile the user's cursor is closest to (0 being before tile 1)
			const closestInsertIndex = (() => {
				const breakpoints = team1ChildNodes.map((childNode) => {
					const rect = childNode.getBoundingClientRect()
					return rect.top
				})
				breakpoints.push(
					breakpoints.at(-1)! +
						team1ChildNodes.at(-1)!.getBoundingClientRect().height
				)
				const breakpointsDistances = breakpoints.map((br) => Math.abs(br - e.y))
				return breakpointsDistances.indexOf(Math.min(...breakpointsDistances))
			})()
		}
		if (isInTeam2Rect) {
			// figure out which tile the user's cursor is closest to (0 being before tile 1)
			const closestInsertIndex = (() => {
				const breakpoints = team2ChildNodes.map((childNode) => {
					const rect = childNode.getBoundingClientRect()
					return rect.top
				})
				breakpoints.push(
					breakpoints.at(-1)! +
						team2ChildNodes.at(-1)!.getBoundingClientRect().height
				)
				const breakpointsDistances = breakpoints.map((br) => Math.abs(br - e.y))
				return breakpointsDistances.indexOf(Math.min(...breakpointsDistances))
			})()
		}
	}
	const onMoveEnd = (e: MoveEvent) => {
		const pid = e.node.dataset.pid!
		const teamkey = e.node.dataset.teamkey!

		deleteUserRef.current!.classList.remove(s.visible)
		// if deleting
		// gameCtrl.deletePlayer(pid)
		console.log(e.node.dataset)
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
									{...{ onMoveStart, onMove, onMoveEnd }}
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
									{...{ onMoveStart, onMove, onMoveEnd }}
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
