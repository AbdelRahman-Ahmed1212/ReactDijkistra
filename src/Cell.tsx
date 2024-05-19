import { MouseEvent } from "react";
import { node } from "./types/types";
interface tableprops {
  cellprops: node;
  setwall: (e: any, etarget: node) => void;
  resetpoints: (e: any, point: node) => void;
  dragstart :(e:any)=>void
  dragend:(e:any)=>void
}
export const Cell = (props: tableprops) => {
  const cellprop = props.cellprops;
  const classNames = ` 
  ${cellprop.IsEnd ? "end " : ""} 
  ${cellprop.IsStart ? "start " : ""} 
  ${cellprop.IsVisited ? "visited " : ""} 
  ${cellprop.IsWall ? "wall " : ""}
  ${cellprop.IsPath ? "path " : ""}`;
  

  
  return (
    <>
      {props.cellprops.IsStart ? (
        <td
          className={classNames}
          onMouseEnter={(e) => props.setwall(e, props.cellprops)}
          onDrop={(e) => props.resetpoints(e, props.cellprops)}
          onDragOver={(e) => e.preventDefault()}
        >
          <div
            className="start"
            draggable
            onDrag={(e) => props.dragstart(e)}
          ></div>
        </td>
      ) : props.cellprops.IsEnd ? (
        <td
          className={classNames}
          onMouseEnter={(e) => props.setwall(e, props.cellprops)}
          onDrop={(e) => props.resetpoints(e, props.cellprops)}
          onDragOver={(e) => e.preventDefault()}
        >
          <div
            className="end"
            draggable
            onDrag={(e) => props.dragend(e)}
          ></div>
        </td>
      ) : (
        <td
          className={classNames}
          onMouseEnter={(e) => props.setwall(e, props.cellprops)}
          onDrop={(e) => props.resetpoints(e, props.cellprops)}
          onDragOver={(e) => e.preventDefault()}
        ></td>
      )}
    </>
  );
  
};
