/**
 * gitlogin <https://github.com/tunnckoCore/gitlogin>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var gitlogin = require('./index');

gitlogin()
.then(console.log)
.catch(console.error)
