import React, { Component } from "react";
//HTTP Promise library import
import { get } from "axios";
//D3.js import
import { scaleTime } from "d3-scale";
import { timeHour } from "d3-time";
//Moment.js import
import moment from "moment";

//Recharts component imports
import {
  //AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

class BasicAreaChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  getTicks = data => {
    if (!data || !data.length) {
      return [];
    }
    const domain = [
      new Date(data[0].timestamp),
      new Date(data[data.length - 1].timestamp)
    ];
    const scale = scaleTime().domain(domain);
    const ticks = scale.ticks(timeHour, 1);
    return ticks.map(entry => +entry);
  };

  dateFormat = time => {
    return moment(time).format("HH:mm");
  };

  componentWillReceiveProps(nextProps) {
    var _this = this;
    get(
      "http://nylon.palisadoes.org/charts/area/3?timeStart=1515511059&timeStop=1515597459"
    )
      .then(function(response) {
        var data = response.data;
        //Times each time by 100 to prep for conversion
        data.forEach(function(d) {
          d.timestamp = d.timestamp * 1000;
        });
        _this.setState({
          data: dta
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  //Runs after Component is Loaded
  componentDidMount() {
    var _this = this;

    get()
    //"http://nylon.palisadoes.org/charts/area/3?timeStart=1515511059&timeStop=1515597459"
      .then(function(response) {
        var data = response.data;
        //Times each time by 100 to prep for conversion
        data.forEach(function(d) {
          d.timestamp = d.timestamp * 1000;
        });
        _this.setState({
          data: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <ResponsiveContainer width="50%" height="35%" minHeight={300}>
        <AreaChart
          width={600}
          height={150}
          data={this.state.data}
          margin={{ top: 10, right: 0, left: 0, bottom: 30 }}
        >
          <XAxis
            dataKey="timestamp"
            ticks={this.getTicks(this.state.data)}
            tickFormatter={this.dateFormat}
          />
          <YAxis />
          <CartesianGrid strokeDasharray="1 1" />
          <Tooltip />
          <Area type="monotone" dataKey="y" stroke="#ef6b6c" fill="#fff" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

export default BasicAreaChart;
