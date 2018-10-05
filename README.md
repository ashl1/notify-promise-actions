# notify-promise-actions

This is library to proceed a list of promise [FSA-complained](https://github.com/redux-utilities/flux-standard-action) actions (from redux-promise-actions) from first to last as one consequentally. A common use case for this library is notification of the status of a bunch of promise actions in general.

The reduced resulted state can be on of:
- 'loading' - when promise in first action is pending
- 'loaded' - when promise in last action is resolved
- 'rejected' - when any action in the list is rejected

## Usage

```javascript
/* ///////////////////////
reducePromiseActions(actions, default)
action: could be one of
 - String() - the action name
 - {
  action, // String() - the complex action name
  filter: // (action, self) = Boolean, where
          // - "action" is type of "action" in previous list item
          // - "self" is the this object {action: ..., filter: ..., default: ...}
          // - "result" is Boolean. When False it is ignored, when True - proceed
  default // default value for state
}
/////////////////////// */

{
  statePart: reducePromiseActions(
    [
      actionType.SET_SETTINGS1, // String() here
      actionType.DO_SOME, // String() here
      actionType.LOAD // String() here
    ],
    DEFAULT_PART
  ),
  statePart2: educePromiseActions(
    [
      {
        action: actionType.COMPLEX_ACTION, // String() here
        filter: (action, self) => action.meta.complexSubType === self.requiredSubType,
        requiredSubType: 'myType'
      }, // Filter only COMPLEX_ACTION with "myType" complexSubType to use in the list
      action.DO_ANOTHER
    ],
    DEFAULT_PART2
  )
}

```

Your wishes are welcome in Issues
