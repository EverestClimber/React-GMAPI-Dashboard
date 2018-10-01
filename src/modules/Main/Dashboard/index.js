import { connect } from 'react-redux'

// Import View
import Dashboard from './Dashboard'

// Import Actions
import { 
  resetSearch,
  searchFetchRequested,
  searchFetchSucceeded,
  searchFetchFailed,
} from '../../../redux/actions/search'

import { push } from 'react-router-redux'

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth,
    search: store.search
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetSearch: () => dispatch(resetSearch()),
    searchFetchRequested: (req) => dispatch(searchFetchRequested(req)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
