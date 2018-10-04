import {
    handlePromiseAction,
    isLoading,
    isRejected,
    isResolved
} from 'redux-promise-actions'
import reduceReducers from 'reduce-reducers'

const _handleActionWithComparator = (comparable, reducer, defaultState) => {
  if (typeof (comparable) === 'string') {
    // classic action type
    return handlePromiseAction(
        comparable,
        reducer,
        defaultState
    )
  }
  if (!comparable.action ||
    typeof (comparable.action) !== 'string' ||
    !comparable.filter ||
    typeof (comparable.filter) !== 'function'
  ) {
    throw new Error('The comparable must be action type [string] or object ' +
    'contains "action" field with action type [string].' +
    'And contains "filter"[function(action, comparable)]'
    )
  }
  return handlePromiseAction(
      comparable.action,
      (state, action) => {
        return comparable.filter(action, comparable) ? reducer(state, action) : state
      },
      defaultState
  )
}

const reducePromiseActions = (actions, defaultState) => reduceReducers(
    _handleActionWithComparator(
        actions[0],
        (state, action) => isLoading(action) ? 'loading' : state,
        defaultState
    ),
    ...actions.map(action =>
        _handleActionWithComparator(
            action,
            (state, action) => isRejected(action) ? 'rejected' : state,
            defaultState
        )
    ),
    _handleActionWithComparator(
        actions[actions.length - 1],
        (state, action) => isResolved(action) ? 'resolved' : state,
        defaultState
    )
)

export default reducePromiseActions
