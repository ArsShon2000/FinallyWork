import React from "react";
let render = 0

export default React.memo(
function ListName (props) {

  let renderElement = React.useMemo(() => {
    if (props.id_name === props.wIdNAme) {
  console.warn("listname запрос " + ++render)
      return (
        <span>&nbsp;{props.number} &nbsp;</span>
      )
    }
  }, []);

  return (
    <div className="">
      {renderElement}
    </div>
  )
}, 
(props) => {
  if (props.id_name === props.wIdNAme) {
    return false;
  }
  else {
   return true;
}
}

)
