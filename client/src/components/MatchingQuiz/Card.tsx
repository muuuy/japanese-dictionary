interface CardData {
  flashcardItem: string;
  type: string;
}

const Card: React.FC<CardData> = ({ flashcardItem, type }) => {
  return (
    <div
      className={`bg-white min-w-20 inline-block text-center ${
        type === "character"
          ? "shadow-custom-dark"
          : type === "definition"
          ? "shadow-custom-red"
          : ""
      } p-4`}
    >
      <p className="font-black text-2xl">{flashcardItem}</p>
    </div>
  );
};

export { Card };
