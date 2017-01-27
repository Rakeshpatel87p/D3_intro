var w = 900,
    h = 500;

var circleWidth = 5;

var fontSizeHighlight = '1.5em',
    fontSizeNormal = '1em';

var palette = {
    "yellow": "#A57706",
    "orange": "#BD3613",
    "red": "#D11C24",
    "pink": "#C61C6F",
    "purple": "#800080"
}

var nodes = [
    { "name": "West-Atl Depot(drag me)" },
    { "name": "Truck1" },
    { "name": "Truck2" },
    { "name": "Midtown" },
    { "name": "Old 4th Ward" },
    { "name": "Inman Park" },
    { "name": "East ATL Village" }
]

var links = [
    { source: nodes[1], target: nodes[0] },
    { source: nodes[2], target: nodes[0] },
    { source: nodes[3], target: nodes[1] },
    { source: nodes[4], target: nodes[1] },
    { source: nodes[5], target: nodes[2] },
    { source: nodes[6], target: nodes[2] },
]



var vis = d3.select("#forceGraph")
    .append("svg:svg")
    .style('background', '#E7E0CB')
    .attr("class", "stage")
    .attr("width", w)
    .attr("height", h);

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .gravity(0.1)
    .charge(-1050)
    .size([w, h]);

var link = vis.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link")
    .attr("stroke", palette.purple)
    .attr("fill", "none");

var node = vis.selectAll("circle.node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")

//MOUSEOVER
.on("mouseover", function(d, i) {
    if (i > 0) {
        //CIRCLE
        d3.select(this).selectAll("circle")
            .transition()
            .duration(250)
            .style("cursor", "none")
            .attr("r", circleWidth + 3)

        //TEXT
        d3.select(this).select("text")
            .transition()
            .style("cursor", "none")
            .duration(250)
            .style("cursor", "none")
            .attr("font-size", "1.5em")
            .attr("x", 15)
            .attr("y", 5)
    } else {
        //CIRCLE
        d3.select(this).selectAll("circle")
            .style("cursor", "none")

        //TEXT
        d3.select(this).select("text")
            .style("cursor", "none")
    }
})

//MOUSEOUT
.on("mouseout", function(d, i) {
    if (i > 0) {
        //CIRCLE
        d3.select(this).selectAll("circle")
            .transition()
            .duration(250)
            .attr("r", circleWidth)


        //TEXT
        d3.select(this).select("text")
            .transition()
            .duration(250)
            .attr("font-size", "1em")
            .attr("x", 8)
            .attr("y", 4)
    }
})

.call(force.drag);


//CIRCLE
node.append("svg:circle")
    .attr("cx", function(d, i) {
        if (i = 0) {
            return 251
        } else {
            return d.x
        }
    })
    .attr("cy", function(d, i) {
        if (i = 0) {
            return 172 } else {
            return d.y };
    })
    .attr("r", circleWidth)
    .attr("fill", function(d, i) {
        if (i > 2) {
            return palette.yellow;
        } else {
            return palette.red
        }
    })

//TEXT
node.append("text")
    .text(function(d) {
        return d.name;
    })
    .attr("fill", palette.red)
    .attr("font-size", function(d, i) {
        if (i > 0) {
            return "1em"
        } else {
            return "1.8em"
        }
    })
    .attr("text-anchor", "beginning")

force.on("tick", function(e) {
    node.attr("transform", function(d, i) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    link.attr("x1", function(d) {
            return d.source.x;
        })
        .attr("y1", function(d) {
            return d.source.y;
        })
        .attr("x2", function(d) {
            return d.target.x;
        })
        .attr("y2", function(d) {
            return d.target.y;
        })
});

force.start();
