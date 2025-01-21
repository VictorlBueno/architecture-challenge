import { Module } from '@nestjs/common';
import { ClientModule } from './infrastructure/modules/client.module';
import {PrismaService} from "@/infrastructure/shared/database/prisma/prisma.service";
import {ProductModule} from "@/infrastructure/modules/product.module";
import {OrderModule} from "@/infrastructure/modules/order.module";
import {DatabaseModule} from "@/infrastructure/modules/database.module";
import {PaymockModule} from "@/infrastructure/modules/paymock.module";

@Module({
  imports: [ClientModule, ProductModule, OrderModule, DatabaseModule, PaymockModule],
  providers: [PrismaService],
})

export class AppModule {}
