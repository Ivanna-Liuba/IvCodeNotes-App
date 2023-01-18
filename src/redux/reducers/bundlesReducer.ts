import  {ActionTypes} from '../action-types';
import type {BundleAction} from '../actions';
import produce from 'immer';

interface IState {
  [key: string]: {
    loading: boolean
    code: string
    err: string
  } | undefined
}

const initialState: IState = {}

export const bundlesReducer = produce((state = initialState, action: BundleAction) => {
  switch (action.type) {
    case ActionTypes.BUNDLE_START:
      state[action.payload.cellId] = {
        loading: true,
        code: "",
        err: ""
      }
      return

    case ActionTypes.BUNDLE_COMPLETE:
      const {cellId, bundle: {code, err}} = action.payload
      state[cellId] = {
        loading: false,
        code,
        err
      }
      return

    default:
      return state
  }
}, initialState)

export {}