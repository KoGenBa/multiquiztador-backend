import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class GameGateway {
  constructor() {}

  @SubscribeMessage('player.join')
  public async processPlayerJoinEvent() {}

  @SubscribeMessage('player.leave')
  public async processPlayerLeaveEvent() {}
}
