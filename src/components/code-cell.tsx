import {useEffect, FC} from 'react';
import CodeEditor from './code-editor';
import Preview from './Preview';
import Resizable from './resizable';
import {ICell} from '../redux';
import {useActions} from '../hooks/use-actions';
import {useAppSelector} from '../hooks/use-redux-hooks';
import {useCumulativeCode} from '../hooks/use-cumulative-code';

interface ICodeCellProps {
  cell: ICell
}

const CodeCell: FC<ICodeCellProps> = ({cell}) => {
  const bundle = useAppSelector(state => state.bundles[cell.id])

  const cumulativeCode = useCumulativeCode(cell.id)

  const {updateCell, createBundle} = useActions()

  useEffect(() => {
    if(!bundle) {
      createBundle({cellId: cell.id, input: cumulativeCode.join("\n")}) //instead of cell.content
      return
    }

    const timer = setTimeout(()=> {
      createBundle({cellId: cell.id, input: cumulativeCode.join("\n")}) //instead of cell.content
    }, 1000)


    return () => {
      clearTimeout(timer)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content])



  return (
    <Resizable direction="horizontal">
      <div style={{height: "calc(100% - 10px)", display: "flex"}}>
        <Resizable direction="vertical">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => {
              updateCell({id: cell.id, content: value})
            }}
          />
        </Resizable>

        <div className="progress-wrapper">
        {!bundle || bundle.loading
          ?  (
              <div className="progress-cover">
                <progress className="progress is-small is-primary" max="100">
                  Loading ...
                </progress>
              </div>
          )
          : <Preview code={bundle.code} bundlingStatus={bundle.err}/>}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell