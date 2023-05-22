import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import cookieParser = require('cookie-parser');
import session = require('express-session');
import * as mysqlSession from 'express-mysql-session';
const MySQLStore = mysqlSession(session);

const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '123456',
	database: 'ecommerce'
};

const sessionStore = new MySQLStore(options);

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(
		session({
			resave: false,
			saveUninitialized: false,
			name: 'session',
			secret: 'minh123',
			cookie: {
				secure: false
			},
			store: sessionStore
		})
	);
	app.enableCors();
	app.use(cookieParser());
	app.setGlobalPrefix('/api/v1');
	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);
	await app.listen(5000);
}
bootstrap();
