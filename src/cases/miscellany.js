import './index.css';
import * as d3 from "d3";



//setup base env
var body = d3.select('body');
var width = 500;
var height = 500;

var svg = body.append('svg')
    .attr('width', width)
    .attr('height', height);



/*
// barchart

var dataset = [ 250 , 210 , 170 , 130 , 90 ];

var body=d3.select('body');


var width=500;
var height=500;

var svg=body.append('svg')
  .attr('width', width)
  .attr('height', height);

var rectHeight=25;

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', 20)
  .attr('y', function(d, i){
    return i*rectHeight;
  })
  .attr('width',function(d, i){
    return d;
  })
  .attr('height', rectHeight-2)
  .attr('fill', 'steelblue');
 */

/*
//Scale



//linear scale
var dataset = [1.2, 2.3, 0.9, 1.5, 3.3];
var min=d3.min(dataset);
var max=d3.max(dataset);
var linear=d3.scaleLinear()
  .domain([min, max])
  .range([0,300]);


linear(0.9);    //返回 0
linear(2.3);    //返回 175
linear(3.3);    //返回 300


//ordinal scale
var index = [0, 1, 2, 3, 4];
var color = ["red", "blue", "green", "yellow", "black"];

var ordinal = d3.scaleOrdinal()
  .domain(index)
  .range(color);

ordinal(0); //返回 red
ordinal(2); //返回 green
ordinal(4); //返回 black


//apply linear scale to chart
var dataset = [ 2.5 , 2.1 , 1.7 , 1.3 , 0.9 ];
var linear = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, 250]);

var rectHeight = 25;   //每个矩形所占的像素高度(包括空白)

svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x",20)
  .attr("y",function(d,i){
       return i * rectHeight;
  })
  .attr("width",function(d){
       return linear(d);   //在这里用比例尺
  })
  .attr("height",rectHeight-2)
  .attr("fill","steelblue");


//add axis
var axis = d3.axisBottom(linear)
  .ticks(7);

svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(20, 130)')
  .call(axis);
*/

/*
//make a complete barchart


//画布周边的空白
var padding = { left: 30, right: 30, top: 20, bottom: 20 };

//定义一个数组
var dataset = [10, 20, 30, 40, 33, 24, 12, 5];

//x轴的比例尺
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, width - padding.left - padding.right])
    .padding(0.08);

//y轴的比例尺
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([height - padding.top - padding.bottom, 0]);
//why inverse?



//定义x轴
var xAxis = d3.axisBottom(xScale);

//定义y轴
var yAxis = d3.axisLeft(yScale);

//矩形之间的空白
var rectPadding = 4;

//添加矩形元素
var rects = svg.selectAll(".MyRect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "MyRect")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return height - padding.top - padding.bottom - yScale(d);
    })
    .attr("fill", "steelblue")
    //hook event
    .on("mouseover", function(d, i){
        d3.select(this)
            .attr("fill", "yellow");
    })
    .on("mouseout", function(d, i) {
        d3.select(this)
            .transition()
            .duration(500)
            .attr("fill", "steelblue");
    })

//添加文字元素
var texts = svg.selectAll(".MyText")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "MyText")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return yScale(d);
    })
    .attr("dx", function() {
        return xScale.bandwidth() / 3;
    })
    .attr("dy", function(d) {
        return 20;
    })
    .text(function(d) {
        return d;
    });


//添加x轴
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
    .call(xAxis);

//添加y轴
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .call(yAxis);

//add animation


 */


/*
//make a complete pie chart


var dataset = [ 30 , 10 , 43 , 55 , 13 ];
var pie = d3.pie();
var piedata = pie(dataset);

console.log(piedata);


var outerRadius = 150; //外半径
var innerRadius = 0; //内半径，为0则中间没有空白

var arc = d3.arc()  //弧生成器
    .innerRadius(innerRadius)   //设置内半径
    .outerRadius(outerRadius);  //设置外半径

var arcs = svg.selectAll("g")
    .data(piedata)
    .enter()
    .append("g")
    .attr("transform","translate("+ (width/2) +","+ (width/2) +")");

var color = d3.scaleOrdinal(d3.schemeCategory20);


arcs.append("path")
    .attr("fill",function(d,i){
        return color(i);
    })
    .attr("d",function(d){
        return arc(d);   //调用弧生成器，得到路径值
    });

arcs.append("text")
    .attr("transform",function(d){
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor","middle")
    .text(function(d){
        return d.data;
    });
*/


/*
//force chart
//https://github.com/d3/d3-force
 */

var svg = body.select('svg')
svg.remove()

var canvas = body.append('canvas')
    .attr('width', width)
    .attr('height', height);

canvas = document.querySelector("canvas");
var context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("/data/miserables.json", function(error, graph) {
  if (error) throw error;

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  d3.select(canvas)
      .call(d3.drag()
          .container(canvas)
          .subject(dragsubject)
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  function ticked() {
    context.clearRect(0, 0, width, height);

    context.beginPath();
    graph.links.forEach(drawLink);
    context.strokeStyle = "#aaa";
    context.stroke();

    context.beginPath();
    graph.nodes.forEach(drawNode);
    context.fill();
    context.strokeStyle = "#fff";
    context.stroke();
  }

  function dragsubject() {
    return simulation.find(d3.event.x, d3.event.y);
  }
});

function dragstarted() {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
}

function dragged() {
  d3.event.subject.fx = d3.event.x;
  d3.event.subject.fy = d3.event.y;
}

function dragended() {
  if (!d3.event.active) simulation.alphaTarget(0);
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
}

function drawLink(d) {
  context.moveTo(d.source.x, d.source.y);
  context.lineTo(d.target.x, d.target.y);
}

function drawNode(d) {
  context.moveTo(d.x + 3, d.y);
  context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
}