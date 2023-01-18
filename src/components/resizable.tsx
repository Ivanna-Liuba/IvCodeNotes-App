import {ResizableBox, ResizableBoxProps, ResizableBoxState} from 'react-resizable';
import {FC, ReactNode, useEffect, useState} from 'react';

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: ReactNode;
}

type ResizableBoxType = ResizableBoxProps & ResizableBoxState

const Resizable: FC<ResizableProps> = ({direction, children}) => {
  const [width, setWidth] = useState<number>(window.innerWidth)
  const [height, setHeight] = useState<number>(window.innerHeight)

  useEffect(() => {
    let timer: NodeJS.Timeout

    const listener = () => {
      if(timer) clearTimeout(timer)

      timer = setTimeout(() => {
        console.log("TIMER")
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
      }, 100)

    }

    window.addEventListener("resize", listener)

    return () => {
      window.removeEventListener("resize", listener)
    }

  }, [])

  const setValue = (): ResizableBoxType => {
    const horizontal: ResizableBoxType = {
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, height * 0.9],
      minConstraints: [Infinity, 40]
    }

    const vertical: ResizableBoxType = {
      className: "resize-horizontal",
      height: Infinity,
      width: width * 0.5,
      resizeHandles: ["e"],
      maxConstraints: [width * 0.9, Infinity],
      minConstraints: [width * 0.2, Infinity]
    }

    return direction === "horizontal" ? horizontal : vertical
  }

  return (
    <ResizableBox  {...setValue()} >
      {children}
    </ResizableBox>
  )
}

export default Resizable