import type { HTMLAttributes, TouchEventHandler, MouseEventHandler } from 'react'

interface MovableDivProps extends HTMLAttributes<HTMLDivElement> {
	onMoveStart?: (e: MoveEvent) => any
	onMove?: (e: MoveEvent) => any
	onMoveEnd?: (e: MoveEvent) => any
}

type MoveEvent = {
	x: number
	y: number
	node: HTMLDivElement
}

export function MovableDiv({ onMoveStart, onMove, onMoveEnd, ...props }: MovableDivProps) {
	const handleStart = (
		startX: number,
		startY: number,
		sourceNode: HTMLDivElement,
		getCurrentXY: (e: TouchEvent | MouseEvent) => { x: number; y: number }
	) => {
		const popoutRoot = document.getElementById('popout_root')
		if (!popoutRoot) return

		const rect = sourceNode.getBoundingClientRect()
		const offsetX = startX - rect.left
		const offsetY = startY - rect.top

		const clone = sourceNode.cloneNode(true) as HTMLDivElement
		clone.style.position = 'fixed'
		clone.style.left = `${startX - offsetX}px`
		clone.style.top = `${startY - offsetY}px`
		clone.style.margin = '0'
		clone.style.zIndex = '9999'
		clone.style.pointerEvents = 'none'
		popoutRoot.appendChild(clone)
		sourceNode.style.visibility = 'hidden'

		onMoveStart && onMoveStart({ x: offsetX, y: offsetY, node: sourceNode })

		let currentX = 0
		let currentY = 0

		const handleMove = (e: TouchEvent | MouseEvent) => {
			const { x, y } = getCurrentXY(e)
			currentX = x
			currentY = y

			clone.style.left = `${x - offsetX}px`
			clone.style.top = `${y - offsetY}px`
			onMove && onMove({ x: x, y: y, node: sourceNode })
		}

		const handleEnd = () => {
			onMoveEnd && onMoveEnd({ x: currentX, y: currentY, node: sourceNode })
			window.removeEventListener('touchmove', handleMove as any)
			window.removeEventListener('touchend', handleEnd)
			window.removeEventListener('mousemove', handleMove as any)
			window.removeEventListener('mouseup', handleEnd)
			popoutRoot.removeChild(clone)
			sourceNode.style.visibility = 'visible'
		}

		window.addEventListener('touchmove', handleMove as any)
		window.addEventListener('touchend', handleEnd)
		window.addEventListener('mousemove', handleMove as any)
		window.addEventListener('mouseup', handleEnd)
	}

	const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
		handleStart(
			e.touches[0].clientX,
			e.touches[0].clientY,
			e.currentTarget,
			(e: TouchEvent | MouseEvent) => ({
				x: (e as TouchEvent).touches?.[0]?.clientX ?? 0,
				y: (e as TouchEvent).touches?.[0]?.clientY ?? 0,
			})
		)
	}

	const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
		handleStart(e.clientX, e.clientY, e.currentTarget, (e: MouseEvent | TouchEvent) => ({
			x: (e as MouseEvent).clientX,
			y: (e as MouseEvent).clientY,
		}))
	}

	return (
		<div
			{...props}
			onTouchStart={handleTouchStart}
			onMouseDown={handleMouseDown}
			style={{ touchAction: 'none', ...props.style }}
		/>
	)
}
