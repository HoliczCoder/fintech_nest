import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
	providers: [CustomerService],
	exports: [CustomerService],
	imports: [PrismaModule],
	controllers: [CustomerController]
})
export class CustomerModule {}
