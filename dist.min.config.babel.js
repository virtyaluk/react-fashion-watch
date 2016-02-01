/**
 * ReactFashionWatch - a carefully crafted Fashion Watch component for React.
 * https://github.com/virtyaluk/react-fashion-watch
 *
 * Copyright (c) 2016 Bohdan Shtepan
 * http://modern-dev.com/
 *
 * Licensed under the MIT license.
 */

import cfg from './dist.config.babel';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

cfg.output.filename = 'react-fashion-watch.min.js';
cfg.plugins[0] = new ExtractTextPlugin('styles.min.css');

export default cfg;