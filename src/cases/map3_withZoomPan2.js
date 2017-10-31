import './map3_withZoomPan2.css';
import * as d3 from "d3";
import * as topojson from "topojson";

//https://bl.ocks.org/mbostock/2206340
//mousewheel-zoom + click-to-center
export default () => {
    var width = 960,
        height = 500;

    var projection = d3.geoAlbersUsa()
        .scale(1070)
        .translate([width / 2, height / 2]);

    var path = d3.geoPath()
        .projection(projection);

    var zoom = d3.zoom()
        // .translate(projection.translate())
        // .scale(projection.scale())
        .on("zoom", zoomed);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);


    var g = svg.append("g");
    g.call(zoom) // delete this line to disable free zooming
        //init transform
        .call(zoom.transform, d3.zoomIdentity.translate(projection.translate()[0], projection.translate()[1]).scale(projection.scale()));


    g.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height);

    d3.json("/data/geo/us.json", function(error, us) {
        if (error) throw error;

        g.append("g")
            .attr("id", "states")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("d", path)
            .on("click", clicked);

        g.append("path")
            .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("id", "state-borders")
            .attr("d", path);
    });

    function clicked(d) {
        var centroid = path.centroid(d),
            translate = projection.translate();

        projection.translate([
            translate[0] - centroid[0] + width / 2,
            translate[1] - centroid[1] + height / 2
        ]);

        //zoom.translate(projection.translate());
        //why? future
        g.call(zoom.transform, d3.zoomIdentity
            .translate(projection.translate()[0], projection.translate()[1])
            .scale(projection.scale()));

        g.selectAll("path").transition()
            .duration(700)
            .attr("d", path);
    }

    function zoomed() {
        var transform = d3.event.transform;
        projection.translate([transform.x, transform.y]).scale(transform.k);
        //why? future
        g.selectAll("path").transition().duration(700).attr("d", path);

    }
}