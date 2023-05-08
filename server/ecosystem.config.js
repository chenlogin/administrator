/**
 * PM2 配置文件
 * yarn install
 * pm2 start ecosystem.config.js --env production
 * 或者 ./node_modules/pm2/bin/pm2 start app.js -i 0
 * pm2 restart saasmanager-server
 */
module.exports = {
  apps: [
    {
      name: 'saasmanager-server', // pm2 start App name
      script: 'app.js',
      autorestart: true, // auto restart if process crash
      watch: false, // files change automatic restart
      ignore_watch: ['node_modules', 'logs'], // ignore files change
      max_memory_restart: '300M', // restart if process use more than 300M memory，单位可以是 K、M、G
      merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
      output: './logs/access.log', // pm2 log file
      error: './logs/error.log', // pm2 error log file
      env_test: {
        // environment variable
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
