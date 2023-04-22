import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AppService } from './app.service';
import { log } from 'console';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@UseGuards(AuthGuard('local'))
	@Post('auth/login')
	async login(@Req() request: Request) {
		console.log('====================================');
		console.log(request);
		console.log('====================================');
		return request.user;
	}
}
