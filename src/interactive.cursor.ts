import { Cursor, CursorComponents, CursorElement, CursorPosition, CursorSizes, CursorStatus, Options } from "./types/interfaces";

class InteractiveCursor {
	/** Class Attributes */
   private _defaults: Options = {
		debug: false,
		defaultCursor: { CURR_TYPE: 'small', CURR_TEXT: '' }
	};

	private _position: CursorPosition = {
		currentX: -100,
		currentY: -100,
		clientX: -100,
		clientY: -100,
	}

	private _sizes: CursorSizes = {
		SMALL: 12,
		MEDIUM: 38,
		LARGE: 80,
		DEFAULT: 40
	}
            
	private _status: CursorStatus =	{
		LAST_TARGET: null,
		CURSOR: {
			CURR_TYPE: 'small',
			CURR_TEXT: ''
		}
	};

	private _components?: CursorComponents;

	constructor (el: CursorElement) {
		this.createDOM(el);
	}

	public createDOM (el: CursorElement) {
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
			icon
		};

		document.body.insertAdjacentElement('afterbegin', wrapper);
		document.querySelector('html')?.classList.add('no-cursor');

		this.resetCursor();
	}

	public bind () {
		document.addEventListener('mousemove', this.cursorMove.bind(this));
		document.addEventListener('mouseover', this.cursorOver.bind(this));
	}

	public cursorMove (e: MouseEvent) {
		this._position.clientX = e.clientX - this._sizes.DEFAULT;
		this._position.clientY = e.clientY - this._sizes.DEFAULT;
	}

	public cursorOver (e: MouseEvent) {
		const target = e.target; 

		if ( this._getData(target, 'cursorType') ) {
			this.renderCursor(target);
		} else {
			if ( target.tagName === 'BODY' || !this._isDescendant(this._status.LAST, target) ) {
				this.resetCursor();
			} else if ( this._status.TYPE !== null && this._components ) {
				this._applyToCursor(
					this._status.TYPE, 
					this._status.TEXT
				);
			}
		}
	}

	public resetCursor () {
		this._applyToCursor(this._defaults.defaultCursor);
		this._status.CURSOR = {...this._defaults.defaultCursor};
	}

	private _render () : void {
		if ( !this._components ) return;

		this._position.currentX = this._components.wrapper.getBoundingClientRect().x;
		this._position.currentY = this._components.wrapper.getBoundingClientRect().y;

		this._components.wrapper.style.left = this._lerp( this._position.currentX, this._position.clientX, 0.2) + 'px';
		this._components.wrapper.style.top = this._lerp( this._position.currentY, this._position.clientY, 0.2) + 'px';

		requestAnimationFrame(this._render.bind(this));
	}

	private _renderCursor (el: HTMLElement) {
		const type = this._getData(el, 'cursorType');
		const text = this._getData(el, 'cursorText') ?? '';

		this._status = {
			LAST_TARGET: el,
			CURSOR: {
				CURR_TYPE: type,
				CURR_TEXT: text
			}
		};

		this._applyToCursor(this._status.CURSOR);
	}

	private _applyToCursor (cursor: Cursor) : void {
		if (!this._components) return;

		this._components.wrapper.className = `is-${cursor.CURR_TYPE}`;
		this._components.label.textContent = cursor.CURR_TEXT;
	}
    
	private _isDescendant ( parent: HTMLElement, child: HTMLElement ) 
	{
		if ( parent === null )
		{ return false; }
		
		var node = child.parentNode;
		
		while (node !== null) 
		{
			if (node === parent) 
			{ return true; }
			
			node = node.parentNode;
		}
		
		return false;
	}

	private _getData (el: HTMLElement, data: string) : any {
		if (el.dataset[data]) {
			const data = el.dataset[data];

			if (data === 'false') {
				return false;
			} else if (data === 'true') {
				return true;
			}

			return data;
		}

		return null;
	}

	private _lerp ( start: number, end: number, amt: number ) : number {
		return (1-amt) * start - amt * end;
	}
}