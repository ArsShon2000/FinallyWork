import React from "react";
import stylist from "./List.module.css"


const ListName = (props) => {
  let renderElement= () => {
    if(props.id_name === props.wIdNAme)
       return (<div>
        <table  className={stylist.maintableCN}>
          <table  className={stylist.tableCN}>
            <tbody >
              <tr>
                <th className={stylist.thCN} >
                  <span>{props.number}&nbsp;</span>
                </th>
              </tr>
            </tbody>
          </table>
        </table>
       </div>)
 }

      return (
        <view className="">
            {renderElement()}
          </view>
      )
  }
  
  
  export default ListName