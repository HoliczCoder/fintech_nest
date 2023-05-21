import { Controller, Get, Post, Req, UseGuards, Session, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AppService } from './app.service';
import { log } from 'console';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SessionData } from 'express-session';

interface CustomSessionData extends SessionData {
	user: any;
}

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private authService: AuthService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	// @UseGuards(LocalAuthGuard)
	// @Post('auth/login')
	// async login(@Req() request: Request) {
	// 	console.log(request.user);
	// 	return this.authService.login(request.user);
	// }

	// tesing role base
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async createSessionAfterLogin(@Req() request: Request | any, @Session() session: CustomSessionData) {
		session.user = {
			userId: request.user.email,
			username: request.user.full_name,
			uuid: request.user.uuid,
			role: request.user.role
		};
		return {
			status: HttpStatus.OK
		};
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Req() request: Request) {
		return request.user;
	}
}
