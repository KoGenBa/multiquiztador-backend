import { Player, PlayerAnswer } from '@lib/database/entities';
import { EPlayerTitles } from './title.type';

export interface IQuestionSummary extends PlayerAnswer {
  score: number;
}

export type IGamePlayerStats = Partial<Player> & {
  displayName: string | null;
  score: number;
  questions: IQuestionSummary[];
  titles: EPlayerTitles[];
  totalDelta: number;
};
