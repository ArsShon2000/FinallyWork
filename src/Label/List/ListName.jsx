import React from "react";
let render = 0

export default React.memo(
function ListName (props) {

  debugger
  let renderElement = React.useMemo(() => {
    if (props.id_name === props.wIdNAme) {
  console.log(++render)
      return (
        <span>&nbsp;{props.number} &nbsp;</span>
      )
    }
  });

  return (
    <div className="">
      {renderElement}
    </div>
  )
} 
)
