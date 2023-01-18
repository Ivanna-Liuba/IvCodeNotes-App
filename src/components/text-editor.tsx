import MDEditor from '@uiw/react-md-editor';
import {useState, useEffect, useRef, FC} from 'react';
import {ICell} from '../redux';
import {useActions} from '../hooks/use-actions';

interface ITextEditorProps {
  cell: ICell
}


const TextEditor: FC<ITextEditorProps> = ({cell}) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isEditor, setEditor] = useState<boolean>(false)
  const {updateCell} = useActions()

  useEffect(() => {
    const lister = (e: MouseEvent) => {
      if (
        editorRef.current
        && editorRef.current.contains(e.target as Node)
      ) return

      setEditor(false)
    }

    document.addEventListener("click", lister, { capture: true })

    return () => {
      document.removeEventListener("click", lister)

    }
  }, [])

  if (isEditor) {
    return (
      <div ref={editorRef} className="text-editor">
        <MDEditor
          value={cell.content}
          onChange={value => updateCell({id: cell.id, content: value || ""})}
        />
      </div>
    )
  }

  return (
    <div onClick={() => setEditor(true)} className="text-editor">
      <MDEditor.Markdown source={cell.content || "Click to edit"} style={{minHeight: "20px"}} />
    </div>
  )
}

export default TextEditor