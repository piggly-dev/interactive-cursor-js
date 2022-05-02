import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

module.exports = [
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/icursor.js',
			name: 'InteractiveCursor',
			format: 'umd',
		},
		plugins: [resolve(), typescript()],
	},
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/icursor.min.js',
			name: 'InteractiveCursor',
			format: 'umd',
		},
		plugins: [resolve(), typescript(), uglify()],
	},
];
