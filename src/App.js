import React, { Component } from 'react';
import './App.css';
import Cytoscape from './cytoscape';
import ReactVis from './react-vis';

function showPerf() {
    performance.mark('render-end');
    performance.measure('render', 'render-start', 'render-end');
    var renderTime = performance.getEntriesByName('render')[0].duration;
    const time = parseFloat(renderTime).toFixed(3);
    document.getElementById('perf').innerHTML = time;
    performance.clearMeasures('render');
}
class App extends Component {
    componentDidUpdate() {
        showPerf();
    }

    componentDidMount() {
        showPerf();
    }

    state = { lib: 'cytoscape', nodeCount: 100, edges: true, renderTime: 0 };

    selectLibraryHandler = ev => {
        const lib = ev.target.value;
        this.setState({ lib });
    };

    nodeCountHandler = ev => {
        const nodeCount = parseInt(ev.target.value);
        this.setState({ nodeCount });
    };

    render() {
        performance.mark('render-start');
        let graph;
        const { nodeCount, edges } = this.state;
        const graphProps = {
            nodeCount,
            edges,
            width: 1000,
            height: 500
        };
        switch (this.state.lib) {
            case 'reactVis':
                graph = <ReactVis key={`reactVis-${nodeCount}`} {...graphProps} />;
                break;
            default:
                graph = <Cytoscape key={`cytoscape-${nodeCount}`} {...graphProps} />;
                break;
        }

        return (
            <div className="app">
                <div className="control">
                    <select value={this.state.lib} onChange={this.selectLibraryHandler}>
                        <option value="cytoscape">Cytoscape</option>
                        <option value="reactVis">React-vis</option>
                    </select>
                </div>
                <div className="control">
                    <select value={this.state.nodeCount} onChange={this.nodeCountHandler}>
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
                    <div>
                        Rendered in <span id="perf" />
                        ms
                    </div>
                </div>

                <div>{graph}</div>
            </div>
        );
    }
}

export default App;
