# Interactive Cursor by studio.piggly

Interactive Cursor is a lightweight library for creating a custom cursor that interacts with pages and elements with responsiveness.

## How it works?

The library replaces the cursor with an HTML element, following the structure below:

```html
<div id="interactive-cursor" class="is-small">
	<div class="cursor-label"></div>
	<div class="cursor-icon"></div>
</div>
```

It has a main wrapper with a custom ID (`#interactive-cursor`), a wrapper for the cursor label (`.cursor-label`), and another for the cursor icon (`.cursor-icon`). It is possible to customize the cursor with CSS as your needs. See an example below:

```css
/** It will create a rounded cursor with 3 sizes **/
#interactive-cursor {
	position: fixed;
	text-align: center;
	width: 80px;
	height: 80px;
	z-index: 1000;
	-webkit-transform-origin: center center;
	transform-origin: center center;
	pointer-events: none;
	z-index: 99999;
}

#interactive-cursor .cursor-label {
	display: block;
	width: 80px;
	height: 80px;
	line-height: 80px;
	font-size: 11px;
	font-weight: 600;
	letter-spacing: .14384615em;
	text-transform: uppercase;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%, -50%, 0);
	z-index: 1;
	color: #FFF;
	z-index: 99999;
}

#interactive-cursor .cursor-icon {
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	display: block;
	left: 0;
	top: 0;
	background: #000;
	width: 80px;
	height: 80px;
	transition: .3s ease-in-out;
	border-radius: 100%;
	transform: scale(.15);
	z-index: 99999;
}

#interactive-cursor.is-large .cursor-icon {
	transform: scale(1);
}

#interactive-cursor.is-medium .cursor-icon {
	transform: scale(.475);
}

#interactive-cursor.is-medium .cursor-label {
	top: -30px;
	left: 50%;
	transform: translate3d(-50%, 0, 0);
	color: #000
}

#interactive-cursor.is-small .cursor-label {
	top: -15px;
	left: 50%;
	transform: translate3d(-50%, 0, 0);
	color: #000
}
```