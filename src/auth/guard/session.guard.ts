import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SessionGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const isPublicRoute = this.reflector.getAllAndOverride('isPublic', [context.getHandler(), context.getClass()]);

		if (isPublicRoute) return true;

		const request = context.switchToHttp().getRequest<Request | any>();
		if (request.session?.user?.uuid) {
			// asign user to request
			request.user = request.session.user;
			return true;
		}
		throw new UnauthorizedException('Session not provided');
	}
}
