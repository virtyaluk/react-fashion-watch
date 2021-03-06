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

cfg.entry = './src/example.jsx';
cfg.output = { publicPath: 'http://localhost:8080/assets' };
cfg.externals = null;

export default cfg;