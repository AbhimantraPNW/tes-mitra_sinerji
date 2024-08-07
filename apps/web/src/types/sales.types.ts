import { Customer } from "./customer.types";
import { SalesDet } from "./sales-det.types";

export interface Sales {
    id: number;
    kode_transaksi: string;
    tgl: Date;
    subtotal: number;
    diskon: number;
    ongkir: number;
    total_bayar: number;
    updateAt?: Date;
    deletedAt?: Date;
    
    cust: Customer
    sales_detail: SalesDet[]
}

export interface IFormTx{
    kode_transaksi: string;
    tgl: string;
    subtotal: string;
    diskon: string;
    ongkir: string;
    total_bayar: string;

    cust: Customer
    sales_detail: SalesDet[]
}

