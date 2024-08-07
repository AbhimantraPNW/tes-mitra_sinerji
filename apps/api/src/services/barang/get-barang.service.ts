import prisma from "@/prisma"

export const getBarangService = async (id: number) => {
    try {
        const barang = await prisma.barang.findFirst({
            where : {id}
        })

        if (!barang) {
            throw new Error('Barang yg dicari tidak ada')
        }

        return barang
    } catch (error) {
        throw error
    }
}