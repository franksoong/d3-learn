import './index.css';
import * as d3 from "d3";



//setup base env
var body=d3.select('body');
var width=500;
var height=500;

var svg=body.append('svg')
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
 */

//画布周边的空白
 var padding = {left:30, right:30, top:20, bottom:20};

//定义一个数组
var dataset = [10, 20, 30, 40, 33, 24, 12, 5];

//x轴的比例尺
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, width - padding.left - padding.right])
    .padding(0.08);

//y轴的比例尺
var yScale = d3.scaleLinear()
    .domain([0,d3.max(dataset)])
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
        .attr("class","MyRect")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .attr("x", function(d,i){
            return xScale(i);
        } )
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("width", xScale.bandwidth() )
        .attr("height", function(d){
            return height - padding.top - padding.bottom - yScale(d);
        })
        .attr("fill","steelblue");

//添加文字元素
var texts = svg.selectAll(".MyText")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class","MyText")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .attr("x", function(d,i){
            return xScale(i);
        } )
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("dx",function(){
            return xScale.bandwidth()/3;
        })
        .attr("dy",function(d){
            return 20;
        })
        .text(function(d){
            return d;
        });


//添加x轴
svg.append("g")
  .attr("class","axis")
  .attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
  .call(xAxis);

//添加y轴
svg.append("g")
  .attr("class","axis")
  .attr("transform","translate(" + padding.left + "," + padding.top + ")")
  .call(yAxis);

//add animation
