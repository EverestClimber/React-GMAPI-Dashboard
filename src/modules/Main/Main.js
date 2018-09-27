import React, { Component } from 'react'

// Import Components
import {
  ThreeBounce
} from 'better-react-spinkit'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  paper: {
  }
});


class Main extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {/* <Grid container spacing={24}>
          <Grid item xs={12}>
            
          </Grid>
        </Grid> */}
        <Paper className={classes.paper}>
        </Paper>
      </React.Fragment>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main)
