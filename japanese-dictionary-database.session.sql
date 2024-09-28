CREATE TABLE user_flashcards (
    user_id INT NOT NULL,
    flashcard_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (flashcard_id) REFERENCES flashcards(flashcard_id) ON DELETE CASCADE,
    UNIQUE (user_id, flashcard_id)
)