interface CardData {
  flashcardItem: string;
  type: string;
}

const Card: React.FC<CardData> = ({ flashcardItem, type }) => {
  return (
    <div
      className={`bg-white border-2 ${
        type === "character" ? "border-black" : "border-red-600"
      } p-4`}
    >
      <p className="font-black text-2xl">{flashcardItem}</p>
    </div>
  );
};

export { Card };
