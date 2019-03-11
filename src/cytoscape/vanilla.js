import React, { useState, useEffect } from 'react';
import Cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
Cytoscape.use(coseBilkent);

const layout = {
    name: 'cose-bilkent',
    animate: false
};

const style = [
    {
        selector: 'node',
        style: {
            'background-color': 'hsla(225, 51%, 52%, 1)',
            width: 10,
            height: 10
        }
    },

    {
        selector: ':parent',
        style: {
            'background-opacity': 0.333
        }
    },

    {
        selector: 'edge',
        style: {
            width: 1,
            'line-color': '#ad1a66'
        }
    }
];

function getData(nodeCount, withEdges = true) {
    const elements = [];
    const parentCount = 4;
    for (let i = 0; i < parentCount; i++) {
        elements.push({
            data: { id: `parent${i}` }
        });
    }
    for (let i = 0; i < nodeCount; i += 1) {
        elements.push({
            data: { id: `node${i}`, parent: `parent${i % 4}` }
        });
    }

    for (let i = 0; i < 1 - 1; i += 1) {
        const nodeName = `node${i}`;
        for (let j = i + 1; j < nodeCount; j += 1) {
            elements.push({ data: { source: nodeName, target: `node${i + 1}` } });
        }
    }

    return elements;
}

const CytoscapeGraph = ({ nodeCount, edges, width, height }) => {
    const [data, setData] = useState(getData(nodeCount, edges));
    const [selectedId, setSelectedId] = useState();

    function filter(data) {
        if (!selectedId) return data;

        return data.filter(datum => !datum.source || datum.source === selectedId);
    }

    useEffect(() => {
        const container = document.getElementById('cytoscapeContainer');
        const elements = filter(data);
        console.log('effect');
        window.cy = Cytoscape({
            container,
            layout,
            style,
            elements
        }).on('mouseover', 'node', event => {
            // setSelectedId(event.target.data().id);
        });
    });

    return (
        <div>
            <div>Selected: {selectedId}</div>
            <div id="cytoscapeContainer" style={{ width, height }} />;
        </div>
    );
};

export default CytoscapeGraph;
