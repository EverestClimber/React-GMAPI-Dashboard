import { connect } from 'react-redux'

// Import View
import Dashboard1 from './Dashboard1'

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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard1)
