import React, { useState } from 'react';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import coseBilkent from 'cytoscape-cose-bilkent';
Cytoscape.use(coseBilkent);

const layout = {
    name: 'cose-bilkent'
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
            'line-color': 'hsla(225, 37%, 36%, 1)'
        }
    }
];

function getData(nodeCount, edges) {
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

    if (edges) {
        for (let i = 0; i < 1; i += 1) {
            const nodeName = `node${i}`;
            for (let j = i + 1; j < nodeCount - 1; j += 1) {
                elements.push({ data: { source: nodeName, target: `node${j + 1}` } });
            }
        }
    }

    return elements;
}

const CytoscapeGraph = ({ nodeCount, edges, width, height }) => {
    const [data] = useState(getData(nodeCount, edges));

    // function eventHandler(cy) {
    //     cy.on('mouseover', 'node', function(ev) {
    //         var node = ev.cyTarget;
    //         console.log(ev, ev.target);
    //     });
    // }

    return (
        <CytoscapeComponent
            elements={data}
            stylesheet={style}
            layout={layout}
            style={{ width, height, backgroundColor: 'hsla(225, 68%, 78%, 1)' }}
            // cy={eventHandler}
        />
    );
};

export default CytoscapeGraph;
