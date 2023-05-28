import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.Console({
            level: 'silly',
            format: format.combine(
                format.colorize(),
                format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
            )
        }),
        new transports.File({ level: 'silly', filename: './logs/sys.log' })
    ]
});

export default logger;
