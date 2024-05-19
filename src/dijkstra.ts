import { node } from "./types/types";

export const dijkstra = (
  graph: node[],
  start: node,
  end: node,
  numberofrows: number,
  numberofcols: number,
): Array<node[]> => {
  
  let flatendgrap: node[] = [...graph];
  let listofunvisited: node[] = flatendgrap.slice();
  var Path:any = [];
  var visited:node[] = [];
  while (listofunvisited.length != 0) {
    listofunvisited.sort((n1, n2) => n1.distance - n2.distance);
    const ndist = listofunvisited.shift()!;
  
    const shortestPath = (ndist.rowide * numberofcols) + ndist.colidex;
    const shortest = flatendgrap[shortestPath];
    var neighbours:node[] = [];
    visited.push(ndist);
    if(ndist.distance == Infinity){
      
      return [Path,visited];
      

    }
    if(shortest.colidex ===0){
      neighbours.push(
        flatendgrap[shortestPath + 1],
        flatendgrap[shortestPath + numberofcols],
        flatendgrap[shortestPath - numberofcols]

      )
     
    }
    else if(shortest.colidex === 39){
      neighbours.push(

        flatendgrap[shortestPath - 1],
        flatendgrap[shortestPath + numberofcols],
        flatendgrap[shortestPath - numberofcols]
      )

    }
    else{
      neighbours.push(
        flatendgrap[shortestPath + 1],
        flatendgrap[shortestPath - 1],
        flatendgrap[shortestPath + numberofcols],
        flatendgrap[shortestPath - numberofcols]
      )
    }
    if(shortest.IsEnd) {
      var current = end;
      while(current.prev != null){
        Path.push(current)
        current = current.prev

        
      }
   
      return [Path,visited];
    }
    for (const neighbour of neighbours) {
      if (!neighbour ||neighbour.IsWall) continue;
      const alt = neighbour.wieght + shortest.distance;
      if(alt < neighbour.distance){
        neighbour.distance = alt;
        neighbour.prev = shortest;
        
      }
    
    }
  }
  throw "not found"
};
