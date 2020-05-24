import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, makeWidthFlexible} from 'react-vis';

import Preloader from './Preloader';

function StateChart(props) {
  const [loading, handleLoading] = useState(true);
  const [chartData, updateData] = useState([]);

  useEffect(()=>{
    handleLoading(true);
    async function getStateData(){
      let newChartData = [];
      await axios.get(`https://brasil.io/api/dataset/covid19/caso/data?place_type=state&state=${props.state}`)
        .then(result => {
          let daysFromFirstCase = result.data.results.length;
          result.data.results.map(day => {
            const dateNumber = day.date.split('-');
            newChartData = [{y: day.confirmed, x: new Date(day.date)}, ...newChartData];
            daysFromFirstCase--;
          })
        })
        .then(handleLoading(false));
      updateData(newChartData);
    }
    getStateData();
  },[props, chartData])

  const FlexibleXYPlot = makeWidthFlexible(XYPlot); 
  return (
    <div>
      {loading && <Preloader /> }
      {!loading &&
        <FlexibleXYPlot
          xType="time"
          margin={{left: 60}}
          height={300}>
          <HorizontalGridLines />
          <LineSeries
            color="#3f51b5"
            data={chartData}/>
          <XAxis />
          <YAxis />
        </FlexibleXYPlot>
      }
    </div>
  );
}

export default StateChart;