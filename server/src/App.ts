import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationBoundedContext } from 'Authorization/Shared/Infrastructure/Nest/AuthorizationBoundedContext';
import { CryptoService } from 'Shared/Domain/Services/CryptoService';
import { MenuBoundedContext } from './Menu/Shared/Infrastructure/Nest/MenuBoundedContext';
import { SharedModule } from 'Shared/Infrastructure/Nest/SharedModule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    AuthorizationBoundedContext,
    MenuBoundedContext,
  ],
  controllers: [],
  providers: [CryptoService],
  exports: [CqrsModule, CryptoService],
})
export default class App {}
