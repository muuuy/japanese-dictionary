import { useDraggable } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

interface DraggableData {
  children: React.ReactNode;
  id: string;
}

const Draggable: React.FC<DraggableData> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const combinedStyle = {
    ...style,
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  };

  return (
    <button
      ref={setNodeRef}
      style={combinedStyle}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
};

export { Draggable };
