import { useEffect, useState } from "react";

export const useGame = () => {
  const [boardPlayer1, setBoardPlayer1] = useState<Array<{ x: number; y: number; hit: boolean; ship: { from: string; to: string }; isSelected: boolean }>>([]);
  const [boardPlayer2, setBoardPlayer2] = useState<Array<{ x: number; y: number; hit: boolean; ship: { from: string; to: string }; isSelected: boolean }>>([]);
  const [isDropped1, setIsDropped1] = useState("");
  const [isDropped2, setIsDropped2] = useState("");
  const [isDropped3, setIsDropped3] = useState("");
  const [isDropped4, setIsDropped4] = useState("");
  const [selectedSea, setSelectedSea] = useState<number | null>(null);
  const [attacked, setAttacked] = useState<number[]>([]);
  const [enemyShips, setEnemyShips] = useState<number[]>([42, 121, 77, 2]);
  const [pointsPlayer1, setPointsPlayer1] = useState(0);
  const [pointsPlayer2, setPointsPlayer2] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    generateBoard();
  }, []);

  const generateBoard = () => {
    let boards = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 20; j++) {
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
    }
  };

  const onAttack = (idx: number) => {
    setAttacked([...attacked, idx]);
    setSelectedSea(null);
    if (enemyShips.includes(idx)) {
      setPointsPlayer2(pointsPlayer2 + 1);
    }
  };

  return {
    boardPlayer1,
    boardPlayer2,
    gameStart,
    setGameStart,
    pointsPlayer1,
    pointsPlayer2,
    message,
    setMessage,
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
  };
};
