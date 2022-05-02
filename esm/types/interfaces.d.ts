import { TCursorTypes, TOrNull } from "./types";
export interface Cursor {
    CURR_TYPE: TCursorTypes;
    CURR_TEXT: string;
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
    LAST_TARGET: TOrNull<HTMLElement>;
    CURSOR: Cursor;
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
    debug: boolean;
    defaultCursor: Cursor;
}
