import type { HTMLAttributes, TouchEventHandler } from 'react'

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
	const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
		const startX = e.touches[0].clientX
		const startY = e.touches[0].clientY
		const button = e.currentTarget
		const popoutRoot = document.getElementById('popout_root')
		if (!popoutRoot) return

		const rect = button.getBoundingClientRect()
		const offsetX = startX - rect.left
		const offsetY = startY - rect.top

		const clone = button.cloneNode(true) as HTMLButtonElement
		clone.style.position = 'fixed'
		clone.style.left = `${startX - offsetX}px`
		clone.style.top = `${startY - offsetY}px`
		clone.style.margin = '0'
		clone.style.zIndex = '9999'
		clone.style.pointerEvents = 'none'
		popoutRoot.appendChild(clone)
		button.style.visibility = 'hidden'

		onMoveStart && onMoveStart({ x: offsetX, y: offsetY, node: button })

		let currentX = 0
		let currentY = 0
		const handleTouchMove = (e: TouchEvent) => {
			currentX = e.touches[0].clientX
			currentY = e.touches[0].clientY

			clone.style.left = `${currentX - offsetX}px`
			clone.style.top = `${currentY - offsetY}px`
			onMove && onMove({ x: currentX - offsetX, y: currentY - offsetY, node: button })
		}

		const handleTouchEnd = () => {
			onMoveEnd &&
				onMoveEnd({ x: currentX - offsetX, y: currentY - offsetY, node: button })
			window.removeEventListener('touchmove', handleTouchMove)
			window.removeEventListener('touchend', handleTouchEnd)
			popoutRoot.removeChild(clone)
			button.style.visibility = 'visible'
		}

		window.addEventListener('touchmove', handleTouchMove)
		window.addEventListener('touchend', handleTouchEnd)
	}

	return <div {...props} onTouchStart={handleTouchStart} />
}
