const DummyData =[
    {id:"d1", value:10, region:"USA"},
    {id:"d2", value:11, region:"India"},
    {id:"d3", value:12, region:"China"},
    {id:"d4", value:10, region:"russia"},
    {id:"d4", value:9, region:"delhi"},
    {id:"d4", value:7, region:"Germany"},
]
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

const bars = container
    .selectAll(".bar")
    .data(DummyData)
    .enter()
    .append('rect')
    .classed("bar",true)
    .attr('width',xScale.bandwidth())
    .attr('height',data=>250-yScale(data.value))
    .attr('x',data=>xScale(data.region))
    .attr('y',data=>yScale(data.value))
    .attr("rx", 20)
    .call(d3.axisBottom(xScale))
;


setTimeout(()=>{
    bars.data(DummyData.slice(0,2)).exit().remove();
},3000)