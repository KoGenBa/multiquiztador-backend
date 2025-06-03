import { EWordForm, IGameNameNoun, TGameNameWord } from '../type';

export const nouns: IGameNameNoun[] = [
  {
    value: 'дротик',
    form: EWordForm.MALE,
  },
  {
    value: 'гусь',
    form: EWordForm.MALE,
  },
  {
    value: 'дверь',
    form: EWordForm.FEMALE,
  },
  {
    value: 'погода',
    form: EWordForm.FEMALE,
  },
  {
    value: 'окно',
    form: EWordForm.NEUTRAL,
  },
  {
    value: 'полотно',
    form: EWordForm.NEUTRAL,
  },
  {
    value: 'форточки',
    form: EWordForm.PLURAL,
  },
  {
    value: 'штаны',
    form: EWordForm.PLURAL,
  },
];
export const adjectives: TGameNameWord[] = [
  {
    [EWordForm.MALE]: 'ловкий',
    [EWordForm.FEMALE]: 'ловкая',
    [EWordForm.NEUTRAL]: 'ловкое',
    [EWordForm.PLURAL]: 'ловкие',
  },
  {
    [EWordForm.MALE]: 'тупой',
    [EWordForm.FEMALE]: 'тупая',
    [EWordForm.NEUTRAL]: 'тупое',
    [EWordForm.PLURAL]: 'тупые',
  },
  {
    [EWordForm.MALE]: 'рябой',
    [EWordForm.FEMALE]: 'рябая',
    [EWordForm.NEUTRAL]: 'рябое',
    [EWordForm.PLURAL]: 'рябые',
  },
  {
    [EWordForm.MALE]: 'свободный',
    [EWordForm.FEMALE]: 'свободная',
    [EWordForm.NEUTRAL]: 'свободное',
    [EWordForm.PLURAL]: 'свободные',
  },
  {
    [EWordForm.MALE]: 'грузный',
    [EWordForm.FEMALE]: 'грузная',
    [EWordForm.NEUTRAL]: 'грузное',
    [EWordForm.PLURAL]: 'грузные',
  },
];
