import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { GoogleLogin, GoogleLogout } from 'react-google-login'

// Import styles
import '../styles/styles.css'

// Import Components
import {
  ThreeBounce,
} from 'better-react-spinkit'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
// Import Actions
import { loginSucceeded } from '../../../redux/actions/auth'
// Import Assets
import LockIcon from '@material-ui/icons/LockOutlined'

import { GOOGLE_AUTH_CLIENT_ID } from '../../../config'

class Login extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  onSuccess = (e) => {
    this.props.loginSucceeded(e.tokenObj.id_token) 
  }

  onFailure = () => {

  }

  onGoogleButton = ({ onClick }) => (
    <Button
      fullWidth
      variant="raised"
      color="secondary"
      className={this.props.classes.submit}
      onClick={onClick}
    >
      <div>
        <i className="fa fa-google" aria-hidden="true"/><span className="ml-3">Sign-in</span>
      </div>
    </Button>
  )

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign-in to Barry-Geomatic</Typography>
            <form className={classes.form}>
              <GoogleLogin
                clientId={GOOGLE_AUTH_CLIENT_ID}
                onSuccess={this.onSuccess}
                onFailure={this.onFailure}
                render={this.onGoogleButton}
                autoload={true}
                isSignedIn={false}
              />
            </form>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
})


// Retrieve data from store as props
const mapStateToProps = store => {
  return {
    auth: store.auth
  }
}

// Retrieve dispatch and callbacks from store as props
const mapDispatchToProps = dispatch => {
  return {
    loginSucceeded: (token) => dispatch(loginSucceeded(token))
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
