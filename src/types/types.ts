export type node = {
    colidex:number,
    rowide:number,
    IsVisited : boolean,
    IsWall :boolean,
    IsStart:boolean,
    IsEnd:boolean,
    distance:number
    prev:node|null,
    wieght:number,
    IsPath:boolean
}
export type grid = {
   
    nodes :node[],
}