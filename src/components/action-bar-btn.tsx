import {FC, MouseEvent} from 'react';

interface IButtonProps {
  todo: (e: MouseEvent<HTMLButtonElement>) => void
  icon: string
}
const ActionBarBtn: FC<IButtonProps> = ({todo, icon}) => {
  return (
    <button
      onClick={todo}
      className="button is-primary is-small"
    >
        <span className="icon">
          <i className={` fa-solid ${icon}`}/>
        </span>
    </button>
  )
}

export default ActionBarBtn