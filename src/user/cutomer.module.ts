import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
	providers: [PrismaService, CustomerService],
	exports: [CustomerService],
	controllers: [CustomerController]
})
export class CustomerModule {}
