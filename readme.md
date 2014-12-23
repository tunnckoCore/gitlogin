## [![npm versi][npmjs-img]][npmjs-url] [![mit license][license-img]][license-url] [![build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![deps status][daviddm-img]][daviddm-url]

> Modern, simplified Github login, CLI and API - generating personal access token. Support promises and node-style callbacks.

## Install
```bash
npm install gitlogin
npm test
gitlogin --help
```


## Usage
> For more use-cases see the [tests](./test.js). You can run `node example.js` to try it.

```js
var gitlogin = require('gitlogin');

var opts = {
  //auth: 'username:password'
  username: 'your github username',
  password: 'your github pass',
  scopes: ['repo', 'gist'],
  note: 'My awesome cli login'
};

// callback-style
gitlogin(opts, function cb(err, res) {
  console.log('FROM CB:', err, res);
})

// or promise-style
gitlogin(opts)
.then(console.log)
.catch(console.error)

// or hybrid
gitlogin(opts, function cb(err, res) {
  console.log('FROM CB:', err, res);
})
.then(console.log)
.catch(console.error)
```


## API


## CLI
```bash
$ gitlogin --help

  Modern, simplified Github login, CLI and API - generating personal access token. Support promises and node-style callbacks.

  Options
    --help                   Show this help
    --version                Current version of package
    -u | --username          Your Github username, required
    -p | --password          Your Github password, required
    -s | --scopes            Scopes for github, not required
    -n | --note              Note for the app, not required
    -t | --token-only        If you want to show only token
    -j | --json         Output full JSON.stringified response

  Usage
    gitlogin <username> <password> [scopes] [note]
    gitlogin -p <password> -n [note] -u <username> -s [scopes]

  Examples
    gitlogin tunnckoCore myPassword 'repo, gist, delete_repo' 'some note for app'
    gitlogin tunnckoCore myPassword repo,gist,delete_repo 'some note for app'
    gitlogin tunnckoCore myPassword '' '' true false
    gitlogin --username tunnckoCore --password myPassword
    gitlogin --scopes repo,gist,delete_repo -u tunnckoCore -n myAwesomeApp -p myPassword
    gitlogin -u tunnckoCore -p myPassword
```


## Author
**Charlike Mike Reagent**
+ [gratipay/tunnckoCore][author-gratipay]
+ [twitter/tunnckoCore][author-twitter]
+ [github/tunnckoCore][author-github]
+ [npmjs/tunnckoCore][author-npmjs]
+ [more ...][contrib-more]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2014 [Charlike Mike Reagent][contrib-more], [contributors][contrib-graf].  
Released under the [`MIT`][license-url] license.


[npmjs-url]: http://npm.im/gitlogin
[npmjs-img]: https://img.shields.io/npm/v/gitlogin.svg?style=flat&label=gitlogin

[coveralls-url]: https://coveralls.io/r/tunnckoCore/gitlogin?branch=master
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/gitlogin.svg?style=flat

[license-url]: https://github.com/tunnckoCore/gitlogin/blob/master/license.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

[travis-url]: https://travis-ci.org/tunnckoCore/gitlogin
[travis-img]: https://img.shields.io/travis/tunnckoCore/gitlogin.svg?style=flat

[daviddm-url]: https://david-dm.org/tunnckoCore/gitlogin
[daviddm-img]: https://img.shields.io/david/tunnckoCore/gitlogin.svg?style=flat

[author-gratipay]: https://gratipay.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-npmjs]: https://npmjs.org/~tunnckocore

[contrib-more]: http://j.mp/1stW47C
[contrib-graf]: https://github.com/tunnckoCore/gitlogin/graphs/contributors

***

_Powered and automated by [readdirp + hogan.js](https://github.com/tunnckoCore), December 24, 2014_