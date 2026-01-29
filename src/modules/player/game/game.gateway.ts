import { Logger } from '@nestjs/common';
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
  private readonly logger: Logger;
  constructor(private readonly gameService: GameService) {
    this.logger = new Logger('GameGateway');
  }

  public async handleConnection(client: any, ...args: any[]) {
    this.logger.log({ event: 'client connected', client });
  }

  public async handleDisconnect(client: any) {
    this.logger.log({ event: 'client disconnected', client });
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
  public async processPlayerAnswerEvent(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: UserAnswerDto,
  ) {}
}
