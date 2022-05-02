var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var InteractiveCursor = /** @class */ (function () {
    function InteractiveCursor(el) {
        /** Class Attributes */
        this._defaults = {
            debug: false,
            defaultCursor: { CURR_TYPE: 'small', CURR_TEXT: '' },
        };
        this._position = {
            currentX: -100,
            currentY: -100,
            clientX: -100,
            clientY: -100,
        };
        this._sizes = {
            SMALL: 12,
            MEDIUM: 38,
            LARGE: 80,
            DEFAULT: 40,
        };
        this._status = {
            LAST_TARGET: null,
            CURSOR: {
                CURR_TYPE: 'small',
                CURR_TEXT: '',
            },
        };
        this.createDOM(el);
        this.bind();
        requestAnimationFrame(this._render.bind(this));
    }
    InteractiveCursor.prototype.createDOM = function (el) {
        var _a;
        var wrapper = document.createElement('div');
        wrapper.id = el.WRAPPER_ID;
        var label = document.createElement('div');
        label.className = el.LABEL_CLASS;
        var icon = document.createElement('div');
        icon.className = el.ICON_CLASS;
        wrapper.appendChild(label);
        wrapper.appendChild(icon);
        this._components = {
            wrapper: wrapper,
            label: label,
            icon: icon,
        };
        document.body.insertAdjacentElement('afterbegin', wrapper);
        (_a = document.querySelector('html')) === null || _a === void 0 ? void 0 : _a.classList.add('no-cursor');
        this.resetCursor();
    };
    InteractiveCursor.prototype.bind = function () {
        document.addEventListener('mousemove', this.cursorMove.bind(this));
        document.addEventListener('mouseover', this.cursorOver.bind(this));
    };
    InteractiveCursor.prototype.cursorMove = function (e) {
        this._position.clientX = e.clientX - this._sizes.DEFAULT;
        this._position.clientY = e.clientY - this._sizes.DEFAULT;
    };
    InteractiveCursor.prototype.cursorOver = function (e) {
        var target = e.target;
        if (this._getData(target, 'cursorType')) {
            this._renderCursor(target);
        }
        else {
            if (target.tagName === 'BODY' ||
                !this._isDescendant(this._status.LAST_TARGET, target)) {
                this.resetCursor();
            }
            else if (this._status.CURSOR.CURR_TYPE !== null &&
                this._components) {
                this._applyToCursor(this._status.CURSOR);
            }
        }
    };
    InteractiveCursor.prototype.resetCursor = function () {
        this._applyToCursor(this._defaults.defaultCursor);
        this._status.CURSOR = __assign({}, this._defaults.defaultCursor);
    };
    InteractiveCursor.prototype._render = function () {
        if (!this._components)
            return;
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
        console.log(this._position);
        requestAnimationFrame(this._render.bind(this));
    };
    InteractiveCursor.prototype._renderCursor = function (el) {
        var _a;
        var type = this._getData(el, 'cursorType');
        var text = (_a = this._getData(el, 'cursorText')) !== null && _a !== void 0 ? _a : '';
        this._status = {
            LAST_TARGET: el,
            CURSOR: {
                CURR_TYPE: type,
                CURR_TEXT: text,
            },
        };
        this._applyToCursor(this._status.CURSOR);
    };
    InteractiveCursor.prototype._applyToCursor = function (cursor) {
        if (!this._components)
            return;
        this._components.wrapper.className = "is-".concat(cursor.CURR_TYPE);
        this._components.label.textContent = cursor.CURR_TEXT;
    };
    InteractiveCursor.prototype._isDescendant = function (parent, child) {
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
    };
    InteractiveCursor.prototype._getData = function (el, data) {
        if (el.dataset[data]) {
            var value = el.dataset[data];
            if (value === 'false') {
                return false;
            }
            else if (value === 'true') {
                return true;
            }
            return value;
        }
        return null;
    };
    InteractiveCursor.prototype._lerp = function (start, end, amt) {
        return (1 - amt) * start + amt * end;
    };
    return InteractiveCursor;
}());
export default InteractiveCursor;
