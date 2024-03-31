// src/utils/logger.ts
import winston from 'winston'

// Define your custom settings for each transport
const options: winston.LoggerOptions = {
  level: 'info', // Minimum level of messages to log
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    // File transport
    new winston.transports.File({
      filename: 'combined.log',
      dirname: 'logs', // Specify your logs directory
    }),
  ],
}

// Create a Winston logger that streams to different outputs based on the defined options
const logger = winston.createLogger(options)

export default logger
