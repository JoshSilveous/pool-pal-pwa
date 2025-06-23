import type { TouchEventHandler } from 'react'
import s from './WelcomePage.module.scss'
import { MovableDiv } from '../../components/MoveableDiv'

export function WelcomePage() {
	const onMoveStart = (e: any) => {
		console.log('onMoveStart', e)
	}
	const onMove = (e: any) => {
		console.log('onMove', e)
	}
	const onMoveEnd = (e: any) => {
		console.log('onMoveEnd', e)
	}
	return <MovableDiv {...{ onMoveStart, onMove, onMoveEnd }}>Hello</MovableDiv>
}
