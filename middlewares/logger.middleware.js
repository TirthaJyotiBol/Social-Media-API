import winston from "winston";

    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
          new winston.transports.File({ filename: 'combined.log' }),
        ],
      });


export default function WinstonloggerMiddleware(req,res,next){
    let data = `/n URL: ${req.url} - ${JSON.stringify(req.body)}`;
    logger.info(data);
    next();
}