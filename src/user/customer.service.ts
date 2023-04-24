import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Customer, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
	constructor(private prisma: PrismaService) {}

	async findCustomer(customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput): Promise<Customer | null> {
		const result = await this.prisma.customer.findUnique({
			where: customerWhereUniqueInput
		});
		return result;
	}

	async createCustomer(email: string, full_name: string, password: string) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		return await this.prisma.customer.create({
			data: {
				full_name: full_name,
				email: email,
				password: hash,
				group_id: 1,
				status: 1
			}
		});
	}
}
