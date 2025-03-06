import { AppDataSource } from './data-source';
import { UserBalanceService } from './user-balance.service';
async function main() {
    await AppDataSource.initialize(); // Під’єднуємось до бази

    const userBalanceService = new UserBalanceService(AppDataSource);

    const created = await userBalanceService.createUserBalance('71bb0d0b-1234-aaaa-bbbb-8abfaabc1234', 500);
    console.log("Created user balance:", created);

    const afterDeposit = await userBalanceService.deposit('71bb0d0b-1234-aaaa-bbbb-8abfaabc1234', 100);
    console.log("Balance after deposit:", afterDeposit.amount);

    const afterWithdraw = await userBalanceService.withdraw('71bb0d0b-1234-aaaa-bbbb-8abfaabc1234', 50);
    console.log("Balance after withdraw:", afterWithdraw.amount);

    await AppDataSource.destroy();
}

main().catch((error) => console.error("starting error:", error));
