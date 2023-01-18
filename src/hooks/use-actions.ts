import {useMemo} from 'react';
import {useAppDispatch} from './use-redux-hooks';
import {bindActionCreators} from 'redux';

import { actionCreators } from "../redux"

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch)
  }, [dispatch])
}