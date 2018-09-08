// import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';
import commonjs from 'rollup-plugin-commonjs';
// import less from 'rollup-plugin-less'; // less 文件，没有样式可删除

export default {
  entry: 'src/index.js', // String，入口文件路径
  dest: 'dist/index.js', // String，输出的打包文件
  format: 'cjs', // String，输出类型 (amd, cjs, es, iife, umd)
  external: ['react', 'prop-types'], // Array，不需要打包的文件
  sourceMap: true, // Boolean，是否要支持 sourcemap
  plugins: [
    resolve(),
    eslint({
      include: ['src/**/*.js'], // 需要检查的部分
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify(),
    // less({
    //   include: ['src/**/*.less', 'src/**/*.css'],
    //   output: 'dist/index.css',
    // }),
    commonjs({
      include: 'node_modules/**',
      exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],
      extensions: [ '.js', '.coffee' ],
      ignoreGlobal: false,
      sourceMap: false,
      namedExports: { './module.js': ['foo', 'bar' ] },
      ignore: [ 'conditional-runtime-dependency' ]
    })
  ]
};
