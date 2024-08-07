import prisma from '@/prisma';
import { Customer } from '@prisma/client';

interface CreateCustomerBody extends Omit<Customer, 'id'> {
  kode: string;
  name: string;
  telp: string;
}

export const createCustomerService = async (body: CreateCustomerBody) => {
  try {
    const customer = await prisma.customer.findFirst({
      where: { kode: body.kode },
    });

    if (customer) {
      throw new Error('Customer sudah memiliki data');
    }

    const createCustomer = await prisma.customer.create({
      data: { ...body },
    });

    return { message: 'Create customer sukses', data: createCustomer };
  } catch (error) {
    throw error;
  }
};
