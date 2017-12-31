# Dnode

[在找中文文档？点此查看。](./README.md)

Here is a website developed on base of Dnode project: [Dnode](http://www.veryplans.com)

Dnode is a simple boilerplate for scaffolding traditionally websties where most content is inserted into html webpages before they are send to end users -- being good in aspect of SEO (search engine optimization). And due to JS is a good friend of html, Dnode will be good at make websites whose most content is from crawler.

## Installation

Prerequisites: Node.js(>=4.x, 6.x preferred), npm version 3+ and [Git](https://git-scm.com/).

``` bash
$ git clone https://github.com/Yakima-Teng/dnode.git
$ cd dnode
$ npm install
$ npm run backend
$ npm run frontend
```

:warning: **The dev branch is not considered stable and can contain bugs or not available at all, so use at your own risk.**

By default, port 17070 will be used for backend development, and port 15050 will be used for frontend development. Frontend webpage will be opened automatically.

## What's Included

- `npm run dev`: Try to give you a good development experience.

  - Auto refresh while you changes your files.

  - Lint-on-save with ESLint.

- `npm run build`: Production ready build.

  - JavaScript minified.

  - HTML minified.

  - CSS minified.

  - Images minified.

- `npm run deploy`: Make deployment more convenient.

  - Rename config-example.js as 'config.js' and change content according to your ssh accout.

  - Whenever you want to deploy your files under dist folder to the server, just run command `npm run deploy`, and wait. That's all.

- `npm run buildAndDeploy`: A convenient command.

  - When you want to run `npm run build`, and run `npm run deploy` after completion of the former command, you can just run `npm run buildAndDeploy` instead. It's just a sugar command.

## License

[MIT](http://opensource.org/licenses/MIT)
