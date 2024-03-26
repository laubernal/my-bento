import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationBoundedContext } from 'Authorization/Shared/Infrastructure/Nest/AuthorizationBoundedContext';
import { CryptoService } from 'Shared/Domain/Services/CryptoService';

@Module({
  imports: [CqrsModule, ConfigModule.forRoot({ isGlobal: true }), AuthorizationBoundedContext],
  controllers: [],
  providers: [CryptoService],
  exports: [CqrsModule, CryptoService],
})
export default class App {}
