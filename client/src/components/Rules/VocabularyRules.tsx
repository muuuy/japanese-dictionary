const VocabularyRules = () => {
  return (
    <>
      <ul>
        <span className="rules--list-header">OBJECTIVE</span>
        <li>
          Correctly translate Japanese characters to either romaji or the chosen
          translation.
        </li>
      </ul>
      <ul>
        <span className="rules--list-header">QUIZ FORMAT</span>
        <li>Japanese characters will be presented one at a time.</li>
        <li>
          You must provide either the romaji or the chosen translation for each
          character.
        </li>
      </ul>
      <ul>
        <span className="rules--list-header">ANSWERING</span>
        <li>Type your answer in the provided input field.</li>
        <li>Press Enter or click the Submit button to check your answer.</li>
      </ul>
      <ul>
        <span className="rules--list-header">SCORING</span>
        <li>Each correct answer earns one point.</li>
        <li>Incorrect answers do not deduct points.</li>
      </ul>
      <ul>
        <span className="rules--list-header">ATTEMPTS</span>
        <li>You have as many attempts per character as you want.</li>
        <li>
          After answering, the correct translation will be shown before moving
          to the next character.
        </li>
      </ul>
      <ul>
        <span className="rules--list-header">TIMER</span>
        <li>
          A timer starts when you begin the quiz and stops when you finish.
          <br />
          The timer begins once you press the <b>START QUIZ</b> button.
        </li>
      </ul>
      <ul>
        <span className="rules--list-header">COMPLETION</span>
        <li>
          The quiz ends when you've attempted to translate all characters in the
          set.
        </li>
        <li>
          Your final score and completion time will be displayed at the end.
        </li>
      </ul>
    </>
  );
};

export { VocabularyRules };
