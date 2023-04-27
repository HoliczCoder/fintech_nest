import { Controller, Post, Body, ValidationPipe, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Request } from 'express';

@Controller('api/auth')
export class AuhtController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('/login')
	signIn(@Req() request: Request) {
		console.log(request.user);
		return this.authService.login(request.user);
	}
}
