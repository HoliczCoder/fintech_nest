import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ROLE } from 'src/common/roleBase';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>('roles', [context.getHandler(), context.getClass()]);

		if (!requiredRoles || requiredRoles.length === 0) return true;

		const { session } = context.switchToHttp().getRequest<Request | any>();

		return requiredRoles.some((role: ROLE) => session.user.role.includes(role));
	}
}
