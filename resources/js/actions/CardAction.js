import * as types from '../constants/CardTypes';

export function addCard(name) {
  return {
    type: types.ADD_CARD,
    name,
  };
}

export function deleteCard(id) {
  return {
    type: types.DELETE_CARD,
    id
  };
}

export function doCard(id) {
  return {
    type: types.DO_CARD,
    id,
  };
}