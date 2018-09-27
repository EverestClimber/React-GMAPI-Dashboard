import { connect } from 'react-redux'

// Import View
import Main from './Main'

// Import Actions

import { push } from 'react-router-redux'

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
