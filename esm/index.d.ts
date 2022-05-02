import { CursorElement } from './types/interfaces';
export default class InteractiveCursor {
    /** Class Attributes */
    private _defaults;
    private _position;
    private _sizes;
    private _status;
    private _components?;
    constructor(el: CursorElement);
    createDOM(el: CursorElement): void;
    bind(): void;
    cursorMove(e: MouseEvent): void;
    cursorOver(e: MouseEvent): void;
    resetCursor(): void;
    private _render;
    private _renderCursor;
    private _applyToCursor;
    private _isDescendant;
    private _getData;
    private _lerp;
}
