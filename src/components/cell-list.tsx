import {FC, Fragment} from 'react';
import CellListItem from './cell-list-item';
import {useAppSelector} from '../hooks/use-redux-hooks';
import AddCell from './add-cell';

interface ICellListPops {

}

const CellList: FC<ICellListPops> = () => {
  const cells = useAppSelector(({cells: {order, data}}) => {
    return order.map(id => data[id])
  })

  return (
    <div className="cell-list">
      <AddCell prevCellId={null} isVisible={!cells.length}/>

      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <CellListItem cell={cell}/>
          <AddCell prevCellId={cell.id}/>
        </Fragment>
      ))}
    </div>
  )
}

export default CellList