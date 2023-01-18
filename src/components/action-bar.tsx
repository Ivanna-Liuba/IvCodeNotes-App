import {FC, MouseEvent} from 'react';
import {useActions} from '../hooks/use-actions';
import ActionBarBtn from './action-bar-btn';

interface IActionBarProps {
  id: string
}

const ActionBar: FC<IActionBarProps> = ({id}) => {
  const {deleteCell, moveCell} = useActions()

  return (
    <div className="action-bar">
      <ActionBarBtn todo={() => moveCell({id, direction: "up"})} icon="fa-arrow-up"/>
      <ActionBarBtn todo={() => moveCell({id, direction: "down"})} icon="fa-arrow-down"/>
      <ActionBarBtn todo={() => deleteCell(id)} icon="fa-trash"/>
    </div>
  )
}

export default ActionBar