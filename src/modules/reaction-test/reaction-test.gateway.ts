import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ReactionTestService } from './reaction-test.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ path: '/ws', cors: { origin: '*' } })
export class ReactionTestGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private globalBest: { time: number; name: string } = {
    time: Infinity,
    name: '',
  };

  constructor(private readonly reactionTestService: ReactionTestService) {}

  handleConnection(client: Socket) {
    Logger.log(`Client connected: ${client.id}`);
    client.emit('globalBest', this.globalBest);
  }

  handleDisconnect(client: Socket) {
    Logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('updateGlobalBest')
  handleUpdateGlobalBest(
    client: Socket,
    payload: { time: number; name: string },
  ) {
    Logger.log(`Received updateGlobalBest: ${JSON.stringify(payload)}`);
    const { time, name } = payload;
    if (time < this.globalBest.time) {
      this.globalBest = { time, name };
      this.reactionTestService.updateGlobalBest(time, name);
      Logger.log(`Emitting new globalBest: ${JSON.stringify(this.globalBest)}`);
      this.server.emit('globalBest', this.globalBest);
    }
  }
}
