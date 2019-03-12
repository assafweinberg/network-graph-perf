export function showPerf() {
    performance.mark('render-end');
    performance.measure('render', 'render-start', 'render-end');
    var renderTime = performance.getEntriesByName('render')[0].duration;
    const time = parseFloat(renderTime).toFixed(3);
    document.getElementById('perf').innerHTML = time;
    performance.clearMeasures('render');
}

export function getPerf() {
    performance.mark('render-end');
    performance.measure('render', 'render-start', 'render-end');
    var renderTime = performance.getEntriesByName('render')[0].duration;
    const time = parseFloat(renderTime).toFixed(3);
    performance.clearMeasures('render');
    return time;
}

