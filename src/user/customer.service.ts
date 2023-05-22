import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Customer, User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ROLE } from 'src/common/roleBase';

@Injectable()
export class CustomerService {
	constructor(private prisma: PrismaService) {}

	async findCustomer(customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput): Promise<Customer | null> {
		const result = await this.prisma.customer.findUnique({
			where: customerWhereUniqueInput
		});
		return result;
	}

	// testing role base
	async findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
		const result = await this.prisma.user.findUnique({
			where: userWhereUniqueInput
		});
		return result;
	}

	async createCustomer(email: string, full_name: string, password: string) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		try {
			return await this.prisma.customer.create({
				data: {
					full_name: full_name,
					email: email,
					password: hash,
					group_id: 1,
					status: 1
				}
			});
		} catch (error: any) {
			throw new InternalServerErrorException('Server error', {
				cause: new Error(),
				description: error
			});
		}
	}

	// testing role base
	async createUser(email: string, full_name: string, password: string) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		try {
			return await this.prisma.user.create({
				data: {
					full_name: full_name,
					email: email,
					password: hash,
					role: ROLE.USER
				}
			});
		} catch (error: any) {
			throw new InternalServerErrorException('Server error', {
				cause: new Error(),
				description: error
			});
		}
	}
}
