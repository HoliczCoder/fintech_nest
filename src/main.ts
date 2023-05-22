import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import cookieParser = require('cookie-parser');
import session = require('express-session');

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
			}
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
