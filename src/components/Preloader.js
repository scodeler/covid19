import React from 'react';

import {Grid, CircularProgress} from '@material-ui/core';

export default function Preloader(){
  return(

    <Grid style={{height: '100vh'}}
    container
    direction="row"
    justify="center"
    alignItems="center">
      <CircularProgress />
    </Grid>
  );
}
