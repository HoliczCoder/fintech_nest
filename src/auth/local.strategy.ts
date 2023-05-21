import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super();
	}

	// async validate(username: string, password: string): Promise<any> {
	// 	const customer = await this.authService.validateCustomer(username, password);
	// 	if (!customer) {
	// 		throw new UnauthorizedException();
	// 	}
	// 	return customer;
	// }

	// testing rolebase
	async validate(username: string, password: string): Promise<any> {
		const user = await this.authService.validateUser(username, password);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
