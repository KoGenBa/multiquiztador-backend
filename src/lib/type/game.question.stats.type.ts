import { Player } from 'src/lib/database/entities';
import { EPlayerTitles } from './title.type';

export interface IQuestionSummary {}

export type IGamePlayerStats = Partial<Player> & {
  displayName: string;
  score: number;
  questions: IQuestionSummary[];
  titles: EPlayerTitles[];
  totalDelta: number;
};
