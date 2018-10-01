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
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
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
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      filters: [
        { id: 0, title: 'CPR Number', disabled: false, key: 'in_person_id', error: true },
        { id: 1, title: 'Name', disabled: false, key: 'in_name', error: true },
        { id: 2, title: 'Address', disabled: false, key: 'in_adr', error: true },
        { id: 3, title: 'Date of Birth', disabled: false, key: 'in_birth_date', error: true },
        { id: 4, title: 'Phone Number', disabled: false, key: 'in_phone_number', error: true },
      ],
      filtersSelected: ''
    }
    
  }

  componentDidMount() {
    if (!localStorage.getItem('firstNotify')) {
      const { onPresentSnackbar } = this.props; 
      onPresentSnackbar('success', 'Successfully Logged in')
      localStorage.setItem('firstNotify', true)
    }
  }

  hasValue = (id) => this.state.filters[id].value && this.state.filters[id].value !== "" ? true : false

  handleChange = id => event => {
    let temp = this.state.filters.slice(0)
    temp[id]["value"] = event.target.value
    const hasValue = this.hasValue(id)

    if (id == 0) {
      temp[1].disabled = hasValue
      temp[2].disabled = hasValue
      temp[3].disabled = hasValue
      temp[4].disabled = hasValue
    }

    if (id == 1) {
      temp[0].disabled = hasValue || this.hasValue(2) || this.hasValue(3)
      temp[2].disabled = this.hasValue(3) 
      temp[3].disabled = this.hasValue(2) 
      temp[4].disabled = hasValue || this.hasValue(2) || this.hasValue(3)
    }

    if (id == 2) {
      temp[0].disabled = hasValue || this.hasValue(1) || this.hasValue(3)
      temp[1].disabled = false
      temp[3].disabled = hasValue
      temp[4].disabled = hasValue || this.hasValue(1) || this.hasValue(3)
    }

    if (id == 3) {
      temp[0].disabled = hasValue || this.hasValue(1) || this.hasValue(2)
      temp[1].disabled = false
      temp[2].disabled = hasValue
      temp[4].disabled = hasValue || this.hasValue(1) || this.hasValue(2)
    }

    if (id == 4) {
      temp[0].disabled = hasValue
      temp[1].disabled = hasValue
      temp[2].disabled = hasValue
      temp[3].disabled = hasValue
    }

    temp.forEach(option => {
        option.error = !option.disabled && !this.hasValue(option.id)
    })

    this.setState({ filters: temp })
  };

  genFilterList = () => (
    this.state.filters.map(option => (
      <Grid item xs={12} key={option.id}>
        <TextField
          id={option.title}
          label={option.title}
          className={ classNames([this.props.classes.textField, this.state.filters[option.id].disabled ? this.props.classes.disabledTextField : ""]) }
          value={this.state.filters[option.id].value ? this.state.filters[option.id].value : ""}
          onChange={this.handleChange(option.id)}
          disabled={this.state.filters[option.id].disabled}
          error={option.error}
          margin="normal"
          variant="outlined"
          fullWidth
        />
      </Grid>
      )
    )
  )

  genTableResult = () => {
    return this.props.search.result.map(row => {
      return (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            <div>{row.key}</div>
          </TableCell>
          <TableCell>
            <div>{row.value}</div>
          </TableCell>
        </TableRow>
      );
    })
  }

  handleSearch = () => {
    let req = []
    let filtersSelected = []
    this.state.filters.slice(0).forEach(option => {
      if (option.disabled == false){
        req.push({key: option.key, value: option.value})
        filtersSelected.push(option.title)
      }
    })
    this.setState({filtersSelected: '[ ' + filtersSelected.join(', ') + ' ]'})

    this.props.resetSearch()
    this.props.searchFetchRequested(req)
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading} >{`Filter Options : ${this.state.filters.length}`}</Typography>
                {/* <Typography className={classes.secondaryHeading}>{`${this.state.filtersSelected}`}</Typography> */}
              </ExpansionPanelSummary>
              <Divider/>
              <ExpansionPanelDetails>
                <Grid container direction="row" justify="space-around" alignItems="center">
                {
                  this.genFilterList()
                }
                </Grid>
              </ExpansionPanelDetails>
              <Divider/>
              <ExpansionPanelActions className={classes.expansionAction}>
                <Button 
                  size="large" 
                  color="primary" 
                  variant="contained" 
                  className={classes.button} 
                  onClick={this.handleSearch}
                  disabled={(() => {
                    const res = this.state.filters.find(e => e.disabled == false && e.error == true)
                    return !res ? false : true
                  })()}
                  fullWidth>
                  Search
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.root}>
              { this.props.search.state === "FETCHING_SEARCH" && 
                <CircularProgress size={100} className={classes.loading}/>
              }
              { this.props.search.state !== "FETCHING_SEARCH" && 
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Key</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { this.props.search.result.length > 0 &&
                      this.genTableResult()
                    }
                  </TableBody>
                </Table>
              }
              { this.props.search.state == "FETCH_SEARCH_FAILED" && 
                <Typography className={classes.margin} >{`No Result`}</Typography>
              }
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

  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
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
  },

  disabledTextField: {
    backgroundColor: '#eeeeee'
  },

  expansionAction: {
    paddingLeft: 24,
    paddingRight: 24,
  },

  button: {
    marginLeft: 0,
  }
});


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withSnackbar(Dashboard))
