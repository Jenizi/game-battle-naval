import { WebsocketService } from '@common/services/websocket/websocket.service';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly websocketService: WebsocketService) {}

  @WebSocketServer() server: Server;

  afterInit() {
    this.websocketService.setServer(this.server);
  }

  private clientsMap = new Map<string, { userId: string | null }>();

  async handleConnection(client: Socket) {
    this.websocketService.registerClient(client);
  }

  handleDisconnect(client: Socket) {
    this.websocketService.removeClient(client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Message received';
  }

  @SubscribeMessage('player:ready')
  handlePlayerReady(client: Socket, payload: { ships: string[] }) {
    if (Array.isArray(payload)) payload = payload[0];
    const playerInfo = this.websocketService
      .getConnectedClients()
      .get(client.id);
    if (playerInfo) {
      this.websocketService.setPlayerReady(playerInfo.player, payload.ships);
    }
  }

  @SubscribeMessage('player1:attack')
  handlePlayer1Attack(client: Socket, payload: { attack: string }) {
    try {
      if (Array.isArray(payload)) payload = payload[0];

      const playerInfo = this.websocketService
        .getConnectedClients()
        .get(client.id);

      if (playerInfo) {
        const attacker = playerInfo.player;
        const defender = attacker === 'player1' ? 'player2' : 'player1';

        const result = this.websocketService.handleAttack(
          playerInfo.player,
          payload.attack,
        );

        if (result.hit) {
          client.emit('player1:hit', {
            index: payload.attack,
            pointsPlayer1:
              attacker === 'player1'
                ? result.pointsPlayer1
                : result.pointsPlayer2,
            pointsPlayer2:
              attacker === 'player1'
                ? result.pointsPlayer2
                : result.pointsPlayer1,
          });
        } else {
          client.emit('player1:miss', {
            index: payload.attack,
            pointsPlayer1:
              attacker === 'player1'
                ? result.pointsPlayer1
                : result.pointsPlayer2,
            pointsPlayer2:
              attacker === 'player1'
                ? result.pointsPlayer2
                : result.pointsPlayer1,
          });
        }

        const player2SocketId = Array.from(
          this.websocketService.getConnectedClients().entries(),
        ).find(([_, info]) => info.player === defender)?.[0];

        if (player2SocketId) {
          const defenderSocket =
            this.server.sockets.sockets.get(player2SocketId);
          if (defenderSocket) {
            defenderSocket.emit(result.hit ? 'player2:hit' : 'player2:miss', {
              index: payload.attack,
              pointsPlayer1:
                attacker === 'player1'
                  ? result.pointsPlayer2
                  : result.pointsPlayer1,
              pointsPlayer2:
                attacker === 'player1'
                  ? result.pointsPlayer1
                  : result.pointsPlayer2,
            });
          }
        }
      }
    } catch (error) {
      console.error('Error handling player1 attack:', error);
      client.emit('error', {
        message: 'An error occurred while processing the attack.',
        error: error.message,
      });
    }
  }

  broadcastMessage(event: string, data: any) {
    this.server.emit(event, data);
  }
}
