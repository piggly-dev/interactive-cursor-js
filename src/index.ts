import {
	Cursor,
	CursorComponents,
	CursorElement,
	CursorPosition,
	CursorStatus,
	ElementMagnetized,
	Options,
} from './types/interfaces';
import { TOrNull } from './types/types';

export default class InteractiveCursor {
	/** Class Attributes */
	private _defaults: Options = {
		debug: false,
		defaultCursor: { CURR_TYPE: 'small', CURR_TEXT: '' },
		threshold: 50,
		width: 80,
	};

	private _position: CursorPosition = {
		currentX: -100,
		currentY: -100,
		clientX: -100,
		clientY: -100,
	};

	private _status: CursorStatus = {
		LAST_TARGET: null,
		CURSOR: {
			CURR_TYPE: 'small',
			CURR_TEXT: '',
		},
	};

	private _magnetized?: ElementMagnetized;

	private _components?: CursorComponents;

	constructor(el: CursorElement, options?: Options) {
		if (options)
			Object.keys(options).forEach(key => {
				// @ts-ignore
				this._defaults[key] = options[key];
			});

		this.createDOM(el);
		this.bind();

		requestAnimationFrame(this._render.bind(this));
		requestAnimationFrame(this.magnetize.bind(this));
	}

	public createDOM(el: CursorElement) {
		const wrapper = document.createElement('div');
		wrapper.id = el.WRAPPER_ID;

		const label = document.createElement('div');
		label.className = el.LABEL_CLASS;

		const icon = document.createElement('div');
		icon.className = el.ICON_CLASS;

		wrapper.appendChild(label);
		wrapper.appendChild(icon);

		this._components = {
			wrapper,
			label,
			icon,
		};

		document.body.insertAdjacentElement('afterbegin', wrapper);
		document.querySelector('html')?.classList.add('no-cursor');

		this.resetCursor();
	}

	public bind() {
		document.addEventListener('mousemove', this.cursorMove.bind(this));
		document.addEventListener('mouseover', this.cursorOver.bind(this));
	}

	public cursorMove(e: MouseEvent) {
		const center = this._defaults.width / 2;
		const target = e.target as HTMLElement;

		this._position.clientX = e.clientX - center;
		this._position.clientY = e.clientY - center;

		if (target.classList.contains('magnetize') && !this._magnetized) {
			this._magnetize(target);
		}
	}

	public cursorOver(e: MouseEvent) {
		const target = e.target as HTMLElement;

		if (this._getData(target, 'cursorType')) {
			this._renderCursor(target);
		} else {
			if (
				target.tagName === 'BODY' ||
				!this._isDescendant(this._status.LAST_TARGET, target)
			) {
				this.resetCursor();
			} else if (
				this._status.CURSOR.CURR_TYPE !== null &&
				this._components
			) {
				this._applyToCursor(this._status.CURSOR);
			}
		}
	}

	public magnetize() {
		if (!this._magnetized) {
			requestAnimationFrame(this.magnetize.bind(this));
			return;
		}

		const el = this._magnetized.el;
		const bn = this._magnetized.bounding;
		const center = this._defaults.width / 2;

		const mX = this._position.clientX + center;
		const mY = this._position.clientY + center;

		if (!(mX >= bn.x1 && mX <= bn.x2 && mY >= bn.y1 && mY <= bn.y2)) {
			el.style.transform = `translate(0, 0) scale(1)`;
			el.classList.remove('magnet');

			this._magnetized = undefined;
			requestAnimationFrame(this.magnetize.bind(this));

			return;
		}

		const deltaX = Math.floor(this._magnetized.center.x - mX) * -0.25;
		const deltaY = Math.floor(this._magnetized.center.y - mY) * -0.35;

		el.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.2)`;
		el.classList.add('magnet');

		requestAnimationFrame(this.magnetize.bind(this));
		return;
	}

	public calculateDistance(
		el: HTMLElement,
		mouseX: number,
		mouseY: number
	) {
		return Math.floor(
			Math.sqrt(
				Math.pow(mouseX - (el.offsetLeft + el.clientWidth / 2), 2) +
					Math.pow(mouseY - (el.offsetTop + el.clientHeight / 2), 2)
			)
		);
	}

	public resetCursor() {
		this._applyToCursor(this._defaults.defaultCursor);
		this._status.CURSOR = { ...this._defaults.defaultCursor };
	}

	private _magnetize(el: HTMLElement) {
		const th = this._defaults.threshold;

		const x1 = el.getBoundingClientRect().x - th;
		const x2 = x1 + el.getBoundingClientRect().width + th * 2;
		const y1 = el.getBoundingClientRect().y - th;
		const y2 = y1 + el.getBoundingClientRect().height + th * 2;

		this._magnetized = {
			el,
			center: {
				x: (x2 - x1) / 2 + x1,
				y: (y2 - y1) / 2 + y1,
			},
			bounding: {
				x1,
				x2,
				y1,
				y2,
			},
		};
	}

	private _render(): void {
		if (!this._components) return;

		this._position.currentX =
			this._components.wrapper.getBoundingClientRect().x;
		this._position.currentY =
			this._components.wrapper.getBoundingClientRect().y;

		this._components.wrapper.style.left =
			this._lerp(this._position.currentX, this._position.clientX, 0.2) +
			'px';
		this._components.wrapper.style.top =
			this._lerp(this._position.currentY, this._position.clientY, 0.2) +
			'px';

		requestAnimationFrame(this._render.bind(this));
	}

	private _renderCursor(el: HTMLElement) {
		const type = this._getData(el, 'cursorType');
		const text = this._getData(el, 'cursorText') ?? '';

		this._status = {
			LAST_TARGET: el,
			CURSOR: {
				CURR_TYPE: type,
				CURR_TEXT: text,
			},
		};

		this._applyToCursor(this._status.CURSOR);
	}

	private _applyToCursor(cursor: Cursor): void {
		if (!this._components) return;

		this._components.wrapper.className = `is-${cursor.CURR_TYPE}`;
		this._components.label.textContent = cursor.CURR_TEXT;
	}

	private _isDescendant(parent: TOrNull<HTMLElement>, child: HTMLElement) {
		if (parent === null) {
			return false;
		}

		var node = child.parentNode;

		while (node !== null) {
			if (node === parent) {
				return true;
			}

			node = node.parentNode;
		}

		return false;
	}

	private _getData(el: HTMLElement, data: string): any {
		if (el.dataset[data]) {
			const value: any = el.dataset[data];

			if (value === 'false') {
				return false;
			} else if (value === 'true') {
				return true;
			}

			return value;
		}

		return null;
	}

	private _lerp(start: number, end: number, amt: number): number {
		return (1 - amt) * start + amt * end;
	}
}
