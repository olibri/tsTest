import {Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {UserBalanceEntity} from './user-balance.entity';

@Entity('transaction')
export class TransactionEntity {
    @PrimaryGeneratedColumn('uuid') public id!: string;

    @Column({type: 'decimal', precision: 18, scale: 2})
    public amount: number;

    @ManyToOne(() => UserBalanceEntity, (userBalance) => userBalance.transactions)
    public userBalance!: UserBalanceEntity;

    constructor(userId: string, amount: number) {
        this.id = userId;
        this.amount = amount;
    }
}
