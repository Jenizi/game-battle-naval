import { useEffect, useState } from "react";
import { useWebSocket } from "../../contexts/web-socket-context";

export const useGame = () => {
  const [boardPlayer1, setBoardPlayer1] = useState<Array<{ x: number; y: number; hit: boolean; ship: { from: string; to: string }; isSelected: boolean }>>([]);
  const [boardPlayer2, setBoardPlayer2] = useState<Array<{ x: number; y: number; hit: boolean; ship: { from: string; to: string }; isSelected: boolean }>>([]);
  const [isDropped1, setIsDropped1] = useState("");
  const [isDropped2, setIsDropped2] = useState("");
  const [isDropped3, setIsDropped3] = useState("");
  const [isDropped4, setIsDropped4] = useState("");
  const [isDropped5, setIsDropped5] = useState("");
  const [isDropped6, setIsDropped6] = useState("");
  const [isDropped7, setIsDropped7] = useState("");
  const [isDropped8, setIsDropped8] = useState("");
  const [isDropped9, setIsDropped9] = useState("");
  const [isDropped10, setIsDropped10] = useState("");
  const [selectedSea, setSelectedSea] = useState<number | null>(null);
  const [attacked, setAttacked] = useState<number[]>([]);
  const [enemyShips, setEnemyShips] = useState<number[]>([]);
  const [allyAttackedShips, setAllyAttackedShips] = useState<string[]>([]);
  const [allyShips, setAllyShips] = useState<number[]>([]);
  const [pointsPlayer1, setPointsPlayer1] = useState(0);
  const [pointsPlayer2, setPointsPlayer2] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [canStart, setCanStart] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [message, setMessage] = useState<{ text: string; icon: string } | null>(null);
  const [modalNotification, setModalNotification] = useState(false);
  const [modalRules, setModalRules] = useState(false);
  const { socket } = useWebSocket();

  useEffect(() => {
    generateBoard();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("game:started", onGameStarted);
    socket.on("player1:hit", onPlayer1Hit);
    socket.on("player1:miss", onPlayer1Miss);
    socket.on("player2:hit", onPlayer2Hit);
    socket.on("player2:miss", onPlayer2Miss);

    return () => {
      socket.off("game:started", onGameStarted);
      socket.off("player1:hit", onPlayer1Hit);
      socket.off("player1:miss", onPlayer1Miss);
      socket.off("player2:hit", onPlayer2Hit);
      socket.off("player2:miss", onPlayer2Miss);
    };
  }, [socket]);

  useEffect(() => {
    if (pointsPlayer1 === 10) {
      setMessage({ text: "Parabéns! Você venceu!".toUpperCase(), icon: "checked" });
      setModalNotification(true);
      setGameStart(false);
      setCanStart(false);
    }
  }, [pointsPlayer1]);

  useEffect(() => {
    if (pointsPlayer2 === 10) {
      setMessage({ text: "O oponente venceu! Tente novamente.".toUpperCase(), icon: "cancel" });
      setModalNotification(true);
      setGameStart(false);
      setCanStart(false);
    }
  }, [pointsPlayer2]);

  const generateBoard = () => {
    let boards = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        boards.push({ x: i, y: j, hit: false, ship: { from: "", to: "" }, isSelected: false });
      }
    }
    setBoardPlayer1(boards);
    setBoardPlayer2(boards);
  };

  const handleDragEnd = (event: any) => {
    if (event.over && event.over.id) {
      if (event.active.id === "isDropped1") setIsDropped1(event.over.id);
      if (event.active.id === "isDropped2") setIsDropped2(event.over.id);
      if (event.active.id === "isDropped3") setIsDropped3(event.over.id);
      if (event.active.id === "isDropped4") setIsDropped4(event.over.id);
      if (event.active.id === "isDropped5") setIsDropped5(event.over.id);
      if (event.active.id === "isDropped6") setIsDropped6(event.over.id);
      if (event.active.id === "isDropped7") setIsDropped7(event.over.id);
      if (event.active.id === "isDropped8") setIsDropped8(event.over.id);
      if (event.active.id === "isDropped9") setIsDropped9(event.over.id);
      if (event.active.id === "isDropped10") setIsDropped10(event.over.id);
    }
  };

  const onGameStarted = (data: any) => {
    if (data.canStart) {
      setCanStart(true);
      setMessage({ text: "Sua vez de atacar".toUpperCase(), icon: "shield" });
      setModalNotification(true);
    } else {
      setCanStart(false);
      setMessage({ text: "Aguarde o outro jogador".toUpperCase(), icon: "clock" });
      setModalNotification(true);
    }
    setGameStart(true);
  };

  const onPlayer1Hit = (data: any) => {
    setMessage({ text: "Aguarde o outro jogador".toUpperCase(), icon: "checked" });
    setModalNotification(true);
    setCanStart(false);
    setSelectedSea(null);
    const attackedNew = attacked;
    attackedNew.push(Number(data.index.replace("cell-", "")));
    setAttacked(attackedNew);

    const enemyShipsNew = enemyShips;
    enemyShipsNew.push(Number(data.index.replace("cell-", "")));
    setEnemyShips(enemyShipsNew);

    setPointsPlayer1(data.pointsPlayer1);
    setPointsPlayer2(data.pointsPlayer2);
  };

  const onPlayer2Hit = (data: any) => {
    setMessage({ text: "Sua vez de atacar".toUpperCase(), icon: "shield" });
    setModalNotification(true);
    setCanStart(true);
    setSelectedSea(null);
    const allyShipsNew = allyShips;
    allyShipsNew.push(Number(data.index.replace("cell-", "")));
    setAllyShips(allyShipsNew);

    const allyAttackedShipsNew = allyAttackedShips;
    allyAttackedShipsNew.push(data.index);
    setAllyAttackedShips(allyAttackedShipsNew);

    setPointsPlayer1(data.pointsPlayer1);
    setPointsPlayer2(data.pointsPlayer2);
  };

  const onPlayer1Miss = (data: any) => {
    setMessage({ text: "Aguarde o outro jogador".toUpperCase(), icon: "cancel" });
    setModalNotification(true);
    setCanStart(false);
    setSelectedSea(null);

    const attackedNew = attacked;
    attackedNew.push(Number(data.index.replace("cell-", "")));
    setAttacked(attackedNew);
  };

  const onPlayer2Miss = (data: any) => {
    setMessage({ text: "Sua vez de atacar".toUpperCase(), icon: "shield" });
    setModalNotification(true);
    setCanStart(true);
    setSelectedSea(null);

    const allyAttackedShipsNew = allyAttackedShips;
    allyAttackedShipsNew.push(data.index);
    setAllyAttackedShips(allyAttackedShipsNew);
  };

  const onAttack = (idx: number) => {
    if (gameStart && canStart && idx !== null) {
      if (socket) {
        socket.emit("player1:attack", { attack: `cell-${idx}` }, socket.id);
      }
    }
  };

  const onPlayerReady = () => {
    if (!gameStart && isDropped1 && isDropped2 && isDropped3 && isDropped4 && isDropped5 && isDropped6 && isDropped7 && isDropped8 && isDropped9 && isDropped10) {
      if (socket) {
        socket.emit(
          "player:ready",
          { ships: [isDropped1, isDropped2, isDropped3, isDropped4, isDropped5, isDropped6, isDropped7, isDropped8, isDropped9, isDropped10] },
          socket.id
        );
        setPlayerReady(true);
        setMessage({ text: "Aguarde o outro jogador".toUpperCase(), icon: "clock" });
        setModalNotification(true);
      }
    }
  };

  return {
    boardPlayer1,
    boardPlayer2,
    gameStart,
    pointsPlayer1,
    pointsPlayer2,
    message,
    handleDragEnd,
    onAttack,
    selectedSea,
    setSelectedSea,
    attacked,
    enemyShips,
    isDropped1,
    isDropped2,
    isDropped3,
    isDropped4,
    isDropped5,
    isDropped6,
    isDropped7,
    isDropped8,
    isDropped9,
    isDropped10,
    onPlayerReady,
    canStart,
    allyShips,
    allyAttackedShips,
    playerReady,
    modalNotification,
    setModalNotification,
    modalRules,
    setModalRules,
  };
};
