const DummyData =[
    {id:"d1", value:10, region:"USA"},
    {id:"d2", value:11, region:"India"},
    {id:"d3", value:12, region:"China"},
    {id:"d4", value:6, region:"Germany"},
]
console.log(d3)
const xScale = d3.scaleBand()
                 .domain(DummyData.map(data=>data.region))
                 .rangeRound([0,250])  // width 0 to 250
                 .padding(.1);
const yScale = d3
                 .scaleLinear()
                 .domain([0,15])  // hegith 0 to 250 <- max value of graph + extra space
                 .range([250,0]);

const container = d3.select('svg')
    .classed('container',true);

container
    .selectAll(".bar")
    .data(DummyData)
    .enter()
    .append('rect')
    .classed("bar",true)
    .attr('width',xScale.bandwidth())
    .attr('height',data=>250-yScale(data.value))
    .attr('x',data=>xScale(data.region))
    .attr('y',data=>yScale(data.value))
    ;
