import fs from 'fs';
import path from 'path';
import glob from 'glob';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './base';

const cwd = process.cwd();
const src = path.resolve(cwd, 'src');
const demo = path.resolve(cwd, 'demo');

function getTodos() {
  const todos = {};
  const todoFile = path.join(cwd, 'TODO.md');
  const todoData = fs.readFileSync(todoFile, 'utf8');
  const todoPattern = /-\s+\[(.+?)\]\s+(\w+)/gi;
  let match = null;
  while ((match = todoPattern.exec(todoData))) {
    const done = match[1] === 'x';
    todos[match[2]] = done;
  }
  return todos;
}

function getIcons() {
  const icons = [];
  const iconfontPath = path.join(src, 'iconfont/iconfont.less');
  const iconfontData = fs.readFileSync(iconfontPath, 'utf8');
  const iconPattern = /.@{prefix}-icon-(.+?):{1,2}before/gi;
  let match = null;
  while ((match = iconPattern.exec(iconfontData))) {
    icons.push(match[1]);
  }
  return icons;
}

function getTesteds() {
  const testeds = {};
  const testFiles = glob.sync('**/__test__/*.test.tsx', { cwd: src });
  testFiles.forEach(file => {
    const name = file
      .replace(/components\/\w+\/__test__\//, '')
      .replace('.test.tsx', '');
    testeds[name] = true;
  });
  return testeds;
}

function getDemos() {
  const todos = getTodos();
  const testeds = getTesteds();
  const demoFiles = glob.sync('**/demo.tsx', { cwd: src });
  return demoFiles.map(file => {
    const name = file.replace(/(components\/|\/demo.tsx)/g, '');
    return { name, done: !!todos[name], tested: !!testeds[name] };
  });
}

export default webpackMerge(baseConfig, {
  mode: 'development',
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'classnames',
    ],
    index: path.resolve(demo, './index.tsx'),
  },
  output: {
    path: demo,
    publicPath: '',
    sourceMapFilename: 'sourcemaps/[file].map',
    pathinfo: true,
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    open: true,
    port: 36500,
    contentBase: demo,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEMOS__: JSON.stringify(getDemos()),
      __ICONS__: JSON.stringify(getIcons()),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(demo, './index.html'),
      chunks: ['vendor', 'index'],
    }),
  ],
  watchOptions: {
    ignored: [/node_modules/, /__test__/],
  },
});
