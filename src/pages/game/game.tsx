import { Box, Button, Center, Code, Flex, Paper, Text, Title, Modal } from "@mantine/core";
import { useGame } from "./use-game";
import { Fragment } from "react/jsx-runtime";
import { Draggable } from "./draggable";
import { Droppable } from "./droppable";
import { DndContext } from "@dnd-kit/core";
import Ship from "../../assets/mayflower-ship.png";
import Sea from "../../assets/raw.png";
import Cannon from "../../assets/cannon.png";
import Explosion from "../../assets/explosion.png";
import BShip from "../../assets/bomb.png";
import Shield from "../../assets/shield.png";
import Clock from "../../assets/hourglass.png";
import Cancel from "../../assets/cancel.png";
import Checked from "../../assets/checked.png";

export const Game = () => {
  const {
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
  const draggableMarkup5 = (
    <Draggable id="isDropped5" disabled={gameStart}>
      <img src={Ship} width={40} height={40} alt="Sem imagem"></img>
    </Draggable>
  );
  const draggableMarkup6 = (
    <Draggable id="isDropped6" disabled={gameStart}>
      <img src={Ship} width={40} height={40} alt="Sem imagem"></img>
    </Draggable>
  );
  const draggableMarkup7 = (
    <Draggable id="isDropped7" disabled={gameStart}>
      <img src={Ship} width={40} height={40} alt="Sem imagem"></img>
    </Draggable>
  );
  const draggableMarkup8 = (
    <Draggable id="isDropped8" disabled={gameStart}>
      <img src={Ship} width={40} height={40} alt="Sem imagem"></img>
    </Draggable>
  );
  const draggableMarkup9 = (
    <Draggable id="isDropped9" disabled={gameStart}>
      <img src={Ship} width={40} height={40} alt="Sem imagem"></img>
    </Draggable>
  );
  const draggableMarkup10 = (
    <Draggable id="isDropped10" disabled={gameStart}>
      <img src={Ship} width={40} height={40} alt="Sem imagem"></img>
    </Draggable>
  );

  return (
    <>
      <Flex align={"center"} direction={"column"} className="responsive-none">
        <Flex
          gap="md"
          px="md"
          py="sm"
          style={{
            border: "6px solid #1d1a05",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            backgroundColor: "#5b3535",
          }}
        >
          <Paper bg="#001d3d" shadow="xs" p="sm">
            <Flex>
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} style={{ border: "1px solid white", width: "50px", height: "50px", padding: "0px", lineHeight: "50px" }}>
                  {idx > 0 && <Center>{String.fromCharCode(96 + idx).toUpperCase()}</Center>}
                </div>
              ))}
            </Flex>
            {boardPlayer1.map((_, index) => (
              <Fragment key={index}>
                {index % 7 == 0 && (
                  <Flex>
                    <div key={index} style={{ border: "1px solid white", width: "50px", height: "50px", padding: "0px", lineHeight: "50px" }}>
                      <Center>{index / 7 + 1}</Center>
                    </div>
                    {Array.from({ length: 7 }).map((_, index2) => (
                      <div
                        id={`cell-${index + index2}`}
                        key={index + index2}
                        style={{ border: "1px solid white", width: "50px", height: "50px", padding: "0px", position: "relative" }}
                        className="cursor-pointer"
                        onClick={() => {
                          if (gameStart && canStart && !attacked.includes(index + index2)) setSelectedSea(index + index2);
                        }}
                      >
                        <img src={Sea} width={50} height={50} alt="Sem imagem"></img>
                        {selectedSea === index + index2 && (
                          <img id={String(index + index2)} src={Cannon} width={50} height={50} alt="Sem imagem" style={{ position: "absolute", left: "0px", top: "0px" }}></img>
                        )}
                        {attacked.includes(index + index2) && !enemyShips.includes(index + index2) && (
                          <img src={Explosion} width={50} height={50} alt="Sem imagem" style={{ position: "absolute", left: "0px", top: "0px" }}></img>
                        )}
                        {enemyShips.includes(index + index2) && attacked.includes(index + index2) && (
                          <img src={BShip} width={50} height={50} alt="Sem imagem" style={{ position: "absolute", left: "0px", top: "0px" }}></img>
                        )}
                      </div>
                    ))}
                  </Flex>
                )}
              </Fragment>
            ))}
          </Paper>
          <Box w={"360px"}>
            <Flex justify={"space-between"} gap="md" pb="md">
              <Text c="#1d3557" fw="bold">
                <Code c="white">Jogo Batalha Naval Online v1.0.0</Code>
              </Text>
              <Button bg="gray" onClick={() => setModalRules(true)}>
                Regras
              </Button>
            </Flex>
            <Flex align={"center"} gap={"md"}>
              <Title className="medievalsharp-regular">Jogador:</Title>
              <Title className="medievalsharp-regular">1 (inimigo)</Title>
            </Flex>
            <Flex align={"center"} justify={"space-between"} gap={"md"}>
              <Title className="medievalsharp-regular" order={3}>
                Pontos:
              </Title>
              <Title
                className="medievalsharp-regular"
                c="red"
                style={{
                  border: "6px solid #1d1a05",
                  padding: "0 10px",
                  borderRadius: "10px",
                  backgroundColor: "#1d3557",
                  width: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {pointsPlayer2}
              </Title>
            </Flex>
            <Flex gap="md" wrap="wrap" py={"md"}></Flex>
            <Flex justify={"center"} align={"center"} gap="md" py={"md"}>
              <Button c="white" bg="#39120b" size="lg" disabled={selectedSea === null || !canStart} onClick={() => selectedSea !== null && canStart && onAttack(selectedSea)}>
                ATACAR
              </Button>
            </Flex>
          </Box>
        </Flex>
        <Flex
          gap="md"
          px="md"
          py="sm"
          style={{
            border: "6px solid #1d1a05",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            backgroundColor: "#344e41",
          }}
        >
          <DndContext onDragEnd={(e) => handleDragEnd(e)}>
            <Paper bg="#001d3d" shadow="xs" p="sm">
              <Flex>
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} style={{ border: "1px solid white", width: "50px", height: "50px", padding: "0px", lineHeight: "50px" }}>
                    {idx > 0 && <Center>{String.fromCharCode(96 + idx).toUpperCase()}</Center>}
                  </div>
                ))}
              </Flex>
              {boardPlayer2.map((_, index) => (
                <Fragment key={index}>
                  {index % 7 == 0 && (
                    <Flex>
                      <div key={index} style={{ border: "1px solid white", width: "50px", height: "50px", padding: "0px", lineHeight: "50px" }}>
                        <Center>{index / 7 + 1}</Center>
                      </div>
                      {Array.from({ length: 7 }).map((_, index2) => (
                        <Droppable id={`cell-${index + index2}`} key={index + index2}>
                          {allyAttackedShips.includes(`cell-${index + index2}`) && !allyShips.includes(index + index2) && (
                            <img src={Explosion} width={50} height={50} alt="Sem imagem" style={{ position: "absolute", left: "0px", top: "0px" }}></img>
                          )}
                          {allyShips.includes(index + index2) && allyAttackedShips.includes(`cell-${index + index2}`) && (
                            <img src={BShip} width={50} height={50} alt="Sem imagem" style={{ position: "absolute", left: "0px", top: "0px" }}></img>
                          )}
                          {isDropped1 === `cell-${index + index2}` && draggableMarkup1}
                          {isDropped2 === `cell-${index + index2}` && draggableMarkup2}
                          {isDropped3 === `cell-${index + index2}` && draggableMarkup3}
                          {isDropped4 === `cell-${index + index2}` && draggableMarkup4}
                          {isDropped5 === `cell-${index + index2}` && draggableMarkup5}
                          {isDropped6 === `cell-${index + index2}` && draggableMarkup6}
                          {isDropped7 === `cell-${index + index2}` && draggableMarkup7}
                          {isDropped8 === `cell-${index + index2}` && draggableMarkup8}
                          {isDropped9 === `cell-${index + index2}` && draggableMarkup9}
                          {isDropped10 === `cell-${index + index2}` && draggableMarkup10}
                          {isDropped1 !== `cell-${index + index2}` &&
                            isDropped2 !== `cell-${index + index2}` &&
                            isDropped3 !== `cell-${index + index2}` &&
                            isDropped4 !== `cell-${index + index2}` &&
                            isDropped5 !== `cell-${index + index2}` &&
                            isDropped6 !== `cell-${index + index2}` &&
                            isDropped7 !== `cell-${index + index2}` &&
                            isDropped8 !== `cell-${index + index2}` &&
                            isDropped9 !== `cell-${index + index2}` &&
                            isDropped10 !== `cell-${index + index2}` && <img src={Sea} width={50} height={50} alt="Sem imagem"></img>}
                        </Droppable>
                      ))}
                    </Flex>
                  )}
                </Fragment>
              ))}
            </Paper>
            <Box w={"360px"}>
              <Flex justify={"space-between"} gap="md" pb="md">
                <Text c="#1d3557" fw="bold">
                  <Code c="white">Jogo Batalha Naval Online v1.0.0</Code>
                </Text>
                <Button bg="gray" onClick={() => setModalRules(true)}>
                  Regras
                </Button>
              </Flex>
              <Flex align={"center"} gap={"md"}>
                <Title className="medievalsharp-regular">Jogador:</Title>
                <Title className="medievalsharp-regular">2 (você)</Title>
              </Flex>
              <Flex align={"center"} justify={"space-between"} gap={"md"}>
                <Title className="medievalsharp-regular" order={3}>
                  Pontos:
                </Title>
                <Title
                  className="medievalsharp-regular"
                  c="green"
                  style={{
                    border: "6px solid #1d1a05",
                    padding: "0 10px",
                    borderRadius: "10px",
                    backgroundColor: "#1d3557",
                    width: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {pointsPlayer1}
                </Title>
              </Flex>
              <Title className="medievalsharp-regular" order={3}>
                Frota:
              </Title>
              <Flex gap="md" wrap="wrap" py={"md"}>
                {!isDropped1 ? draggableMarkup1 : null}
                {!isDropped2 ? draggableMarkup2 : null}
                {!isDropped3 ? draggableMarkup3 : null}
                {!isDropped4 ? draggableMarkup4 : null}
                {!isDropped5 ? draggableMarkup5 : null}
                {!isDropped6 ? draggableMarkup6 : null}
                {!isDropped7 ? draggableMarkup7 : null}
                {!isDropped8 ? draggableMarkup8 : null}
                {!isDropped9 ? draggableMarkup9 : null}
                {!isDropped10 ? draggableMarkup10 : null}
              </Flex>
              <Flex justify={"center"} gap="md" py={"md"}>
                <Button c="white" bg="#006837" size="lg" onClick={onPlayerReady} disabled={playerReady}>
                  INICIAR
                </Button>
              </Flex>
            </Box>
          </DndContext>
        </Flex>
      </Flex>
      <Modal
        opened={modalNotification}
        onClose={() => {
          setModalNotification(false);
        }}
        centered
        withCloseButton={false}
        className="mantine-Modal-overlay"
        size={"md"}
      >
        <Center>
          {message && message.icon === "clock" && (
            <>
              <img src={Clock} width={32} height={32} alt="Sem imagem"></img>
              <Text size="md" px="md">
                {message.text}
              </Text>
            </>
          )}

          {message && message.icon === "shield" && (
            <>
              <img src={Shield} width={32} height={32} alt="Sem imagem"></img>
              <Text size="md" px="md">
                {message.text}
              </Text>
            </>
          )}

          {message && message.icon === "checked" && (
            <>
              <img src={Checked} width={32} height={32} alt="Sem imagem"></img>
              <Text size="md" px="md">
                {message.text}
              </Text>
            </>
          )}

          {message && message.icon === "cancel" && (
            <>
              <img src={Cancel} width={32} height={32} alt="Sem imagem"></img>
              <Text size="md" px="md">
                {message.text}
              </Text>
            </>
          )}
        </Center>
      </Modal>
      <Modal
        opened={modalRules}
        onClose={() => {
          setModalRules(false);
        }}
        centered
        title="Regras do Jogo Batalha Naval Online"
        size={"md"}
      >
        <Flex direction="column" gap="md">
          <Text>
            1. Cada jogador possui uma frota de 10 navios distribuídos em um tabuleiro de 7x7.
            <br />
            2. O objetivo é afundar todos os navios do oponente antes que ele afunde os seus.
            <br />
            3. Os jogadores se revezam para atacar as células do tabuleiro do adversário.
            <br />
            4. Um ataque é considerado um acerto se atingir uma célula ocupada por um navio inimigo.
            <br />
            5. O jogo termina quando um dos jogadores afunda todos os navios do adversário.
          </Text>
          Caso tenha alguma sugestão ou queira relatar um bug, entre em contato com o desenvolvedor do jogo.
          <br />
          <br />
          Bons jogos!
          <br />
          <Text>
            <br />
            Contato: jeniffer-monteiro@outlook.com
            <br />
            Github:{" "}
            <a href="https://github.com/Jenizi/game-battle-naval" target="_blank" rel="noopener noreferrer">
              Jenizi/game-battle-naval
            </a>
          </Text>
        </Flex>
      </Modal>
    </>
  );
};
