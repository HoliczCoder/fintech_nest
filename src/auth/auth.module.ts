import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerModule } from 'src/user/cutomer.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		CustomerModule,
		PassportModule,
		JwtModule.register({ secret: jwtConstants.secret, signOptions: { expiresIn: '60s' } })
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService]
})
export class AuthModule {}
