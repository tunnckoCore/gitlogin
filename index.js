/**
 * gitlogin <https://github.com/tunnckoCore/gitlogin>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var prompt = require('prompt-promise');
var got = require('then-got');

var now = Date.now();
var defaults = {
  scopes: ['repo'],
  note: 'gitlogin - Modern, simplified Github login, CLI and API - ' + now,
  endpoint: 'https://api.github.com/authorizations'
};

/**
 * Generating personal access token
 *
 * @name   gitLogin
 * @param  {Object}   `options`
 * @param  {Function} `callback`
 * @return {Promise}
 * @api public
 */
module.exports = function gitLogin(options, callback) {
  if (typeof options === 'function') {
    var cb = options;
    var o = callback;
    options = o;
    callback = cb;
  }

  options = options || {};

  if (options.username && options.password) {
    options.auth = options.username + ':' + options.password;
  }

  options.body = {
    scopes: options.scopes && mapScopes(options.scopes) || defaults.scopes,
    note: options.note || defaults.note
  };
  options.headers = options.headers || {};
  options.headers['User-Agent'] = 'https://github.com/tunnckoCore/gitlogin';
  options.headers['Content-Type'] = 'application/json';

  if (!options.auth) {
    return handleNoAuth(options, callback);
  }

  var promise = sendRequest(options);
  if (callback) {
    promise = handleCallback(promise, callback);
  }

  return promise;
};

/**
 * Handling the callback if defined
 *
 * @param  {Promise}   `promise`
 * @param  {Function}  `callback`
 * @return {Promise}
 * @api private
 */
function handleCallback(promise, callback) {
  promise.then(function responseFulfilled(res) {
    callback(null, res);
  })
  promise.catch(function responseRejected(err) {
    callback(err);
  });
  return promise;
}

/**
 * Sending the request
 *
 * @param  {Object}   `opts`
 * @param  {Function} `done`
 * @return {Promise}
 * @api private
 */
function sendRequest(opts, done) {
  opts.auth = new Buffer(opts.auth).toString('base64');
  opts.body = JSON.stringify(opts.body);
  opts.headers['Content-Length'] = opts.body.length;
  opts.headers.Authorization = 'Basic ' + opts.auth;

  // if comes from prompts we must end the stdin
  if (done) {
    done();
  }

  delete opts.auth;
  return got(defaults.endpoint, opts)
}

/**
 * Handling when dont have `options.auth`,
 * `options.username` and `options.password`,
 * then runs command prompts
 *
 * @param  {Object}   `options`
 * @param  {Function} `callback`
 * @return {Promise}
 */
function handleNoAuth(options, callback) {
  var opts = {};
  opts.body = options.body;
  opts.headers = options.headers;

  return prompt('username: ')
  .then(function usernameFulfilled(username) {
    return prompt.password('password: ')
    .then(function passwordFulfilled(password) {
      return prompt('scopes: ')
      .then(function scopesFulfilled(scopes) {
        return prompt('note: ')
        .then(function noteFulfilled(note) {
          username = username || options.username;
          password = password || options.password;
          opts.auth = username + ':' + password;

          opts.body.note = note ? note.trim() : opts.body.note;

          scopes = scopes || opts.body.scopes.join(',');
          scopes = scopes.split(',');

          scopes = mapScopes(scopes);

          opts.body.scopes = scopes;

          var promise = sendRequest(opts, prompt.done);
          if (callback) {
            promise = handleCallback(promise, callback);
          }

          return promise;
        });
      });
    });
  });
}

function mapScopes(scopes) {
  return scopes.map(function mapScopes(scope) {
    return scope.trim();
  });
}
