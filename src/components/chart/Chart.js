import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Chart extends Component {
  static swatch = ['#7AA532', '#385E89', '#526561', '#A9767E', '#D19B8C', '#EDE4DA', '#EAD259', '#97B79E'];

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
    this.tooltip = React.createRef();

    this.state = {
      tooltipText: '',
    }
  }

  componentDidMount() {
    this.drawChart()
  }

  sortOrder(a, b) {
    return a.value - b.value;
  }

  onChartMouseOver =(data, d) => {
    if (this.state.tooltipText.length === 0) {
      this.setState({
        tooltipText: `${data.data.value} Response${data.data.value > 1 ? 's' : ''}`
      });
    }

    const tooltipBox = this.tooltip.current.getBoundingClientRect();
    const x = d3.event.clientX - (tooltipBox.width / 2) ;
    const y =  d3.event.clientY - tooltipBox.height - 20;

    this.tooltip.current.style['left'] = `${x}px`;
    this.tooltip.current.style['top'] = `${y}px`;

    

    
  }

  onChartMouseLeave = () => {
    this.setState({tooltipText: ''})
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
    .sort(this.sortOrder)
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
      .attr('class', 'chart__arc')
      .on('mousemove', this.onChartMouseOver)
      .on('mouseleave', this.onChartMouseLeave);;

    g.append('path')
    .attr('d', arc)
    .style('fill', (d, i) => this.props.swatch[i])

    const labelArc = d3.arc()
      .outerRadius(radius* 1.5)
      .innerRadius(0);
    
    // Add labels
    g.append('text')
    .attr('class', 'chart__label')
    .attr('transform', (d) => {
      return `translate(${labelArc.centroid(d)})`;
    })
    .text((d) => {
      const angle = d.endAngle - d.startAngle;
      const percentage = Math.round((angle * 100)/(2 * Math.PI));
      return `${percentage}%`;
    });

  }

  renderLabels() {
    return this.props.data.map((d, i) => (
      <div key={Math.random()} className="chart__label">
        <span style={{backgroundColor: this.props.swatch[i]}} className="chart__color"></span>
        <span className="chart__labelText">
          {`${d.label}`}
        </span>
      </div>
    ));
  }

  renderTooltip() {
    const classNameStr = `chart__tooltip ${(this.state.tooltipText.length < 1) ? 'chart__tooltip--hidden':''}`;
    return (
      <span className={classNameStr} ref={this.tooltip}>
        {this.state.tooltipText}
      </span>
    )
  }

  render() {
    return (
      <Fragment> 
        <figure className="chart" ref={this.figure}>
          {/* chart */}
        </figure> 
        <div className="chart__labels">
          {
            this.renderLabels()
          }
        </div>
        {this.renderTooltip()}
      </Fragment> 
     );
  }
}

export default Chart;
