import './map3_withZoomPan.css';
import * as d3 from "d3";
import * as topojson from "topojson";

//https://bl.ocks.org/mbostock/9656675
//A variant of the Zoom to Bounding Box example that uses zoom transitions to smoothly interpolate between different views. This example also allows you to freely pan and zoom with the mouse (or touch).
export default () => {
    var width = 960,
        height = 500,
        active = d3.select(null);

    var projection = d3.geoAlbersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

    var zoom = d3.zoom()
        .scaleExtent([1, 8])
        //.translateExtent([[-width, -height], [width*2, height*2]])
        .on("zoom", zoomed);

    var path = d3.geoPath()
        .projection(projection);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .on("click", stopped, true);

    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
        .on("click", reset);

    var g = svg.append("g");

    svg.call(zoom) // delete this line to disable free zooming

    d3.json("/data/geo/us.json", function(error, us) {
        if (error) throw error;

        g.selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("d", path)
            .attr("class", "feature")
            .on("click", clicked);

        g.append("path")
            .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("class", "mesh")
            .attr("d", path);
    });

    function clicked(d) {
        if (active.node() === this) return reset();
        active.classed("active", false);
        active = d3.select(this).classed("active", true);

        var bounds = path.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
            translate = [width / 2 - scale * x, height / 2 - scale * y];

        svg.transition()
            .duration(750)
            .call(zoom.transform, d3.zoomIdentity
                .translate(translate[0], translate[1])
                .scale(scale));
    }

    function reset() {
        active.classed("active", false);
        active = d3.select(null);

        svg.transition()
            .duration(750)
            .call(zoom.transform, d3.zoomIdentity);
    }

    function zoomed() {
        g.attr("transform", d3.event.transform);
        g.style("stroke-width", 1.5 / d3.event.transform.k + "px");
    }

    // If the drag behavior prevents the default click,
    // also stop propagation so we don’t click-to-zoom.
    function stopped() {
        if (d3.event.defaultPrevented) d3.event.stopPropagation();
    }
}