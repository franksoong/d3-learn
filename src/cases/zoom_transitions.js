import './zoom_transitions.css';
import * as d3 from "d3";

//https://bl.ocks.org/mbostock/b783fbb2e673561d214e09c7fb5cedee
//This example demonstrates smooth zoom transitions using d3-zoom. Every 2.5 seconds, a point is randomly selected, and the transform to position the selected point at the center of the viewport is computed:
export default () => {
    var width = 960,
        height = 500;

    var canvas = d3.select("body").append("canvas")
        .attr("width", width)
        .attr("height", height);
    var context = canvas.node().getContext("2d"),
        width = canvas.property("width"),
        height = canvas.property("height"),
        radius = 2.5;

    var points = d3.range(1000).map(phyllotaxis(10)),
        point = points.pop();

    var zoom = d3.zoom()
        .on("zoom", zoomed);

    canvas
        .call(zoom.transform, transform)
        .call(transition);

    function zoomed() {
        context.save();
        context.clearRect(0, 0, width, height);
        context.translate(d3.event.transform.x, d3.event.transform.y);
        context.scale(d3.event.transform.k, d3.event.transform.k);
        drawPoints();
        context.restore();
    }

    function drawPoints() {
        context.beginPath();
        points.forEach(drawPoint);
        context.fillStyle = "#000";
        context.fill();

        context.beginPath();
        drawPoint(point);
        context.fillStyle = "#f00";
        context.fill();
        context.stroke();
    }

    function drawPoint(point) {
        context.moveTo(point[0] + radius, point[1]);
        context.arc(point[0], point[1], radius, 0, 2 * Math.PI);
    }

    function transform() {
        return d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(8)
            .translate(-point[0], -point[1]);
    }

    function transition(canvas) {
        var n = points.length,
            i = Math.random() * n | 0,
            c = points[i]; // Pick a random point.

        points[i] = points[n - 1];
        points[n - 1] = point;
        point = c;

        canvas.transition()
            .delay(500)
            .duration(3000)
            .call(zoom.transform, transform)
            .on("end", function() { canvas.call(transition); });
    }

    function phyllotaxis(radius) {
        var theta = Math.PI * (3 - Math.sqrt(5));
        return function(i) {
            var r = radius * Math.sqrt(i),
                a = theta * i;
            return [
                width / 2 + r * Math.cos(a),
                height / 2 + r * Math.sin(a)
            ];
        };
    }

}