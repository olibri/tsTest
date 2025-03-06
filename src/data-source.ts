import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserBalanceEntity } from './entities/user-balance.entity';
import {TransactionEntity} from "./entities/transaction.entity";


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    logging: false,
    entities: [UserBalanceEntity, TransactionEntity],
});

