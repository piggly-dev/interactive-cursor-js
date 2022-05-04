import InteractiveCursor from '../src';

describe('object creation', () => {
	it('creates DOM element', () => {
		new InteractiveCursor({});

		const wrapper = document.getElementById('interactive-cursor');
		const label = document.querySelector(
			'#interactive-cursor .cursor-label'
		);
		const icon = document.querySelector(
			'#interactive-cursor .cursor-icon'
		);

		expect(wrapper).not.toBeNull();
		expect(label).not.toBeNull();
		expect(icon).not.toBeNull();
	});

	it('can change wrapper id', () => {
		new InteractiveCursor({ WRAPPER_ID: 'custom-id' });
		expect(document.getElementById('custom-id')).not.toBeNull();
	});

	it('can change label class', () => {
		new InteractiveCursor({ LABEL_CLASS: 'custom-label' });
		expect(
			document.querySelector('#interactive-cursor .custom-label')
		).not.toBeNull();
	});

	it('can change icon class', () => {
		new InteractiveCursor({ ICON_CLASS: 'custom-icon' });
		expect(
			document.querySelector('#interactive-cursor .custom-icon')
		).not.toBeNull();
	});
});
