import InteractiveCursor from '../src';

describe('get parsed data from dataset', () => {
	it('can get data from dataset', () => {
		const obj = new InteractiveCursor({});
		const proto = Object.getPrototypeOf(obj);

		// Mock element
		const protoEl = {
			dataset: {
				strBoolFalse: 'false',
				strBoolTrue: 'true',
				boolFalse: false,
				boolTrue: true,
				customData: 'customData',
			},
		} as any;

		expect(proto._getData(protoEl, 'strBoolFalse')).toBe(false);
		expect(proto._getData(protoEl, 'strBoolTrue')).toBe(true);
		expect(proto._getData(protoEl, 'boolFalse')).toBe(false);
		expect(proto._getData(protoEl, 'boolTrue')).toBe(true);
		expect(proto._getData(protoEl, 'customData')).toBe('customData');
		expect(proto._getData(protoEl, 'unknown')).toBeNull();
	});
});
