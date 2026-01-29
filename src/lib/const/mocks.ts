import { Player, PlayerAnswer, Question } from 'src/lib/database/entities';

export const generateMockQuestions = (qt?: number, answers?: number[]): Question[] => {
  return [];
};
const mockQuestion = (id: number, answer?: number): Question => {
  return null;
};

export const mockQuestions: Question[] = [
  {
    id: 1,
    question: 'Question Text',
    answer: 12,
    comment: null,
    minDelta: 0,
    maxDelta: 0,
    tags: [],
    playerAnswers: [],
    games: [],
    meanSquaredError: 0,
    version: 1,
    createdAt: new Date('2025-11-28'),
    updatedAt: new Date('2025-11-28'),
  },
  {
    id: 2,
    question: 'Question Text',
    answer: 120,
    comment: null,
    minDelta: 0,
    maxDelta: 0,
    tags: [],
    playerAnswers: [],
    games: [],
    meanSquaredError: 0,
    version: 1,
    createdAt: new Date('2025-11-28'),
    updatedAt: new Date('2025-11-28'),
  },
  {
    id: 3,
    question: 'Question Text',
    answer: 1,
    comment: null,
    minDelta: 0,
    maxDelta: 0,
    tags: [],
    playerAnswers: [],
    games: [],
    meanSquaredError: 0,
    version: 1,
    createdAt: new Date('2025-11-28'),
    updatedAt: new Date('2025-11-28'),
  },
  {
    id: 4,
    question: 'Question Text',
    answer: 1734,
    comment: null,
    minDelta: 0,
    maxDelta: 0,
    tags: [],
    playerAnswers: [],
    games: [],
    meanSquaredError: 0,
    version: 1,
    createdAt: new Date('2025-11-28'),
    updatedAt: new Date('2025-11-28'),
  },
  {
    id: 5,
    question: 'Question Text',
    answer: 69.42,
    comment: null,
    minDelta: 0,
    maxDelta: 0,
    tags: [],
    playerAnswers: [],
    games: [],
    meanSquaredError: 0,
    version: 1,
    createdAt: new Date('2025-11-28'),
    updatedAt: new Date('2025-11-28'),
  },
];
export const mockPlayers: Player[] = [
  {
    id: '1',
    displayName: 'Player 1',
    score: 0,
    gamesParticipated: [],
    answers: [],
    version: 1,
    createdAt: new Date('2025-11-28'),
    updatedAt: new Date('2025-11-28'),
  },
  {
    id: '2',
    displayName: 'Player 2',
    score: 0,
    gamesParticipated: [],
    answers: [],
    version: 1,
    createdAt: new Date('2025-11-28'),
    updatedAt: new Date('2025-11-28'),
  },
  {
    id: '3',
    displayName: 'Player 3',
    score: 0,
    gamesParticipated: [],
    answers: [],
    version: 1,
    createdAt: new Date('2025-11-28'),
    updatedAt: new Date('2025-11-28'),
  },
  {
    id: '4',
    displayName: 'Player 4',
    score: 0,
    gamesParticipated: [],
    answers: [],
    version: 1,
    createdAt: new Date('2025-11-28'),
    updatedAt: new Date('2025-11-28')
  },
  {
    id: '5',
    displayName: 'Player 5',
    score: 0,
    gamesParticipated: [],
    answers: [],
    version: 1,
    createdAt: new Date('2025-11-28'),
    updatedAt: new Date('2025-11-28')
  },
  {
    id: '6',
    displayName: 'Player 6',
    score: 0,
    gamesParticipated: [],
    answers: [],
    version: 1,
    createdAt: new Date('2025-11-28'),
    updatedAt: new Date('2025-11-28')
  },
];
export const getMockPlayerAnswers = (gameId: number, questions: Question[], players: Player[]): PlayerAnswer[] => {
  return Array(questions.length * players.length)
    .fill(1)
    .map((_, index) => {
      const question = questions[Math.trunc(index / players.length)];
      const player = players[index % players.length];
      let delta = Math.trunc((Math.random() * question.answer * 2 - question.answer) * 100) / 100;
      if (Math.random() < 0.1) {
        delta = 0;
      }
      return {
        id: index + 1,
        version: 1,
        questionId: question.id,
        playerId: player.id,
        gameId,
        value: question.answer + delta,
        deviation: Math.abs(delta),
        question: null,
        player: null,
        game: null,
        createdAt: new Date('2025-11-28'),
        updatedAt: new Date('2025-11-28'),
      };
    });
};
