import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';

import Preloader from '../components/Preloader';

function TableState(){
  const [loading, handleLoading] = useState(true);
  const [resultObject, updateResult] = useState(false);

  useEffect(() => {
    async function getDataByState(){
      await axios.get(`https://brasil.io/api/dataset/covid19/caso/data?place_type=state&is_last=true`)
        .then(result => updateResult(result.data.results))
        .then(handleLoading(false));
    }
    getDataByState();
  },[]);

  return(
    <TableContainer>
      <Table size="small">
        <caption>Dados retirados de <a href="https://brasil.io/" target="_blank" rel="noopener noreferrer">brasil.io</a></caption>
        <TableHead>
          <TableRow>
            <TableCell>Estado</TableCell>
            <TableCell>Casos confirmados</TableCell>
            <TableCell>Casos/100k Habitantes</TableCell>
            <TableCell>Óbitos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && <Preloader />}
          {!loading &&
            resultObject && resultObject.map(item =>
              <TableRow key={item.state}>
                <TableCell>{item.state}</TableCell>
                <TableCell>{item.confirmed}</TableCell>
                <TableCell>{item.confirmed_per_100k_inhabitants}</TableCell>
                <TableCell>{item.deaths}</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableState;
