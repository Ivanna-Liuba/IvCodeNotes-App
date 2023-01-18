import {FC, useEffect, useRef} from 'react';

interface PreviewProps {
  code: string,
  bundlingStatus: string
}

const html  = `
      <html>
        <head></head>
        <body>
          <div id="root"></div>
          <script>
            const handleErr = (err) => {
              const root = document.querySelector("#root")
              root.innerHTML = "<div style='color: red'><h1>Runtime Error</h1>" + err + "</div>"
              //console.log(err)
            }
            window.addEventListener("error", (e) => {
              e.preventDefault()
              handleErr(e.error)
            })
            
            window.addEventListener("message", (e) => {
              console.log(e)
              try {
                eval(e.data)
              } catch (err) {
                handleErr(err)
              }
             
              }, false)
          </script>
        </body>
      </html>
  `

const Preview: FC<PreviewProps> = ({code, bundlingStatus}) => {
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    frameRef.current!.srcdoc = html
    setTimeout(() => {
      frameRef.current!.contentWindow!.postMessage(code, "*") // code = result.outputFiles[0].text

    }, 50)
  }, [code])
  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={frameRef}
      />

      {bundlingStatus && (
        <div className="preview-error error">
          <h1>
            <b>Error:</b>
            <br />
            {bundlingStatus}
          </h1>
        </div>
      )}
    </div>
  )
}

export default Preview