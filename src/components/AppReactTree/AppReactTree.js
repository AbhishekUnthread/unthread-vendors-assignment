// import React, { Component } from "react";
// import SortableTree from "react-sortable-tree";
// import "react-sortable-tree/style.css"; // This only needs to be imported once in your app

// const treeData = [
//   { title: "Chicken", children: [{ title: "Egg" }] },
//   { title: "Fish", children: [{ title: "fingerline" }] },
// ];

// const AppReactTree = () => {
//   const [state, setState] = React.useState(treeData);

//   return (
//     <div style={{ height: 400 }}>
//       <SortableTree
//         treeData={state}
//         onChange={(treeData) => setState({ treeData })}
//       />
//     </div>
//   );
// };

// export default AppReactTree;

import React, { Component } from "react";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import "./AppReactTree.scss";

export default class AppReactTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        { title: "Chicken", children: [{ title: "Egg" }] },
        { title: "Fish", children: [{ title: "fingerline" }] },
      ],
    };
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={(treeData) => this.setState({ treeData })}
          isVirtualized={false}
        />
      </div>
    );
  }
}
