import './map1.css';
import * as d3 from "d3";
import * as topojson from "topojson";


export default () => {
  d3.select('body').append('svg')
  .attr('width', 960)
  .attr('height', 960);

  var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

  var projection = d3.geoAzimuthalEqualArea()
      .scale(239)
      .translate([width / 2, height / 2])
      .precision(0.1);

  var path = d3.geoPath()
      .projection(projection);

  var graticule = d3.geoGraticule();

  svg.append("defs").append("path")
      .datum({type: "Sphere"})
      .attr("id", "sphere")
      .attr("d", path);

  svg.append("use")
      .attr("class", "stroke")
      .attr("xlink:href", "#sphere");

  svg.append("use")
      .attr("class", "fill")
      .attr("xlink:href", "#sphere");

  svg.append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);

  d3.json("/data/geo/00world-50m.json", function(error, world) {
    if (error) throw error;

    svg.insert("path", ".graticule")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);

    svg.insert("path", ".graticule")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
        .attr("class", "boundary")
        .attr("d", path);
  });

}