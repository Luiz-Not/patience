import { UNHIDDE_CARDS, UPDATE_CARDS } from "../actionTypes";
import { shuffle } from '../../utils'
import cards from '../../cards'
const shuffledCards = shuffle(cards)

const initialState = {
  pileCards: shuffledCards.slice(0, 24),
  droppable1: [],
  droppable2: [],
  droppable3: [],
  droppable4: [],
  droppable5: shuffledCards.slice(24, 25),
  droppable6: shuffledCards.slice(25, 27).map((card, index) => index === 1 ? { ...card } : { ...card, back: true }),
  droppable7: shuffledCards.slice(27, 30).map((card, index) => index === 2 ? { ...card } : { ...card, back: true }),
  droppable8: shuffledCards.slice(30, 34).map((card, index) => index === 3 ? { ...card } : { ...card, back: true }),
  droppable9: shuffledCards.slice(34, 39).map((card, index) => index === 4 ? { ...card } : { ...card, back: true }),
  droppable10: shuffledCards.slice(39, 45).map((card, index) => index === 5 ? { ...card } : { ...card, back: true }),
  droppable11: shuffledCards.slice(45, 52).map((card, index) => index === 6 ? { ...card } : { ...card, back: true }),
  multDrag: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UNHIDDE_CARDS: {
      const { droppableId } = action.payload;
      return {
        ...state,
        [droppableId]: state[droppableId].map(card => ({ ...card, hidden: false })),
        multDrag: []
      };
    }
    case UPDATE_CARDS: {
      const { cards } = action.payload;
      return {
        ...state,
        ...cards
      };
    }
    default:
      return state;
  }
}
