import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketModule } from '@common/services/websocket/websocket.module';
import { WebsocketGateway } from '@infra/gateways/websocket.gateway';

@Module({
  imports: [WebsocketModule],
  controllers: [AppController],
  providers: [AppService, WebsocketGateway],
})
export class AppModule {}
