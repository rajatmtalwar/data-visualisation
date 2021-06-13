import clsx from "clsx";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DropArea.module.css";
import { ReactComponent as CloseIcon } from "./CloseIcon.svg";
import {
  addSelectedColumn,
  addSelectedRow,
  removeSelectedColumn,
  removeSelectedRow,
} from "../../features/visualise/analyticsSlice";

const DropZone = ({
  selectedItems,
  label,
  dragOverlayLabel,
  onItemDrop,
  onItemDelete,
}) => {
  const globalDrag = useSelector((state) => state.analytics.globalDrag);
  const [highlightForDrop, setHighlightForDrop] = useState(false);

  const onDragOver = (evt) => {
    evt.preventDefault();
  };

  const onDragEnter = () => {
    setHighlightForDrop(true);
  };
  const onDragLeave = () => {
    setHighlightForDrop(false);
  };

  const onDrop = (evt) => {
    evt.preventDefault();
    const data = evt.dataTransfer.getData("text/plain");
    onItemDrop && onItemDrop(JSON.parse(data));
  };

  const onDelete = (key, evt) => {
    onItemDelete && onItemDelete(key);
  };

  return (
    <div className={styles.columnWrapper}>
      <div className={styles.label}>{label}</div>
      <div
        className={styles.dropArea}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {[...Object.keys(selectedItems)]?.map((key) => (
          <span key={key} className={styles.columnToken}>
            {selectedItems[key]?.name}
            <button
              className={styles.deleteTokenButton}
              onClick={(evt) => {
                onDelete(key, evt);
              }}
            >
              <CloseIcon className={styles.deleteTokenIcon} />
            </button>
          </span>
        ))}
        {globalDrag && (
          <div
            className={clsx({
              [styles.dragOverlay]: true,
              [styles.highlightForDrop]: highlightForDrop,
            })}
          >
            {dragOverlayLabel}
          </div>
        )}
      </div>
    </div>
  );
};

function DropArea() {
  const dispatch = useDispatch();
  const selectedColumns = useSelector(
    (state) => state.analytics.selectedColumns
  );
  const selectedRows = useSelector((state) => state.analytics.selectedRows);

  const onColumnDrop = (item) => {
    dispatch(addSelectedColumn(item));
  };
  const onRowDrop = (item) => {
    dispatch(addSelectedRow(item));
  };
  const onColumnDelete = (key) => {
    dispatch(removeSelectedColumn(key));
  };
  const onRowDelete = (key) => {
    dispatch(removeSelectedRow(key));
  };
  return (
    <>
      <div className={styles.container}>
        <DropZone
          selectedItems={selectedColumns}
          label="Columns:"
          dragOverlayLabel="Drop Column"
          onItemDrop={onColumnDrop}
          onItemDelete={onColumnDelete}
        />
        <DropZone
          selectedItems={selectedRows}
          label="Rows:"
          dragOverlayLabel="Drop Row"
          onItemDrop={onRowDrop}
          onItemDelete={onRowDelete}
        />
      </div>
      <h3>Order Report</h3>
      <div>Selected Columns: {JSON.stringify(selectedColumns)}</div>
      <div>Selected Rows: {JSON.stringify(selectedRows)}</div>
    </>
  );
}

export default DropArea;
