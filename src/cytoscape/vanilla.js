import React, { useState, useEffect } from 'react';
import Cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import { showPerf } from '../utils';
import colaData from './cola-data';
import coseBilkentLayout from './coseLayout';
import colaLayout from './colaLayout';
import cola from 'cytoscape-cola';

Cytoscape.use(coseBilkent);
Cytoscape.use(cola);

const gridLayout = {
    name: 'grid',
    avoidOverlap: true
};

const randomLayout = {
    name: 'random'
};

const coseLayout = {
    name: 'cose'
};

const circleLayout = {
    name: 'circle'
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
    // {
    //     selector: 'node[group=2]',
    //     style: {
    //         'background-color': 'red'
    //     }
    // },
    // {
    //     selector: 'node[group=3]',
    //     style: {
    //         'background-color': 'blue'
    //     }
    // },
    // {
    //     selector: 'node[group=4]',
    //     style: {
    //         'background-color': 'yellow'
    //     }
    // },

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
const layout = coseBilkentLayout;

function getData(nodeCount) {
    const elements = [];

    for (let i = 0; i < nodeCount; i += 1) {
        let parentNum = Math.round(Math.random() * 3);
        elements.push({
            data: { id: `node${i}`, parent: `parent${parentNum}`, group: i % 5, label: 'hello' },
            classes: 'top-center'
        });
    }

    const parentCount = 4;
    for (let i = 0; i < parentCount; i++) {
        elements.push({
            data: { id: `parent${i}`, label: 'parent' }
        });
    }

    return elements;
}

const CytoscapeGraph = ({ nodeCount, edges, width, height }) => {
    const elements = getData(nodeCount);
    let selectedId;

    function getEdges(nodeId) {
        let elements = [];
        if (nodeId) {
            for (let j = 0; j < nodeCount; j += 1) {
                const target = `node${j}`;
                if (target !== nodeId)
                    elements.push({ data: { source: nodeId, target: `node${j}` } });
            }
        }
        return elements;
    }

    useEffect(() => {
        const container = document.getElementById('cytoscapeContainer');
        performance.mark('render-start');
        const cy = Cytoscape({
            container,
            layout,
            style,
            elements
        });
        window.cy = cy;
        cy.on('click', 'node', event => {
            selectedId = event.target.data().id;
            const selectedNode = cy.getElementById(selectedId);
            const parentId = selectedNode.data().parent;
            const siblings = cy.nodes(`[parent="${parentId}"]`);

            const all = cy
                .collection()
                .add(selectedNode)
                .add(siblings);

            cy.remove('edge');
            cy.add(getEdges(selectedId));

            const parent = cy.getElementById(parentId);
            const otherParents = cy.nodes(`node[!parent][id!="${parentId}"]`);
            const parentHeight = parent.outerHeight();
            const parentWidth = parent.outerWidth();
            const parentY = parentHeight / 2 + 20;
            const otherX = parentWidth + 100;
            const otherYs = [];
            let startY = 20;
            otherParents.forEach(el => {
                let height = el.outerHeight();
                startY += height / 2 + 20;
                otherYs.push(startY);
                startY += height / 2 + 20;
            });
            cy.batch(function() {
                cy.$('#j');
                parent.animate({ position: { x: 0, y: parentY } });
                otherParents.forEach((parent, i) => {
                    parent.animate({ position: { x: otherX, y: otherYs[i] } });
                });
            });

            setTimeout(function() {
                cy.fit(cy.nodes('node[!parent]'), 50);
            }, 500);

            // otherParents.animate({ position: { x: 100 } });
            // selectedNode.animate({ position: { x: 0, y: 20 } });

            // var layout = cy.layout(circleLayout);
        });

        showPerf();
    });

    return (
        <div>
            <div>Selected: {selectedId}</div>
            <div
                id="cytoscapeContainer"
                style={{ width, height, backgroundColor: 'hsla(225, 68%, 78%, 1)' }}
            />
            ;
        </div>
    );
};

export default CytoscapeGraph;
