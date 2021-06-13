import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropArea from "../../components/dropArea/DropArea";
import Tree from "../../components/tree/Tree";
import styles from "./Analytics.module.css";
import { fetchTables, setGlobalDrag, toggleTableNode } from "./analyticsSlice";

function Analytics() {
  const tables = useSelector((state) => state.analytics.tables);
  const treeNodeStatus = useSelector((state) => state.analytics.treeNodeStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  const onNodeToggle = ({ nodeId }) => {
    dispatch(toggleTableNode(nodeId));
  };
  const onDragStart = (params) => {
    dispatch(setGlobalDrag(true));
  };
  const onDragEnd = (params) => {
    dispatch(setGlobalDrag(false));
  };
  return (
    <div>
      <header className={styles.header}>
        <h1>Visual Analytics</h1>
      </header>
      <div
        className={styles.container}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className={styles.sidebar}>
          <h2 className={styles.sectionHeading}>Tables</h2>
          <Tree
            items={tables}
            onNodeToggle={onNodeToggle}
            treeNodeStatus={treeNodeStatus}
          ></Tree>
        </div>
        <div className={styles.main}>
          <DropArea />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
