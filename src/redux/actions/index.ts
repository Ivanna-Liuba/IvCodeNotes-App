import {ActionTypes} from '../action-types';
import type {CellTypes} from '../types/cell';

export interface IMoveCellPayload {
  id: string,
  direction: "up" | "down"
}

export interface IInsertCellPayload {
  id: string | null
  type: CellTypes
}

export interface IUpdateCellPayload {
  id: string
  content: string
}

export  interface IMoveCell {
  type: ActionTypes.MOVE_CELL,
  payload: IMoveCellPayload
}

export interface IDeleteCell {
  type: ActionTypes.DELETE_CELL,
  payload: string
}


export interface IInsertCellAfter {
  type: ActionTypes.INSERT_CELL_AFTER,
  payload: IInsertCellPayload
}

export interface IUpdateCell {
  type: ActionTypes.UPDATE_CELL,
  payload: IUpdateCellPayload
}

export interface IBundleStart {
  type: ActionTypes.BUNDLE_START,
  payload: {
    cellId: string
  }
}

export interface IBundleComplete {
  type: ActionTypes.BUNDLE_COMPLETE,
  payload: {
    cellId: string,
    bundle: {
      code: string,
      err: string
    }
  }
}

export type CellAction =
  | IMoveCell
  | IDeleteCell
  | IInsertCellAfter
  | IUpdateCell

export type BundleAction =
  | IBundleStart
  | IBundleComplete