import {
  IDeleteCell,
  IInsertCellAfter, IInsertCellPayload,
  IMoveCell,
  IMoveCellPayload,
  IUpdateCell, IUpdateCellPayload
} from '../actions';

import {ActionTypes} from '../action-types';

export const moveCell = (payload: IMoveCellPayload): IMoveCell => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload
  }
}

export const deleteCell = (payload: string): IDeleteCell => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload
  }
}

export const insertCellAfter = (payload: IInsertCellPayload): IInsertCellAfter => {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload
  }
}

export const updateCell = (payload: IUpdateCellPayload): IUpdateCell => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload
  }
}