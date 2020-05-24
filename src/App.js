import React, { useState } from 'react';

import {
  AppBar,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
   MenuItem,
  Select,
  Toolbar,
  Typography
} from '@material-ui/core';

//import Preloader from './components/Preloader';
import CardStats from './components/CardStats';
import TableState from './components/TableState';
import StateChart from './components/StateChart';
import './style/style.scss';
import useStyles from './style/materialStyles';

function App() {
  const [UF, setUF] = useState('SP');
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleChange = (event) => {
    setUF(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const states = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

  return (
    <div className="App">
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h6">
            Dados Covid-19
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center"
          style={{marginBottom: '50px'}}
        >
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">UF</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={UF}
                onChange={handleChange}
              >
                {
                  states.map(state => <MenuItem key={state} value={state}>{state}</MenuItem>)
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <StateChart state={UF} />
          </Grid>
        </Grid>
        <Divider />
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography variant="h6" style={{margin: '50px 0 30px'}}>
              Estatísticas de todos os estados
            </Typography>
            <TableState uf="SP" />
          </Grid>
        </Grid>
      </Container>
      
      <Typography variant="body2" style={{ paddingBottom: '50px'}} color="textSecondary" align="center">
        Desenvolvido em casa por Bruno Scodeler.
      </Typography>
    </div>
  );
}

export default App;
