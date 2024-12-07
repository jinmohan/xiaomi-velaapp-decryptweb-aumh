const winston = require('winston');

// 创建一个带有时间戳的日志格式
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// 创建日志实例
const logger = winston.createLogger({
  level: 'info', // 默认日志等级
  format: winston.format.combine(
    winston.format.timestamp(), // 自动添加时间戳
    winston.format.colorize(), // 支持不同颜色的输出
    logFormat // 使用自定义格式
  ),
  transports: [
    // 控制台输出
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // 使日志输出带颜色
        winston.format.simple() // 简单格式
      )
    }),
    // 可以选择记录到文件，文件名称为 'app.log'
    new winston.transports.File({ filename: 'app.log' })
  ]
});

module.exports = logger;
