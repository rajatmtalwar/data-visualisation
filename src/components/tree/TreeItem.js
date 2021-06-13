import React from "react";
import styles from "./TreeItem.module.css";
import { ReactComponent as Icon } from "./Chevron.svg";
import clsx from "clsx";

function TreeItem({ id, text, expanded, children, onToggle }) {
  const toggleExpand = (evt) => {
    evt.preventDefault();
    onToggle && onToggle({ nodeId: evt?.currentTarget?.dataset?.nodeId });
  };

  const onDragStart = (evt) => {
    evt.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        id: evt.currentTarget.dataset.nodeId,
        name: evt.currentTarget.dataset.nodeText,
      })
    );
  };
  return (
    <li className={styles.listItem}>
      <div
        className={clsx({
          [styles.container]: true,
          [styles.noChildren]: !children,
        })}
        data-node-id={id}
        data-node-text={text}
        onClick={toggleExpand}
        draggable={!children}
        onDragStart={onDragStart}
      >
        <div className={styles.iconContainer}>
          {children && (
            <Icon
              className={clsx({
                [styles.expandedIcon]: expanded,
                [styles.expandCollapseIcon]: true,
              })}
            />
          )}
        </div>
        {/* </div> */}
        <div className={styles.icon}>#</div>
        <div className={styles.text}>{text}</div>
      </div>
      {expanded && children}
    </li>
  );
}

export default TreeItem;
