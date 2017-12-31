const config = {
  appName: 'travel',
  // mysql数据库账号
  mysql: {
    host: '111.22.33.44',
    port: 3306,
    user: 'username',
    password: 'password',
    database: 'databasename'
  },
  // 转发请求到其他服务的映射关系
  proxyTable: {
    '/api': { target: 'http://www.example.com', changeOrigin: true }
  }
}

module.exports = config;
