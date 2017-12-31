# Dnode

[Looking for English documentation? Please click here.](./README_EN.md)

使用该脚手架搭建的房价爬虫网站: [Dnode demo](http://www.veryplans.com)

Dnode是一个简单易上手的网站（node服务端渲染）脚手架，通过它，你可以方便地在服务器端进行html内容的填充，然后再返回给用户，对需要SEO的网站来说是很便利的，并且由于JS天生和html关系比较亲密，所以这个脚手架也适合写一些针对网站html的爬虫。


## 安装

前提条件: Node.js(>=4.x, 6.x更好)、npm 3+、[Git](https://git-scm.com/)。

``` bash
$ git clone https://github.com/Yakima-Teng/dnode.git
$ cd dnode
$ npm install
# 开启node服务
$ npm run backend
# 开启前端页面开发环境
$ npm run frontend
```

网站node服务默认会使用17070端口，前端开发环境默认会使用15050端口，前端开发环境启动成功后会自动打开您的浏览器访问前端页面。


## 包含的命令

- `npm run frontend`: 本地开发时使用，会带来相当不错的开发体验。

  - 当您更改文件内容时会自动刷新页面，无需您手动F5或command+R。

  - 保存文件时会自动使用ESLint检测代码风格，尽量避免一些简单的代码风格混乱导致的bug。

- `npm run build`: 与本地开发不同，该命令产生的文件是用于发布到服务器上的。

  - 压缩JavaScript。

  - 压缩HTML文件.

  - 压缩CSS文件.

  - 压缩Images.

- `npm run deploy`: 让发布变得更简单。

  - 将config-example.js文件重命名为“config.js”，并根据您的SSH账号进行相应的修改。

  - 当你想要通过FTP/SFTP工具上传文件到服务器上时，你可以直接敲一个“npm run deploy”命令，然后去泡杯咖啡。

- `npm run buildAndDeploy`: 一个命令糖。

  - 当你想要先执行`npm run build`，然后等前面这个命令执行结束后再执行`npm run deploy`的时候， 你可以直接用一个`npm run buildAndDeploy`命令替代。它们的作用效果是一样的，后者可以让你不用一直呆在屏幕面前傻等。

## 许可协议

[MIT](http://opensource.org/licenses/MIT)
