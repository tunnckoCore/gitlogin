/**
 * gitlogin <https://github.com/tunnckoCore/gitlogin>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var gitlogin = require('./index');

var opts = {
  //auth: 'username:password'
  username: 'your github username',
  password: 'your github pass',
  scopes: ['repo', 'gist'],
  note: 'My awesome cli login'
};
gitlogin(opts, function cb(err, res) {
  console.log('FROM CB:', err);
})
.catch(function name(err) {
  console.log('FROM CATCH:', err);
})
