import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Chart extends Component {
  static swatch = ['#7AA532', '#EAD259', '#385E89', '#526561', '#97B79E', '#C7E0CC', '#A9767E', '#D19B8C', '#EDE4DA'];

  static defaultProps = {
    swatch: Chart.swatch,
    width: 300,
  };

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }))
  };

  constructor(props) {
    super(props);
    this.figure = React.createRef();
  }

  componentDidMount() {
    this.drawChart()
  }

  drawChart() {
    const margin = {
      top: 10, 
      right: 10,
      bottom: 10,
      left: 10,
    };

    const thickness = this.props.width * .25;

    const width = this.props.width - margin.right - margin.left;
    const height = this.props.width - margin.top - margin.bottom;
    const radius = width / 2;

    const arc = d3.arc()
    .outerRadius(radius - 5)
    .innerRadius(radius - 5 - thickness);


    const pie = d3.pie()
    .sort((a, b) => a - b) // ascending order
    .value((d) => {
      return d.value;
    });

    const svg = d3.select(this.figure.current).append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
      
    const g = svg.selectAll('.chart__arc')
      .data(pie(this.props.data))
      .enter()
      .append('g')
      .attr('class', 'chart__arc');

    g.append('path')
    .attr('d', arc)
    .style('fill', (d, i) => this.props.swatch[i]);

    const labelArc = d3.arc()
      .outerRadius(radius* 1.5)
      .innerRadius(0);
    
    // Add labels
    g.append('text')
    .attr('class', 'chart__label')
    .attr('transform', (d) => {
      return `translate(${labelArc.centroid(d)})`;
    })
    .text((d) => `${d.value}%`);

  }

  render() {
    return (
      <figure className="chart" ref={this.figure}>
        {/* chart */}
      </figure>  
     );
  }
}

export default Chart;
