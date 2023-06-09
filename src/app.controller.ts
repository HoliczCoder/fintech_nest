import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AppService } from './app.service';
import { log } from 'console';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

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
		console.log(request.user);
		return this.authService.login(request.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Req() request: Request) {
		return request.user;
	}
}
