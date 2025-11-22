import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserAnswerDto } from './dto';
import { GameService } from './game.service';

@WebSocketGateway()
export class GameGateway {
  constructor(private readonly gameService: GameService) {}

  @SubscribeMessage('player.join')
  public async processPlayerJoinEvent(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: UserAnswerDto,
  ) {
    
  }

  @SubscribeMessage('player.leave')
  public async processPlayerLeaveEvent() {}

  @SubscribeMessage('player.answer')
  public async processPlayerAnswerEvent() {}
}
