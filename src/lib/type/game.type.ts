import { EWordForm } from './word.type';

export enum EGameState {
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  CALCULATING = 'CALCULATING',
  FINISHED = 'FINISHED',
}

export interface IGameNameNoun {
  value: string;
  form: EWordForm;
}

export type TGameNameWord = Record<EWordForm, string>;
