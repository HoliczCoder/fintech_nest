import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerModule } from 'src/user/cutomer.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
	imports: [CustomerModule, PassportModule],
	providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
