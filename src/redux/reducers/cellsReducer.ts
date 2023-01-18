import {CellAction as Action} from '../actions';
import {ActionTypes} from '../action-types';
import {ICell} from '../../redux';
import produce from 'immer';

interface IState {
  loading: boolean
  error: string | null
  order: string[]
  data: {
    [key: string]: ICell
  }
}

const initialState: IState = {
  loading: false,
  error: null,
  order: ["1", "2"],
  data: {
    "1": {
      id: "1",
      type: "text",
      content: ""
    },

    "2": {
      id: "2",
      type: "code",
      content: "cv"
    }
  }
}

export const cellsReducer = produce((state: IState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.MOVE_CELL:
      const { direction } = action.payload
      const index = state.order.findIndex(orderId => orderId === action.payload.id)
      const targetIndex = direction === "up" ? index - 1 : index + 1

      if(targetIndex < 0 || targetIndex > state.order.length - 1) return

      state.order[index] = state.order[targetIndex]
      state.order[targetIndex] = action.payload.id

      return

    case ActionTypes.DELETE_CELL:
      const {payload} = action
      delete state.data[payload]
      state.order = state.order.filter(id => id !== payload)
      return

    case ActionTypes.INSERT_CELL_AFTER:
      const cell: ICell = {
        id: randomId(),
        type: action.payload.type,
        content: ""
      }

      state.data[cell.id] = cell

      const insertionIndex = state.order.findIndex(id => id === action.payload.id)

      if(insertionIndex < 0) {
        state.order.unshift(cell.id)
      } else {
        state.order.splice(insertionIndex + 1, 0, cell.id)
      }
      return

    case ActionTypes.UPDATE_CELL:
      const {id, content} = action.payload
      state.data[id].content = content
      return

    default:
      return state
  }
}, initialState)

const randomId = () => {
  return Math.random().toString(36)
}


/*
const reducer = produce((state: CellsState = initialState, action: Action) => {
...
}
}, initialState);
*/
