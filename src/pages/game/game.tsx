import { Box, Button, Center, Code, Flex, Paper, Text, Title } from "@mantine/core";
import { useGame } from "./use-game";
import { Fragment } from "react/jsx-runtime";
import { Draggable } from "./draggable";
import { Droppable } from "./droppable";
import { DndContext } from "@dnd-kit/core";
import { useEffect } from "react";
import Ship from "../../assets/mayflower-ship.png";
import Sea from "../../assets/raw.png";
import Cannon from "../../assets/cannon.png";
import Explosion from "../../assets/explosion.png";
import BShip from "../../assets/bomb.png";

export const Game = () => {
  const {
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
  } = useGame();

  const draggableMarkup1 = (
    <Draggable id="isDropped1" disabled={gameStart}>
      <img src={Ship} width={40} height={40} alt="Sem imagem"></img>
    </Draggable>
  );
  const draggableMarkup2 = (
    <Draggable id="isDropped2" disabled={gameStart}>
      <img src={Ship} width={40} height={40} alt="Sem imagem"></img>
    </Draggable>
  );
  const draggableMarkup3 = (
    <Draggable id="isDropped3" disabled={gameStart}>
      <img src={Ship} width={40} height={40} alt="Sem imagem"></img>
    </Draggable>
  );
  const draggableMarkup4 = (
    <Draggable id="isDropped4" disabled={gameStart}>
      <img src={Ship} width={40} height={40} alt="Sem imagem"></img>
    </Draggable>
  );

  useEffect(() => {
    if (pointsPlayer2 === 4) {
      setMessage("Você ganhou!!!");
      setGameStart(false);
    }
  }, [pointsPlayer2]);

  return (
    <Box p="sm">
      <Flex direction={"column"}>
        <Flex
          gap="md"
          px="md"
          py="sm"
          style={{
            border: "6px solid #780000",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <Paper bg="#001d3d" shadow="xs" p="sm">
            <Flex>
              {Array.from({ length: 21 }).map((_, idx) => (
                <div key={idx} style={{ border: "1px solid white", width: "50px", height: "50px", padding: "0px", lineHeight: "50px" }}>
                  {idx > 0 && <Center>{String.fromCharCode(96 + idx).toUpperCase()}</Center>}
                </div>
              ))}
            </Flex>
            {boardPlayer1.map((_, index) => (
              <Fragment key={index}>
                {index % 20 == 0 && (
                  <Flex>
                    <div key={index} style={{ border: "1px solid white", width: "50px", height: "50px", padding: "0px", lineHeight: "50px" }}>
                      <Center>{index / 10 / 2 + 1}</Center>
                    </div>
                    {Array.from({ length: 20 }).map((_, index2) => (
                      <div
                        id={`cell-${index + index2}`}
                        key={index + index2}
                        style={{ border: "1px solid white", width: "50px", height: "50px", padding: "0px", position: "relative" }}
                        className="cursor-pointer"
                        onClick={() => {
                          if (gameStart) setSelectedSea(index + index2);
                        }}
                      >
                        <img src={Sea} width={50} height={50} alt="Sem imagem"></img>
                        {selectedSea === index + index2 && (
                          <img id={String(index + index2)} src={Cannon} width={50} height={50} alt="Sem imagem" style={{ position: "absolute", left: "0px", top: "0px" }}></img>
                        )}
                        {attacked.includes(index + index2) && !enemyShips.includes(index + index2) && gameStart && (
                          <img src={Explosion} width={50} height={50} alt="Sem imagem" style={{ position: "absolute", left: "0px", top: "0px" }}></img>
                        )}
                        {enemyShips.includes(index + index2) && attacked.includes(index + index2) && gameStart && (
                          <img src={BShip} width={50} height={50} alt="Sem imagem" style={{ position: "absolute", left: "0px", top: "0px" }}></img>
                        )}
                      </div>
                    ))}
                  </Flex>
                )}
              </Fragment>
            ))}
          </Paper>
          <Box w={"100%"}>
            <Flex justify={"space-between"}>
              <div>
                <Title className="medievalsharp-regular">Jogador: 1 (inimigo)</Title>
                <Title className="medievalsharp-regular">Pontuação: {pointsPlayer1}</Title>
                <Text size="lg" w="300px">
                  Sua pontuação é calculada após cada jogada, cada navio vale 1 ponto.
                </Text>
                <Title className="medievalsharp-regular">Ataque</Title>
                <Text size="lg" w="300px">
                  Para atacar o inimigo, selecione um local no tabuleiro oceano, após o canhão posicionado, clique em atacar
                </Text>
                <Flex gap="md" wrap="wrap" py={"md"}>
                  <Button bg="#780000" size="lg" disabled={selectedSea === null} onClick={() => selectedSea !== null && onAttack(selectedSea)}>
                    ATACAR
                  </Button>
                </Flex>
              </div>
              <div>
                <Text c="#1d3557" fw="bold">
                  <Code c="white">Jogo Batalha Naval v1.0.0</Code>
                </Text>
                <Button bg="gray">Regras</Button>
              </div>
            </Flex>
          </Box>
        </Flex>
        <Flex
          gap="md"
          px="md"
          py="sm"
          style={{
            border: "6px solid #006400",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <DndContext onDragEnd={(e) => handleDragEnd(e)}>
            <Paper bg="#001d3d" shadow="xs" p="sm">
              <Flex>
                {Array.from({ length: 21 }).map((_, idx) => (
                  <div key={idx} style={{ border: "1px solid white", width: "50px", height: "50px", padding: "0px", lineHeight: "50px" }}>
                    {idx > 0 && <Center>{String.fromCharCode(96 + idx).toUpperCase()}</Center>}
                  </div>
                ))}
              </Flex>
              {boardPlayer2.map((_, index) => (
                <Fragment key={index}>
                  {index % 20 == 0 && (
                    <Flex>
                      <div key={index} style={{ border: "1px solid white", width: "50px", height: "50px", padding: "0px", lineHeight: "50px" }}>
                        <Center>{index / 10 / 2 + 1}</Center>
                      </div>
                      {Array.from({ length: 20 }).map((_, index2) => (
                        <Droppable id={`cell-${index + index2}`} key={index + index2}>
                          {isDropped1 === `cell-${index + index2}` && draggableMarkup1}
                          {isDropped2 === `cell-${index + index2}` && draggableMarkup2}
                          {isDropped3 === `cell-${index + index2}` && draggableMarkup3}
                          {isDropped4 === `cell-${index + index2}` && draggableMarkup4}
                          {isDropped1 !== `cell-${index + index2}` &&
                            isDropped2 !== `cell-${index + index2}` &&
                            isDropped3 !== `cell-${index + index2}` &&
                            isDropped4 !== `cell-${index + index2}` && <img src={Sea} width={50} height={50} alt="Sem imagem"></img>}
                        </Droppable>
                      ))}
                    </Flex>
                  )}
                </Fragment>
              ))}
            </Paper>
            <Box w={"100%"}>
              <Flex justify={"space-between"}>
                <div>
                  <Title className="medievalsharp-regular">Jogador: 2 (você)</Title>
                  <Title className="medievalsharp-regular">Pontuação: {pointsPlayer2}</Title>
                  <Text size="lg" w="300px">
                    Sua pontuação é calculada após cada jogada, cada navio vale 1 ponto
                  </Text>
                  <Title className="medievalsharp-regular">Frota</Title>
                  <Text size="md" w="300px">
                    Para criar sua formação mova a frota uma a uma para o seu tabuleiro oceano e inicie
                  </Text>
                  <Flex gap="md" wrap="wrap" py={"md"}>
                    {!isDropped1 ? draggableMarkup1 : null}
                    {!isDropped2 ? draggableMarkup2 : null}
                    {!isDropped3 ? draggableMarkup3 : null}
                    {!isDropped4 ? draggableMarkup4 : null}
                  </Flex>
                  <Flex gap="md" py={"md"}>
                    <Button bg="#780000" size="lg" onClick={() => setGameStart(true)} disabled={gameStart}>
                      INICIAR
                    </Button>
                    {message && (
                      <Text size="xl" fw={900} variant="gradient" gradient={{ from: "indigo", to: "yellow", deg: 90 }}>
                        {message}
                      </Text>
                    )}
                  </Flex>
                </div>
                <div>
                  <Text c="#1d3557" fw="bold">
                    <Code c="white">Jogo Batalha Naval v1.0.0</Code>
                  </Text>
                  <Button bg="gray">Regras</Button>
                </div>
              </Flex>
            </Box>
          </DndContext>
        </Flex>
      </Flex>
    </Box>
  );
};
