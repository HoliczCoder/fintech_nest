import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Customer, Prisma } from '@prisma/client';

export class CustomerService {
    constructor(private prisma: PrismaService) { }

    async findCustomer(customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput): Promise<Customer | null> {
        return this.prisma.customer.findUnique({
            where: customerWhereUniqueInput
        })
    }

}