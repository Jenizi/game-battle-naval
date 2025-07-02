import { Global, Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';

@Global()
@Module({
  imports: [],
  providers: [WebsocketService],
  exports: [WebsocketService],
})
export class WebsocketModule {}
