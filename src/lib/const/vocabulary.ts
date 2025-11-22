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
    value: 'планшет',
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
    value: 'дорога',
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
    value: 'веретено',
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
  {
    value: 'дрова',
    form: EWordForm.PLURAL,
  },
];
export const nounsR18: IGameNameNoun[] = [
  {
    value: 'хуй',
    form: EWordForm.MALE,
  },
  {
    value: 'залупа',
    form: EWordForm.FEMALE,
  },
  {
    value: 'ебло',
    form: EWordForm.NEUTRAL,
  },
  {
    value: 'хуйцы',
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
  {
    [EWordForm.MALE]: 'кислотный',
    [EWordForm.FEMALE]: 'кислотная',
    [EWordForm.NEUTRAL]: 'кислотное',
    [EWordForm.PLURAL]: 'кислотные',
  },
  {
    [EWordForm.MALE]: 'далекий',
    [EWordForm.FEMALE]: 'далекая',
    [EWordForm.NEUTRAL]: 'далекое',
    [EWordForm.PLURAL]: 'далекие',
  },
  {
    [EWordForm.MALE]: 'воздушный',
    [EWordForm.FEMALE]: 'воздушная',
    [EWordForm.NEUTRAL]: 'воздушное',
    [EWordForm.PLURAL]: 'воздушные',
  },
  {
    [EWordForm.MALE]: 'музыкальный',
    [EWordForm.FEMALE]: 'музыкальная',
    [EWordForm.NEUTRAL]: 'музыкальное',
    [EWordForm.PLURAL]: 'музыкальные',
  },
];
export const adjectivesR18: TGameNameWord[] = [
  {
    [EWordForm.MALE]: 'блядский',
    [EWordForm.FEMALE]: 'блядская',
    [EWordForm.NEUTRAL]: 'блядское',
    [EWordForm.PLURAL]: 'блядские'
  }
];
