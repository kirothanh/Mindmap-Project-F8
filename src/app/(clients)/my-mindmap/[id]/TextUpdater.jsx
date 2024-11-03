import { useCallback, useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { Handle, Position, useReactFlow } from "@xyflow/react";

export default function TextUpdater({ data, isConnectable, ...rest }) {
  const { setNodes } = useReactFlow();
  const [disabled, setDisabled] = useState(true);

  const onChange = useCallback(
    (evt) => {
      if (evt.target.value) {
        const { id } = rest;
        setNodes((nodes) => {
          return nodes.map((item) => {
            if (item.id === id) {
              item.data.label = evt.target.value;
            }
            return item;
          });
        });
      }
    },
    [rest, setNodes]
  );

  return (
    <div className={clsx("text-updater-node", rest.id > 0 && "initial-node")}>
      {rest.id > 0 && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          id="node-target"
          className="mb-2"
        />
      )}
      <div>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className={clsx(!disabled && "nodrag editable")}
          defaultValue={data.label}
          readOnly={disabled}
          onDoubleClick={() => setDisabled(false)}
          onBlur={() => {
            setDisabled(true);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setDisabled(true);
            }
          }}
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        id="node-source"
      />
    </div>
  );
}
