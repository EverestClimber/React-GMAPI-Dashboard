import React, { Component } from 'react'

// Import Components
import {
  ThreeBounce
} from 'better-react-spinkit'
import SearchBar from 'material-ui-search-bar'
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

const filters = [
  'per_name_adr',
  'per_careof',
  'per_cprno',
  'per_cpr_status',
  'per_cpr_status_date',
  'per_name_last',
  'per_advptect_robinson',
  'per_name_firsts',
  'per_adr_contact',
  'per_adr_contact_date',
  'per_credwarn',
  'per_credwarn_date',
  'per_name',
  'per_protect_date',
  'per_protect',
  'per_advptect_robinson_date',
  'per_movdat',
  'per_adr_foreign',
  'per_adr_foreign_date',
  'per_name',
  'unadr_name'
]

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cpr: '',
      rows: [],
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('firstNotify')) {
      const { onPresentSnackbar } = this.props; 
      onPresentSnackbar('success', 'Successfully Logged in')
      localStorage.setItem('firstNotify', true)
    }
  }

  onRequestSearch = () => {
    this.props.restSearch()
    this.props.searchFetchRequested(this.state.cpr, this.state.rows)
  }

  onSearchChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  genFormControl = (label) => (
    <FormControlLabel
      control={
        <Switch
          checked={this.state[label]}
          onChange={this.onSearchChange(label)}
          value={label}
        />
      }
      label={label}
    />
  )

  genFilterList = () => {
    return filters.map(option => (
      <Grid item xs={3}>
        {this.genFormControl(option)}
      </Grid>
    ))
  }

  genTableResult = () => {
    return this.props.search.result.map(row => {
      return (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.key}
          </TableCell>
          <TableCell>{row.value}</TableCell>
        </TableRow>
        );
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <SearchBar 
              onChange={(value) => this.setState({ cpr: value })}
              onRequestSearch={this.onRequestSearch}
              placeholder={"Type CPR number to find information"}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading} >Filters - Variables</Typography>
              </ExpansionPanelSummary>
              <Divider/>
              <ExpansionPanelDetails>
                <Grid container>
                {
                  this.genFilterList()
                }
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { this.props.search.result != [] && this.genTableResult() }
                  { this.props.search.state == "FETCHING_SEARCH" && <CircularProgress size={100} className={classes.loading}/> }
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },

  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto',
  },

  table: {
    minWidth: 700,
  },

  margin: {
    marginRight: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },

  loading: {
    position: 'absolute',
    margin: 'auto',
    top: 0, left: 240, bottom: 0, right: 0,
  }
});


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withSnackbar(Dashboard))
