import React, { Component } from 'react'

// Import Components
import {
  ThreeBounce
} from 'better-react-spinkit'

import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
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


class Dashboard1 extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // const { onPresentSnackbar } = this.props; 
    // onPresentSnackbar('success', 'Successfully fetched the data.')
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        Dashboard2
        {/* <Grid container spacing={24}>
          <Grid item xs={12}>
            
          </Grid>
        </Grid> */}
      </React.Fragment>
    )
  }
}

Dashboard1.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withSnackbar(Dashboard1))
