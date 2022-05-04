import InteractiveCursor from '../src';

describe('apply type and text to cursor', () => {
	it('can apply cursor data to cursor component', () => {
		const obj = new InteractiveCursor({});

		const wrapper = document.getElementById('interactive-cursor');
		const label = document.querySelector(
			'#interactive-cursor .cursor-label'
		);

		if (!wrapper || !label) {
			throw new Error('Element must exists in DOM');
		}

		obj.applyToCursor({ type: 'medium', text: 'medium' });

		expect(wrapper.className).toBe('is-medium');
		expect(label.textContent).toBe('medium');

		obj.applyToCursor({ type: 'large', text: 'large' });

		expect(wrapper.className).toBe('is-large');
		expect(label.textContent).toBe('large');

		obj.applyToCursor({ type: 'small', text: 'small' });

		expect(wrapper.className).toBe('is-small');
		expect(label.textContent).toBe('small');

		obj.applyToCursor({ type: 'medium', text: '' });

		expect(wrapper.className).toBe('is-medium');
		expect(label.textContent).toBe('');
	});
});
