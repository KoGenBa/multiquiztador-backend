import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserAnswerDto } from './dto';
import { GameService } from './game.service';

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly gameService: GameService) {}

  public async handleConnection(client: any, ...args: any[]) {
    console.log(client);
  }

  public async handleDisconnect(client: any) {
    
  }

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
