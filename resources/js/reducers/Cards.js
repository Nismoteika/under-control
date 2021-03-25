import * as types from '../constants/CardTypes';
import { omit, assign, mapValues } from 'lodash';
// import assign from 'lodash/object/assign';
// import mapValues from 'lodash/object/mapValues';

const initialState = {
  cards: [1, 2, 3],
  cardsById: {
    1: {
      id: 1,
      name: 'audio play'
    },
    2: {
      id: 2,
      name: 'audio stop'
    },
    3: {
      id: 3,
      name: 'audio next'
    }
  }
};

export default function cards(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CARD:
      const newId = state.cards[state.cards.length - 1] + 1;
      return {
        cards: state.cards.concat(newId),
        cardsById: {
          ...state.cardsById,
          [newId]: {
            id: newId,
            name: action.name
          }
        }
      };
    case types.DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter(id => id !== action.id),
        cardsById: omit(state.cardsById, action.id)
      };

    case types.DO_CARD:
      return {
        ...state,
        cardsById: mapValues(state.cardsById, card => {
          return card.id === action.id
            ? assign({}, card, { starred: !card.starred })
            : card;
        })
      };
    default:
      return state;
  }
}
