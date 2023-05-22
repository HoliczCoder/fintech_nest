import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './user/cutomer.module';

@Module({
	imports: [AuthModule, ProductModule, CustomerModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
