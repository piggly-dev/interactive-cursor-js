import InteractiveCursor from '../src';

describe('lerp calculation', () => {
	it('can calculate linear interpolation', () => {
		const obj = new InteractiveCursor({});
		const proto = Object.getPrototypeOf(obj);

		expect(proto._lerp(1, 2, 0.22)).toBe(1.22);
		expect(proto._lerp(1, 2, 0.35)).toBe(1.35);
		expect(proto._lerp(1, 2, 0.4)).toBe(1.4);
		expect(proto._lerp(1, 2, 0.62)).toBe(1.62);
	});
});
