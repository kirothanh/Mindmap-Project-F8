/* eslint-disable react/display-name */
"use client"

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Controls,
  Background,
  MiniMap,
} from '@xyflow/react';
import TextUpdaterNode from "./TextUpdater";
import '@xyflow/react/dist/style.css';
import './Mindmap.css';

const mindmapApi = `${process.env.HOST_URL}/api/mindmap`;
const initialEdges = [];
const nodeTypes = { textUpdater: TextUpdaterNode };

const MindMap = ({ id: mapId }) => {
  const [selectedId, setSelected] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const connectingNodeId = useRef(null);
  const reactFlowWrapper = useRef(null);

  const { screenToFlowPosition } = useReactFlow();
  let id = 0;
  if (nodes?.length) {
    const ids = nodes.map((a) => a.id);
    id = Math.max(...ids) + 1;
  }

  const getId = useCallback(() => `${id++}`, [id]);

  const addNode = () => {
    setNodes((e) =>
      e.concat({
        id: (e.length + 1).toString(),
        data: { label: `${name}` },
        position: {
          x: Math.random() * 200,
          y: Math.random() * 200,
        },
        style: { border: "10px solid #9999" },
      })
    );
  };

  const onConnect = useCallback(
    (params) => {
      // reset the start node on connections
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Text ${id}` },
          origin: [0.5, 0.0],
          type: "textUpdater",
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [screenToFlowPosition, getId, setEdges, setNodes]
  );

  const connectionLineStyle = {
    stroke: "rgb(79 70 229)",
    strokeWidth: 3,
  };
  const defaultEdgeOptions = { style: connectionLineStyle, type: "default" };
  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Delete" && selectedId !== false && selectedId !== "0") {
        setNodes((nodes) => nodes.filter((node) => node.id !== selectedId));
        setEdges((edges) => edges.filter((edge) => edge.source !== selectedId));
      }
    });
  }, [selectedId, setNodes, setEdges]);

  const loadMap = useCallback(async () => {
    const response = await fetch(mindmapApi + "?id=" + mapId + "&auth=false");
    const { data } = await response.json();
    const map = data?.map ?? {};

    if (Object.keys(map).length) {
      setNodes(() => map.nodes);
      setEdges(() => map.edges);
    } else {
      setNodes(() => [
        {
          id: "0",
          position: { x: 100, y: 50 },
          data: { label: `My Mindmap` },
          origin: [0.5, 0.0],
          type: "textUpdater",
        },
      ]);
    }
  }, [setEdges, setNodes, mapId]);

  useEffect(() => {
    loadMap();
  }, [loadMap]);

  useEffect(() => {
    window.sessionStorage.setItem("mapdata", JSON.stringify({ nodes, edges }));
  }, [nodes, edges]);

  return (
    <div
      className="py-5"
      style={{ width: "100%", height: "500px" }}
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineStyle={connectionLineStyle}
        defaultEdgeOptions={defaultEdgeOptions}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2, minZoom: 0.5 }}
        nodeOrigin={[0.5, 0]}
        nodeTypes={nodeTypes}
        onNodeClick={(_, { id }) => {
          setSelected(id);
        }}
        onEdgeClick={(_, { id }) => {
          setSelected(id);
        }}
        deleteKeyCode={false}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === "input") return "blue";

            return "#FFCC00";
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default memo((props) => (
  <ReactFlowProvider>
    <MindMap {...props} />
  </ReactFlowProvider>
));
