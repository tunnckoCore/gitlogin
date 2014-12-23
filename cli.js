#!/usr/bin/env node
/**
 * gitlogin <https://github.com/tunnckoCore/gitlogin>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var gitlogin = require('./index');
var meow = require('meow');

var cli = meow({
  help: [
    'Options',
    '  --help                   Show this help',
    '  --version                Current version of package',
    '  -u | --username          Your Github username, required',
    '  -p | --password          Your Github password, required',
    '  -s | --scopes            Scopes for github, not required',
    '  -n | --note              Note for the app, not required',
    '  -t | --token-only        If you want to show only token',
    '  -j | --json         Output full JSON.stringified response',
    '',
    'Usage',
    '  gitlogin <username> <password> [scopes] [note]',
    '  gitlogin -p <password> -n [note] -u <username> -s [scopes]',
    '',
    'Examples',
    '  gitlogin tunnckoCore myPassword \'repo, gist, delete_repo\' \'some note for app\'',
    '  gitlogin tunnckoCore myPassword repo,gist,delete_repo \'some note for app\'',
    '  gitlogin tunnckoCore myPassword \'\' \'\' true false',
    '  gitlogin --username tunnckoCore --password myPassword',
    '  gitlogin --scopes repo,gist,delete_repo -u tunnckoCore -n myAwesomeApp -p myPassword',
    '  gitlogin -u tunnckoCore -p myPassword',
    ''
  ].join('\n')
});

var username  = cli.input[0] || cli.flags.u || cli.flags.username;
var password  = cli.input[1] || cli.flags.p || cli.flags.password;
var scopes    = cli.input[2] || cli.flags.s || cli.flags.scopes;
var note      = cli.input[3] || cli.flags.n || cli.flags.note;
var tokenOnly = cli.input[4] || cli.flags.t || cli.flags.tokenOnly;
var jsonOnly  = cli.input[5] || cli.flags.j || cli.flags.json;

tokenOnly = !tokenOnly || tokenOnly === 'false' ? false : true;
jsonOnly = !jsonOnly || jsonOnly === 'false' ? false : true;

if (!username || !password) {
  console.log('username and password is required');
  process.exit(1);
}


var opts = {
  username: username,
  password: password,
  scopes: scopes && scopes.split(','),
  note: note
};

gitlogin(opts)
.then(function gitloginFulfilled(res) {
  var json = JSON.parse(res);

  if (jsonOnly) {
    process.stdout.write(JSON.stringify(json, null, 2) + '\n');
    return;
  }
  if (tokenOnly) {
    process.stdout.write(json.token + '\n')
    return;
  }

  var str = [
    'Hi, ' + username + '! You\'ve successfully authenticated!',
    'Your personal access token is ' + json.token + '\n'
  ].join('\n');

  process.stdout.write(str);
})
.catch(function gitloginRejected(err) {
  console.log(err);
})
