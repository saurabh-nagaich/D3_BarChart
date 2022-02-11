const DummyData=[
    {id:'d1', region:"USA", value:10},
    {id:'d2', region:"INDIA", value:12},
    {id:'d3', region:"CHINA", value:11},
    {id:'d4', region:"GERMANY", value:16},
];

const Margin={top:20,bottom:10,right:10,left:10}
const Chart_width = 600 - Margin.left - Margin.right;
const Chart_height = 400 -Margin.top -Margin.bottom ;

let selectData = DummyData;


const x = d3.scaleBand()
    .rangeRound([0,Chart_width])
    .padding(0.1);

const y = d3.scaleLinear()
    .range([Chart_height,0]);


const chartContainer = d3
    .select("svg")
    .attr('width',Chart_width)
    .attr('height',Chart_height+Margin.top+Margin.bottom);

x.domain(DummyData.map(d=>d.region))
y.domain([0,d3.max(DummyData,d=>d.value)+3])

const chart = chartContainer.append('g');
chart.append('g')
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .attr('transform',`translate(0,${Chart_height})`)
    .attr('color',"#4f009e")

chart.append('g')
.call(d3.axisRight(y)
    .tickSize(Chart_width - Margin.left - Margin.right)
    .tickFormat(formatTick))
.call(g => g.select(".domain")
    .remove())
.call(g => g.selectAll(".tick:not(:first-of-type) line")
    .attr("stroke-opacity", 0.5)
    .attr("stroke-dasharray", "2,2"))
.call(g => g.selectAll(".tick text")
    .attr("x", 0)
    .attr("dy", -4))

    function formatTick(d) {
        const s = (d / 1e6).toFixed(1);
        return this.parentNode.nextSibling ? `\xa0${s}` : `$${s} million`;
      }
function renderChart(){
    chart.selectAll(".bar")
        .data(selectData ,data=>data.id)
        .enter()
        .append('rect')
        .classed("bar",true)
        .attr('width',x.bandwidth())
        .attr('height',data=>Chart_height-y(data.value))
        // .attr('x',data=>x(data.region))
        // .attr('rx',30)
        .attr('x',data=>x(data.region)+10)
        .attr('y',data=>y(data.value));
    
    chart.selectAll(".bar").data(selectData).exit().remove();
    
    chart.selectAll(".lable")
        .data(selectData,data=>data.id)
        .enter()
        .append("text")
        .text(data=>data.value)
        .attr('x',data=>x(data.region) + x.bandwidth()/2)
        .attr('y',data=>y(data.value)-20)
        .attr("text-anchor",'middle')
        .classed('label',true);     

    chart.selectAll(".lable").data(selectData).exit().remove();
}

renderChart()
let unselectedIds=[]
const listItems = d3
    .select("#data")
    .select('ul')
    .selectAll('li')
    .data(DummyData,data=>data.id)
    .enter()
    .append('li')

listItems.append("span").text(data=>data.region);
listItems.append('input')
    .attr('type','checkbox')
    .attr('checked',true)
    .on('change',(data)=>{
        console.log(data.target.__data__.id)
        if(unselectedIds.indexOf(data.target.__data__.id)===-1){
            unselectedIds.push(data.target.__data__.id);
        }else{
            unselectedIds=unselectedIds.filter(id=>id!==data.target.__data__.id)
        }
        selectData=DummyData.filter(d=>unselectedIds.indexOf(d.id)==-1);
        renderChart()
    })