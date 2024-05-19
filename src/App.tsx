import { Component, ReactNode, useState } from "react";
import { node, grid } from "../src/types/types";
import "./App.css";
import { Cell } from "./Cell";
import { dijkstra } from "./dijkstra";
interface IState {
  nodes: Array<node[]>;
  IsLeftMousePressed: boolean;
  startandTargetState: boolean;
  dragnode: string;
  startnode: node;
  endnode: node;
}
interface IProps {}
class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      nodes: [],
      startnode: {
        colidex: 0,
        rowide: 0,
        IsEnd: false,
        IsStart: false,
        IsVisited: false,
        IsWall: false,
        distance:0,
        prev:null,
        wieght:1,
        IsPath:false
      },
      IsLeftMousePressed: false,
      startandTargetState: false,
      endnode: {
        colidex: 0,
        rowide: 0,
        IsEnd: false,
        IsStart: false,
        IsVisited: false,
        IsWall: false,
        distance:Infinity,
        prev:null,
        wieght:1,
        IsPath:false
        
        
      },
      dragnode: "",
    };
  }
  setkeystate = (e: any) => {
    if (e.type === "mousedown")  {
      this.setState({ IsLeftMousePressed: true });
    }
  };
  setwreleae = (e: any) => {
    if (e.type === "mouseup") {
      this.setState({ IsLeftMousePressed: false });
    }
  };
  ondragend = (e: any) => {
    console.log('ondragover');
    this.setState({IsLeftMousePressed:false})  
    }
  
  setnode = () => {
    let rows = [];

    for (let row = 0; row < 15; row++) {
      let columns = [];
      for (let col = 0; col < 40; col++) {
        const newnode: node = {
          colidex: col,
          rowide: row,
          IsVisited: false,
          IsWall: false,
          IsStart: false,
          IsEnd: false,
          distance:Infinity,
          prev:null,
          wieght:1,
          IsPath:false,

        };
        columns.push(newnode);
      }
      rows.push(columns);
    }
    rows[5][0] = {
      ...rows[5][0],
      IsStart: true,distance:0
    };
    rows[5][20] = {
      ...rows[5][20],
      IsEnd: true,distance:Infinity
    };
    this.setState({ nodes: rows });
    this.setState({ startnode: rows[5][0] });
    this.setState({ endnode: rows[5][20] });
  };
  
  animate:any=()=>{
    const {nodes,endnode,startnode} = this.state
    const shallowgraph = [...nodes.flat()]
      const [Path,visited] =dijkstra(shallowgraph,startnode,endnode,15,40)
      for(let i =0; i<visited.length;i++){
        
        setTimeout(()=>{
          const {rowide,colidex} = visited[i]
          const newvisitedgraph = [...this.state.nodes]
          newvisitedgraph[rowide][colidex] = {...newvisitedgraph[rowide][colidex],IsVisited:true}
  
          this.setState({nodes:newvisitedgraph})
        },i*20)

      }
      for(let i =0; i<Path.length;i++){
        
        setTimeout(()=>{
          const {rowide,colidex} = Path[i]
          const newvisitedgraph = [...this.state.nodes]
          newvisitedgraph[rowide][colidex] = {...newvisitedgraph[rowide][colidex],IsPath:true}
  
          this.setState({nodes:newvisitedgraph})
        },(visited.length*20)+(i*10))

      }
      
    }
  setwall: any = (e: MouseEvent, cellprops: node) => {
    if (cellprops.IsStart || cellprops.IsEnd) return "";
    const togglewall: node[][] = this.state.nodes.map((index) => {
      return index.map((nval) => {
        if (
          nval.colidex === cellprops.colidex &&
          cellprops.rowide === nval.rowide
        ) {
          if (this.state.IsLeftMousePressed) {
            return { ...nval, IsWall: !nval.IsWall };
          }
        }
        return nval;
      });
    });

    this.setState({ nodes: togglewall });
  };

  setpoints(e: any, points: node) {
    e.preventDefault();
    this.setState({IsLeftMousePressed:false})
    const { dragnode, endnode, startnode } = this.state;
    if (points.IsWall) return "";
    if(points.IsEnd || points.IsStart) return "";
    const newgridcopy = this.state.nodes;

    const newpointrow = points.rowide;
    const newpointcol = points.colidex;
    if (dragnode === "start") {
      const newstartnode = {
        ...newgridcopy[newpointrow][newpointcol],
        IsStart: true,
        distance:0
      };
      newgridcopy[newpointrow][newpointcol] = newstartnode;
      newgridcopy[startnode.rowide][startnode.colidex] = {
        ...newgridcopy[startnode.rowide][startnode.colidex],
        IsStart: false,
        distance:Infinity
      };
      this.setState({ nodes: newgridcopy });

      this.setState({ startnode: newstartnode });
    } else if (dragnode === "end") {
      const newendnode = {
        ...newgridcopy[newpointrow][newpointcol],
        IsEnd: true,
      };
      newgridcopy[newpointrow][newpointcol] = newendnode;
      newgridcopy[endnode.rowide][endnode.colidex] = {
        ...newgridcopy[endnode.rowide][endnode.colidex],
        IsEnd: false,
      };
      this.setState({ endnode: newendnode });

    }
    this.setState({ nodes: newgridcopy });
    console.log(points);
  }
  dragstart(e: any) {
    this.setState({ dragnode: "start" ,IsLeftMousePressed:false});
  }
  dragend(e: any) {
    this.setState({ dragnode: "end" ,IsLeftMousePressed:false});
  }
  componentDidMount(): void {
    this.setnode();
  }
  render(): ReactNode {
    const table = this.state.nodes;
    return (
      <div className="container">
        <div className="nav">
          <h2>
            Dijkstra Visualizer
          </h2>
          <input type="button" onClick={(e)=>this.animate()} value="Go"/>
        </div>
        <div
          onMouseDown={(e) => this.setkeystate(e)}
          tabIndex={0}
          onMouseUp={(e) => this.setwreleae(e)}
          className="gird"
        >
          <table>
            <tbody>
              {table.map((value: node[]) => (
                <tr>
                  {value.map((nval) => (
                    <Cell
                      cellprops={nval}
                      setwall={(e, node) => this.setwall(e, node)}
                      resetpoints={(e, points) => this.setpoints(e, points)}
                      dragstart={(e) => this.dragstart(e)}
                      dragend={(e) => this.dragend(e)}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
   
      </div>
    );
  }
}

export default App;
