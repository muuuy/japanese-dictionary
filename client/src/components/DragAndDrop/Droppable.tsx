import { useDroppable } from "@dnd-kit/core";

interface DroppableData {
  children: React.ReactNode;
  id: string;
}

const Droppable: React.FC<DroppableData> = ({ children, id }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
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
