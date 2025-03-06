import { DataSource, Repository } from 'typeorm';
import { UserBalanceEntity } from './entities/user-balance.entity';


export class UserBalanceService {
    private userBalanceRepository :Repository<UserBalanceEntity>;

    constructor(private dataSource: DataSource) {
        this.userBalanceRepository = this.dataSource.getRepository(UserBalanceEntity);
    }

    public async createUserBalance(userId: string, initialAmount: number) {
        let newBalance = new UserBalanceEntity(userId, initialAmount);
        return await this.userBalanceRepository.save(newBalance);
    }

    public async deposit(userId: string, amount: number) {
        let userBalance = await this.userBalanceRepository.findOneBy({ userId });
        if (!userBalance) {
            throw new Error(`User balance not found for userId: ${userId}`);
        }
        userBalance.deposit(amount);
        return await this.userBalanceRepository.save(userBalance);
    }

    public async withdraw(userId: string, amount: number): Promise<UserBalanceEntity> {
        const userBalance = await this.userBalanceRepository.findOneBy({ userId });
        if (!userBalance) {
            throw new Error(`User balance not found for userId: ${userId}`);
        }
        userBalance.withdraw(amount);
        return await this.userBalanceRepository.save(userBalance);
    }

    public async getBalance(userId: string): Promise<UserBalanceEntity | null> {
        return await this.userBalanceRepository.findOneBy({ userId });
    }
}