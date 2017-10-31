import './transformTransitions.css';
import * as d3 from "d3";


//https://bl.ocks.org/mbostock/1345853
//D3 2.5.0 supports matrix decomposition for animating 2D transforms. Any SVG transform attribute is decomposed into a canonical representation of translate, rotate, scale and skew. This allows two arbitrary transforms of different types to be transitioned smoothly—say from a simple translate to a scale plus rotate. These features are supported automatically by your browser for CSS3 transitions, but now you can have them in JavaScript for SVG, too!
export default () => {
    var w = 960,
        h = 500,
        z = 20, //block
        x = w / z,
        y = h / z;

    var svg = d3.select("body").append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(d3.range(x * y))
        .enter().append("rect")
        .attr("transform", translate)
        .attr("width", z)
        .attr("height", z)
        .style("fill", function(d) { return d3.hsl(d % x / x * 360, 1, Math.floor(d / x) / y); })
        .on("mouseover", mouseover);

    function translate(d) {
        //compute order, row first
        return "translate(" + (d % x) * z + "," + Math.floor(d / x) * z + ")";
    }

    function mouseover(d) {
        this.parentNode.appendChild(this);

        d3.select(this)
            .style("pointer-events", "none")
            .transition()
            .duration(750)
            .attr("transform", "translate(480,480)scale(23)rotate(180)")
            .transition()
            .delay(1500)
            .attr("transform", "translate(240,240)scale(0)")
            .style("fill-opacity", 0)
            .remove();
    }
}