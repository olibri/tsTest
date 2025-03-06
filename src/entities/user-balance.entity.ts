import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {TransactionEntity} from './transaction.entity';

@Entity('user_balance')
export class UserBalanceEntity {
    @PrimaryGeneratedColumn('uuid') public id!: string;



    @Column({type: 'uuid'}) public userId: string;

    @Column({type: 'decimal', precision: 18, scale: 2, default: 0}) public amount: number;

    @OneToMany(() => TransactionEntity, (transaction) => transaction.userBalance) public transactions!: TransactionEntity[];

    constructor(userId: string, amount: number) {
        this.userId = userId;
        this.amount = amount;
    }

    deposit(amount: number) {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive.");
        }
        this.amount = Number(this.amount) + amount;
    }

    withdraw(amount: number) {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive.");
        }
        if (Number(this.amount) < amount) {
            throw new Error("Insufficient funds.");
        }
        this.amount = Number(this.amount) - amount;
    }

    updateBalance(amount: number) {
        if (amount <= 0) {
            throw new Error("Update balance must be positive.");
        }
        this.amount = amount;
    }
}