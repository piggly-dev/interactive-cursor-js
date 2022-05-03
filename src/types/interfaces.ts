import { TCursorTypes, TOrNull } from './types';

export interface Cursor {
	type: TCursorTypes;
	text: string;
	width: number;
}

export interface CursorPosition {
	currentX: number;
	currentY: number;
	clientX: number;
	clientY: number;
}

export interface CursorSizes {
	SMALL: number;
	MEDIUM: number;
	LARGE: number;
	DEFAULT: number;
}

export interface CursorStatus {
	last_target: TOrNull<HTMLElement>;
	cursor: Cursor;
}

export interface CursorElement {
	WRAPPER_ID: string;
	LABEL_CLASS: string;
	ICON_CLASS: string;
}

export interface CursorComponents {
	wrapper: HTMLElement;
	label: HTMLElement;
	icon: HTMLElement;
}

export interface Options {
	cursor: Cursor;
	debug: boolean;
	magnetize: {
		enabled: boolean;
		fn: (
			el: HTMLElement,
			delta: { x: number; y: number },
			scale: number
		) => void;
		threshold: number;
		velocity: {
			x: number;
			y: number;
		};
	};
	width: number;
}

export interface ElementMagnetized {
	el: HTMLElement;
	center: {
		x: number;
		y: number;
	};
	bounding: {
		x1: number;
		x2: number;
		y1: number;
		y2: number;
	};
}
