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
// import SortableTree from "react-sortable-tree";
// import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import SortableTree from "@nosferatu500/react-sortable-tree";
import "@nosferatu500/react-sortable-tree/style.css";
import "./AppReactTree.scss";

export default class AppReactTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        {
          title: "Size",
          children: [
            { title: "S" },
            { title: "M" },
            { title: "L" },
            { title: "XL" },
          ],
        },
        {
          title: "Metal",
          children: [
            { title: "Gold" },
            { title: "Silver" },
            { title: "Platinum" },
          ],
        },
        {
          title: "Gold Purity",
          children: [{ title: "14KT" }, { title: "18KT" }, { title: "22KT" }],
        },
        {
          title: "Diamond",
          children: [
            { title: "IJ-SI" },
            { title: "JK-VSSI" },
            { title: "GH-VSSI" },
            { title: "EF-VSS" },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <div style={{ height: "400px" }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={(treeData) => this.setState({ treeData })}
          isVirtualized={false}
        />
      </div>
    );
  }
}
