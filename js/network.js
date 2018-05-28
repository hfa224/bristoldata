
var graph = {
    "nodes": [
      {"id": "Gloucestershire", "group": 1},
      {"id": "Herefordshire", "group": 1},
      {"id": "Bristol", "group": 1},
      {"id": "Worcestershire", "group": 1},
      {"id": "Dorset", "group": 1},
      {"id": "Cornwall", "group": 1},
      {"id": "Somerset", "group": 1},
      {"id": "Wiltshire", "group": 1},
      {"id": "West Sussex", "group": 1},
      {"id": "East Sussex", "group": 1},
      {"id": "Hampshire", "group": 2},
      {"id": "Greater London", "group": 2},
      {"id": "Surrey", "group": 1},
      {"id": "Berkshire", "group": 1},
      {"id": "Bedfordshire", "group": 1},
      {"id": "Hertfordshire", "group": 1},
      {"id": "Essex", "group": 1},
      {"id": "Kent", "group": 2},
      {"id": "Greater London", "group": 2}
    ],
    "links": [
      {"source": "Herefordshire", "target": "Gloucestershire", "value": 1},
      {"source": "Bristol", "target": "Gloucestershire", "value": 8},
      {"source": "Worcestershire", "target": "Gloucestershire", "value": 10},
      {"source": "Worcestershire", "target": "Bristol", "value": 6},
      {"source": "Dorset", "target": "Gloucestershire", "value": 1},
      {"source": "Cornwall", "target": "Gloucestershire", "value": 1},
      {"source": "Somerset", "target": "Gloucestershire", "value": 1},
      {"source": "Wiltshire", "target": "Gloucestershire", "value": 1},
      {"source": "West Sussex", "target": "Gloucestershire", "value": 2},
      {"source": "East Sussex", "target": "Gloucestershire", "value": 1},
      {"source": "Greater London", "target": "Hampshire", "value": 1},
      {"source": "Greater London", "target": "Worcestershire", "value": 3},
      {"source": "Greater London", "target": "Bristol", "value": 3},
      {"source": "Greater London", "target": "Gloucestershire", "value": 5},
      {"source": "Surrey", "target": "Greater London", "value": 1},
      {"source": "Berkshire", "target": "Greater London", "value": 1},
      {"source": "Bedfordshire", "target": "Greater London", "value": 1},
      {"source": "Hertfordshire", "target": "Greater London", "value": 1},
      {"source": "Essex", "target": "Kent", "value": 4},
      {"source": "Kent", "target": "Essex", "value": 4}
    ]
  }

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function(d) { return color(d.group); })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}