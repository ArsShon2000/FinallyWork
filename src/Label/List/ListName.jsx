import React from "react";
import stylist from "./List.module.css"

let count = 0;

const ListName = (props) => {

  let renderElement = React.useMemo(() => {
    if (props.id_name === props.wIdNAme) {
      console.log(count++);
      console.log(props.number);
      return (
        <span>&nbsp;{props.number} &nbsp;</span>
      )
    }
  }, [props.id_name]);

  return (
    <span className="">
      {renderElement}
    </span>
  )
}


export default ListName