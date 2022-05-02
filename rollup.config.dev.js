import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

module.exports = [
	{
		input: 'src/index.ts',
		output: {
			file: 'dev/dist/icursor.js',
			name: 'InteractiveCursor',
			format: 'umd',
		},
		plugins: [resolve(), typescript()],
	},
];
