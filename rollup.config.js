import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import url from '@rollup/plugin-url';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy2';

export default {
  input: 'src/index.js',
  output: {
    dir: 'public',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    image(),
    url(),
    terser(),
    copy({
      assets: [['index.html', 'index.html']],
    }),
  ],
};
