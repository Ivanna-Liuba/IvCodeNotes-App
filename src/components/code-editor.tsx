import Editor, {OnChange, useMonaco} from '@monaco-editor/react';
import {FC} from 'react';
import prettier from "prettier"
import parser from "prettier/parser-babel"
/*import {parse} from "@babel/parser"; //TODO: delete
import traverse from "@babel/traverse"; //TODO: delete
import Highlighter from "monaco-jsx-highlighter" */

interface CodeEditorProps {
  initialValue: string
  onChange: (data: string) => void
}

const CodeEditor: FC<CodeEditorProps> = ({initialValue, onChange}) => {
  const monacoEditor = useMonaco()

  const changeHandler: OnChange = (value, _) => {
    onChange(value || "")


    // const hightlighter = new Highlighter(
    //   // @ts-ignore
    //   window.monaco,
    //   parse,
    //   traverse,
    //   monacoEditor
    // )
    //
    // hightlighter.highlightOnDidChangeModelContent(100)
  }

  const onFormat = () => {
    if (monacoEditor) {
      //getModels, cuz getModel requires "uri" as an arg
      const unformated = monacoEditor.editor.getModels()[0].getValue()
      //const unformated = ""
      const formated = prettier
        .format(unformated, {
          plugins: [parser],
          parser: "babel",
          useTabs: false,
          semi: true,
          singleQuote: true
      }).replace(/\n$/, "")

      monacoEditor.editor.getModels()[0].setValue(formated)
    }

    console.log("monacoEditor", monacoEditor)
  }

  return (
    <div className="editor-wrapper">
      <button
        onClick={onFormat}
        className="button button-format is-primary is-small"
      >
        Format
      </button>
      <Editor
        onChange={changeHandler}
        value={initialValue}
        height="100%"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: {enabled: false},
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2
        }}
      />
    </div>

  )
}

export default CodeEditor