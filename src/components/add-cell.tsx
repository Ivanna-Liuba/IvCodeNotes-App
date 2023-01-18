import {FC} from 'react';
import {useActions} from '../hooks/use-actions';

interface IAddCellProps {
  prevCellId: string | null
  isVisible?: boolean
}

const AddCell: FC<IAddCellProps> = ({prevCellId, isVisible}) => {
  const {insertCellAfter} = useActions()

  const addTextEditor = () => {
    insertCellAfter({id: prevCellId, type: "text"})
  }

  const addCodeCell = () => {
    insertCellAfter({id: prevCellId, type: "code"})
  }

  return (
    <div className={`add-cell ${isVisible ? "is-visible" : ""}`}>
      <button onClick={addTextEditor} className="button is-small is-primary is-rounded">
        <span className="icon is-small">
          <i className="fa-solid fa-plus" />
        </span>
        <span> Text</span>
      </button>
      <button onClick={addCodeCell} className="button is-small is-primary is-rounded">
        <span className="icon is-small">
          <i className="fa-solid fa-plus" />
        </span>
        <span> Code</span>
      </button>
      <div className="add-cell-divider"/>
    </div>
  )
}

export default AddCell