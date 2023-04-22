import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Module({
	providers: [PrismaService, CustomerService],
	exports: [CustomerService]
})
export class CustomerModule {}
