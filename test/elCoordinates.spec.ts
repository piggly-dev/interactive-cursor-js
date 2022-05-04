import InteractiveCursor from '../src';

describe('element coordinates', () => {
	it('can calculate the element coordinates', () => {
		const obj = new InteractiveCursor({});
		const proto = Object.getPrototypeOf(obj);
		const threshold = 50;

		// Mock element
		const protoEl = {
			getBoundingClientRect: () => {
				return {
					bottom: 100,
					height: 50,
					left: 50,
					right: 150,
					top: 50,
					width: 100,
					x: 50,
					y: 50,
				};
			},
		} as any;

		const coordinates = proto._elCoordinates(protoEl, threshold);

		expect(typeof coordinates).toBe('object');
		expect(coordinates.center).toStrictEqual({
			x: 100,
			y: 75,
		});
		expect(coordinates.bounding).toStrictEqual({
			x1: 0,
			x2: 200,
			y1: 0,
			y2: 150,
		});
	});
});
