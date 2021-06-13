import React from "react";
import styles from "./Tree.module.css";
import TreeItem from "./TreeItem";

function getList(items, treeNodeStatus, onNodeToggle) {
  return (
    <ul className={styles.list}>
      {items?.map((item) => (
        <TreeItem
          key={item.id}
          id={item.id}
          text={item.name}
          hasChildren={!!item.columns}
          onToggle={onNodeToggle}
          expanded={treeNodeStatus && treeNodeStatus[item.id]}
        >
          {item.columns && getList(item.columns, treeNodeStatus, onNodeToggle)}
        </TreeItem>
      ))}
    </ul>
  );
}

function Tree({ items, treeNodeStatus, onNodeToggle }) {
  return <div>{getList(items, treeNodeStatus, onNodeToggle)}</div>;
}

export default Tree;
