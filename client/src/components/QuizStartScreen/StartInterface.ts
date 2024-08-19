export interface StartScreenTitles {
  englishTitle: string;
  japaneseTitle: string;
}

export interface StartScreenData {
  linkTo: string;
  image: string;
  titles: StartScreenTitles;
  rulesType: RuleTypes;
}

export enum RuleTypes {
  VOCAB = "vocab=rules",
  MATCHING = "matching-rules",
}
