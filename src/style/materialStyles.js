import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    header : {
      marginBottom: theme.spacing(5)
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
}));

export default useStyles;
