import { useDroppable } from "@dnd-kit/core";

export const Droppable = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : undefined,
    border: "1px solid white",
    width: "50px",
    height: "50px",
    padding: "0px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};
