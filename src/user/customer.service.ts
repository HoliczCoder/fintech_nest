import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Customer, Prisma } from '@prisma/client';

@Injectable()
export class CustomerService {
	constructor(private prisma: PrismaService) {}

	async findCustomer(customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput): Promise<Customer | null> {
		const result = await this.prisma.customer.findUnique({
			where: customerWhereUniqueInput
		});
		return result;
	}
}
