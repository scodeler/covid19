import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  Paper,
  Typography
} from '@material-ui/core';

import Preloader from '../components/Preloader';
import useStyles from '../style/materialStyles';

function CardStats(props){
  const[baseUrl] = useState('https://brasil.io/api/dataset/covid19/caso/data');
  const [loading, handleLoading] = useState(true);
  const [data, fetchData] = useState();
  const [params, setParams] = useState({...props});

  useEffect(()=>{
    setParams(props);
  },[props]);

  useEffect(() => {
    let queryString = 'is_last=true&';
    Object.keys(params).forEach(key => {
      if(key !== 'title'){
        queryString += `${key}=${props[key]}&`;
      }
    });
    async function getApiData() {
      let resultObject;
      await axios.get(`${baseUrl}?${queryString}`)
        .then(results => resultObject = results.data);
      let timeObject = new Date();
      let time = {
        hour: `${timeObject.getHours()}:${timeObject.getMinutes()}`,
        day: timeObject.getDate(),
        month: timeObject.getMonth(),
        year: timeObject.getFullYear(),
      }
      let newData = { ...resultObject, time }
      fetchData(newData);
      handleLoading(false);
    }
    getApiData();
  }, [params, baseUrl, props]);

  const classes = useStyles();
  return(
    <Paper className={classes.paper}>
      {loading && <Preloader /> }
      {!loading &&
        <React.Fragment>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.title}
          </Typography>
          <Typography component="p" variant="h4">
            {data.results[0].confirmed}
          </Typography>
          <Typography color="textSecondary">
           atualizado às {data.time.hour}, em {data.time.day }/{data.time.month}/{data.time.year}
          </Typography>
        </React.Fragment>
      }
    </Paper>
  );
}

export default CardStats;
