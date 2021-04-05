import path from 'path';
import { Service } from 'typedi';
import {
  createLogger,
  format,
  transports,
  addColors,
  Logger as WinstonLogger,
} from 'winston';

const LOG_DIR = path.resolve(__dirname, '../logs');

const INFO_LOG = 'info-msg.log';
const DATA_LOG = 'data-msg.log';
const WARN_LOG = 'warn-msg.log';
const ERROR_LOG = 'error-msg.log';

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    custom: 5,
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'cyan',
    info: 'green',
    custom: 'yellow',
  },
};

addColors(config.colors);

export enum LOG_TYPE {
  INFO = 'info',
  DATA = 'data',
  ERROR = 'error',
  WARN = 'warn',
}

const loggerCreator = () => {
  const logger = createLogger({
    level: 'custom',
    levels: config.levels,

    format: format.combine(
      format.label({ label: '[GraphQL-Explorer-Server]' }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: 'GraphQL-Explorer-Service' },
    transports: [
      new transports.File({
        dirname: LOG_DIR,
        filename: INFO_LOG,
        level: 'info',
      }),
      new transports.File({
        dirname: LOG_DIR,
        filename: DATA_LOG,
        level: 'data',
      }),
      new transports.File({
        dirname: LOG_DIR,
        filename: WARN_LOG,
        level: 'warn',
      }),
      new transports.File({
        dirname: LOG_DIR,
        filename: ERROR_LOG,
        level: 'error',
      }),
    ],
  });

  // only log in console in development
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new transports.Console({
        format: format.combine(format.colorize({ all: true }), format.simple()),
      })
    );
  }

  return logger;
};

@Service()
export class Logger {
  logger: WinstonLogger;

  constructor() {
    this.logger = loggerCreator();
  }

  public log(type: LOG_TYPE, message?: string) {
    this.logger[type](message);
  }
}
