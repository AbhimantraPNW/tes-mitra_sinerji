import prisma from '@/prisma';

export const getCustomersService = async () => {
  try {
    const customer = await prisma.customer.findMany({
      include: { sales: true },
    });

    return { data: customer };
  } catch (error) {
    throw Error;
  }
};
