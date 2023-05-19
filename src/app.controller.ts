import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private authService: AuthService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Req() request: Request) {
		return this.authService.login(request.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Req() request: Request) {
		return request.user;
	}
}
