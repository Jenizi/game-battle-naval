import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class WebsocketService {
  private server: Server;
  private clientsMap = new Map<string, { player: 'player1' | 'player2' }>();

  private firstReadyPlayer: 'player1' | 'player2' | null = null;

  private gameState = {
    player1Ready: false,
    player2Ready: false,
    player1Score: 0,
    player2Score: 0,
    player1Ships: [] as string[],
    player2Ships: [] as string[],
    started: false,
  };

  setServer(server: Server) {
    this.server = server;
  }

  registerClient(client: Socket) {
    const connections = this.server.sockets.sockets.size;

    if (connections > 1) {
      const existingClient = Array.from(this.clientsMap.entries()).find(
        ([, info]) => info.player === 'player1',
      );
      if (existingClient) {
        return this.clientsMap.set(client.id, { player: 'player2' });
      } else {
        return this.clientsMap.set(client.id, { player: 'player1' });
      }
    }

    return this.clientsMap.set(client.id, { player: 'player1' });
  }

  removeClient(clientId: string) {
    this.clientsMap.delete(clientId);
  }

  getConnectedClients() {
    return this.clientsMap;
  }

  setPlayerReady(player: 'player1' | 'player2', ships: string[]) {
    this.gameState[`${player}Ready`] = true;
    this.gameState[`${player}Ships`] = ships;

    if (!this.firstReadyPlayer) {
      this.firstReadyPlayer = player;
    }

    this.checkStartGame();
  }

  private checkStartGame() {
    if (this.gameState.player1Ready && this.gameState.player2Ready) {
      this.gameState.started = true;

      for (const [socketId, info] of this.clientsMap.entries()) {
        const canStart = info.player === this.firstReadyPlayer;
        this.server.to(socketId).emit('game:started', { canStart });
      }
    }
  }

  handleAttack(attacker: 'player1' | 'player2', attack: string) {
    const defender = attacker === 'player1' ? 'player2' : 'player1';
    const defenderShips = this.gameState[`${defender}Ships`] as string[];

    const hit = defenderShips.includes(attack);
    if (hit) {
      this.gameState[`${attacker}Score`] += 1;
    }
    return {
      hit,
      pointsPlayer1: this.gameState[`player1Score`],
      pointsPlayer2: this.gameState[`player2Score`],
    };
  }

  resetGameState() {
    this.gameState = {
      player1Ready: false,
      player2Ready: false,
      player1Score: 0,
      player2Score: 0,
      player1Ships: [],
      player2Ships: [],
      started: false,
    };
  }
}
