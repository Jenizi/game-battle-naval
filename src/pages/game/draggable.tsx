import { useDraggable } from "@dnd-kit/core";

export const Draggable = (props: any) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    disabled: props.disabled,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        width: "50px",
        height: "50px",
        padding: "0px",
        backgroundColor: "#99582a",
        cursor: "pointer",
      }
    : {
        width: "50px",
        height: "50px",
        padding: "0px",
        backgroundColor: "#99582a",
        cursor: "pointer",
      };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
};
