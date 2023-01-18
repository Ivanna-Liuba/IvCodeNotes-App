import {useAppSelector} from './use-redux-hooks';

export const useCumulativeCode = (cellId: string) => {
  //for getting access to prev code cells` variables
  const cumulativeCode = useAppSelector(state => {
    const { data, order } = state.cells

    const orderedCells = order.map(id => data[id])

    const cumulativeCode = []

    const showFunc = `
      import _React from "react"; 
      import _ReactDOM from "react-dom/client" 
      
      let show = (value) => {
        const root = document.getElementById('root')
        
        if (typeof value === "object") {
          if(value.$$typeof && value.props) {
            _ReactDOM.createRoot(root).render(value)
          } else {
            root.innerHTML = JSON.stringify(value)
          }
        } 
        root.innerHTML = value
      }
      `

    //redeclare show function not to show code from prev code-cell
    const showFuncNoOpt = `show = () => {}`

    for (let c of orderedCells) {
      if (c.type === "code") {

        if (c.id === cellId) {
          cumulativeCode.push(showFunc)
        } else {
          cumulativeCode.push(showFuncNoOpt)
        }
        cumulativeCode.push(c.content)
      }

      if (c.id === cellId) break
    }

    return cumulativeCode
  })

  return cumulativeCode
}