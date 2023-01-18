import {Dispatch, ActionCreator, Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {ActionTypes} from '../action-types';


import bundle from '../../bundler';

export const createBundle = ({cellId, input}: {cellId: string, input: string}) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.BUNDLE_START,
      payload: {
        cellId
      }
    })

    const result = await bundle(input)

    dispatch({
      type: ActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          err: result.err
        }
      }
    })
  }
}
