import {FC} from 'react';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import {ICell} from '../redux';
import ActionBar from './action-bar';
import AddCell from './add-cell';

interface ICellListItemPops {
  cell: ICell
}

const CellListItem: FC<ICellListItemPops> = ({cell}) => {
  let child: JSX.Element
  if(cell.type === "code") {
    child = (
      <>
        <div className="action-bar-placeholder"/>
        <CodeCell cell={cell}/>
      </>
    )
  } else {
    child = <TextEditor cell={cell}/>
  }
  return (
    <div className="cell-list-item">
      {child}
      <ActionBar id={cell.id}/>
    </div>
  )
}

export default CellListItem