import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './user/cutomer.module';
import { PrismaService } from 'src/prisma.service';
import { ProductModule } from './product/product.module';

@Module({
	imports: [AuthModule, CustomerModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
