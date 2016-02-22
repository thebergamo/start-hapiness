Start Hapiness
===

[![Build Status](https://travis-ci.org/thebergamo/start-hapiness.svg)](https://travis-ci.org/thebergamo/start-hapiness)
[![Coverage Status](https://coveralls.io/repos/thebergamo/start-hapiness/badge.svg?branch=master&service=github)](https://coveralls.io/github/thebergamo/start-hapiness?branch=master)

### Getting Started
This project is a boilerplate to help you develop your project with Hapi.js and MongoDB.

#### Project Structure
In root, we have the directories: `scripts`, `src`, `test`. 

* **scripts** are responsibles for the bash scripts, like: `bootstrap`, `setup`, `server`, `test` and `update`. You can read more about these scripts in [github/scripts-to-rule-them-all][scripts].
* **src** is the main directory of the source code, all files and directories in that directory are distributed by responsabilites.
    * **core** is where all plugins and important files to the bootstrap of the system. 
    * **shared** here, are the entities shared in the system, like `user`. Common entities in the application need be here, isolated too.
    * **todos** if you have other specific entities, you can create a new directory, `todos` is that case. When a new scope is created you create a new directory for that scope and it will be loaded automatically in the bootstrap application. 
* **test** the tests of applications. we have inside this directory a directory named `routes` where all  exposed routes are tested.

#### Scopes and Entities
Inside the directory `src`you will create a new directory when a new **scope** is requested, like `todos`. Inside that directory, will have an `index.js` in root of the scope directory, and some directories as **entities**.

**Scopes** have **entities** and your application have many scopes. A **scope** are pieces of your application, in a case like a ecommerce, a common scope will be **products**. And in the scope products we'll have **entities** like **product** and **category**.
Inside **entity** we can have new endpoint exported like Hapi plugins in the file `scope/entity/route.js`. You can declare the models and all of your logic in that file. But the recomended is structuring that like **MVC**.

You'll have the files: `model.js`, `routes.js`, `validation.js`, `controller.js`.
* `model.js` will have you model declaration.
* `validation.js` wil have your schema of parameters for every route in your routes.
* `controller.js` will be your controller, a Class that have yours methods for response the router endpoints.
* `routes.js` will be an Hapi.js plugins exported your routes.

Finally, in your `scope/index.js` will get all of your `routes.js` files in your **entities** directories.

For more examples about the code, explore the source in this repository.

### Testing

For testing you just need clone this repo and run `npm test` inside root folder of this project.; 

### Contribute

To contribute you can try to find an [issue or enchancment][issues] and try to
implement it. Fork the project, implement the code, make tests, add yourself
to the [contributors][contrib] list and send the PR to the master branch.

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

[issues]: https://github.com/thebergamo/start-hapiness/issues?q=is%3Aopen+is%3Aenchancement+is%3Abug
[contrib]: contributors.md
[scripts]: https://github.com/github/scripts-to-rule-them-all

