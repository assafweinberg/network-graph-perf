import React, { useState, useEffect } from 'react';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import { getPerf } from '../utils';
import colaLayout from './colaLayout';
import coseLayout from './coseLayout';
import coseBilkent from 'cytoscape-cose-bilkent';
import cola from 'cytoscape-cola';

Cytoscape.use(coseBilkent);
Cytoscape.use(cola);

const layouts = {
    grid: {
        name: 'grid'
    },
    random: {
        name: 'random'
    },
    cose: coseLayout,
    cola: colaLayout
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

const CytoscapeGraph = ({ width, height }) => {
    const [nodeCount, setNodeCount] = useState(100);
    const [layout, setLayout] = useState('cose');
    const [data, setData] = useState(getData(nodeCount, true));
    const [perf, setPerf] = useState(0);

    function getData(nodeCount, edges) {
        const elements = [];
        for (let i = 0; i < nodeCount; i += 1) {
            elements.push({
                data: { id: `node${i}`, parent: `parent${i % 4}` }
            });
        }
        const parentCount = 4;
        for (let i = 0; i < parentCount; i++) {
            elements.push({
                data: { id: `${layout.name === 'grid' ? 'other' : 'parent'}${i}` }
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

    function layoutHandler(ev) {
        setLayout(ev.target.value);
    }

    function nodeCountHandler(ev) {
        setNodeCount(parseInt(ev.target.value));
        setData(getData(nodeCount, true));
    }

    function cyAccess(cy) {
        console.log('running cy');
        cy.on('click', 'node', function(ev) {
            console.log(ev, ev.target.data());
        });
    }

    useEffect(() => {
        setPerf(getPerf);
    });

    performance.mark('render-start');
    return (
        <div key={`${layout}_${nodeCount}`}>
            <div className="controls">
                <div className="control">
                    <select value={layout} onChange={layoutHandler}>
                        <option value="random">Random</option>
                        <option value="grid">Grid</option>
                        <option value="Cose-Bilkent">Grid</option>
                        <option value="Cola">Cola</option>
                    </select>
                </div>
                <div className="control">
                    <select value={nodeCount} onChange={nodeCountHandler}>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                        <option value="1000">1000</option>
                    </select>
                </div>
                <div className="control">
                    <div> Rendered in {perf}ms</div>
                </div>
            </div>
            <CytoscapeComponent
                elements={data}
                stylesheet={style}
                layout={layouts[layout]}
                style={{ width, height, backgroundColor: 'hsla(225, 68%, 78%, 1)' }}
                cy={cyAccess}
            />
        </div>
    );
};

export default CytoscapeGraph;
