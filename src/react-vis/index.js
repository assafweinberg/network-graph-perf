import React from 'react';

import './force-directed.css';
import ForceDirectedGraph from './force-directed-graph';

function getData(nodeCount, withEdges = false) {
    let data = { nodes: [], links: [] };

    for (let i = 0; i < nodeCount; i += 1) {
        data.nodes.push({ id: `node${i}`, group: i % 3, color: i % 3 }); //id, group, color
    }

    if (withEdges) {
        const nodeName = `node5`;
        for (let j = 1; j < nodeCount - 1; j += 1) {
            data.links.push({
                source: nodeName,
                target: `node${j}`,
                value: Math.round(Math.random() * 10)
            });
        }
    }

    return data;
}

const ForceDirectedExample = ({ nodeCount, edges, width, height }) => {
    const data = getData(nodeCount, edges);
    return (
        <div className="force-directed-example">
            <ForceDirectedGraph data={data} height={height} width={width} animation strength={1} />
        </div>
    );
};

export default ForceDirectedExample;
