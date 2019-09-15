const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');

// The client directory
const client = './clients/' + process.env.CLIENT;

module.exports = {
  input: client + '/src/js/main.js',
  output: {
    file: client + '/dist/js/bundle.js',
    format: 'iife',
    globals: { ethers: 'ethers' }
  },
  plugins: [
		resolve({
      browser: true,
    }),
    commonjs(),
		babel({
			exclude: 'node_modules/**' // only transpile our source code
		})
  ],
  external: ['ethers']
};