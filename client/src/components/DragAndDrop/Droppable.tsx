import { useDroppable } from "@dnd-kit/core";

interface DroppableData {
  children: React.ReactNode;
}

const Droppable: React.FC<DroppableData> = ({ children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default Droppable;
