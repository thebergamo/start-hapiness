Start Hapiness
===

## Goal
The main idea for this project is help you to start a new Hapi + MongoDB project. In this case is a simplest boilerplate project using this tools + Promises =D

## Batteries
- **Hapi** - Web framework
- **MongoDB** - NoSQL Database
- **Bluebird** - Promises and more
- **Lab** - BDD and Code Coverage framework
- **Chai** - Assertion library

## TODO
- [ ] Add Auth + jwt
- [ ] Add support for others databases
- [ ] Add support for loggers
- [ ] Add support for packaging and deploy
- [x] Add Azkfile.js

## Run this Project
To run this project you need have installed 
- **Node.js** (latest version)
- **MongoDB** 3.0.6

And then just run:
```sh
npm run build && npm start
```

If you want to run tests just run:
```sh
npm test
```

To reply this project for your own new project:
```
npm run duplicate NAME
```
NOTE: All models, routes, validators, controllers, tests and LICENCE will be removed. Only the bootstrap files will be stay. Git project too.

## Run this Project Azk version
Running this project using [azk][0]. Azk will just run this project in a Docker container, by this no one depencies are required, because all dependencies will be installed in the container.

Azk documentation for installing is found [here][1];

To run the project in Azk version:
```sh
azk start 
```

If you want to run tests just run:
```sh
azk shell -c "npm test"
```

NOTE: For duplicating this project you can just run the command above, because if you run in Azk, the project will just copied in container, not in host. No depencies are required for run the duplicate command, just a terminal.
 
### Contribute

To contribute you can try to find an [issue or enchancment][2] and try to
implement it. Fork the project, implement the code, make tests, add yourself
to the [contributors][3] list and send the PR to the master branch.

### Testing

For testing you just need run `npm run build` after `npm test` inside root folder of this project. All depencies is installed in `npm run build`; 

### License

Copyright (c) 2015, Marcos Bérgamo <marcos@thedon.com.br>

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.

[0]: http://www.azk.io
[1]: http://docs.azk.io
[2]: https://github.com/thebergamo/start-hapiness/issues?q=is%3Aopen+is%3Aenchancement+is%3Abug
[3]: contributors.md
