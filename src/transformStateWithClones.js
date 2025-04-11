'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addProperties(currentState, action.extraData);
        break;

      case 'removeProperties':
        currentState = removeProperties(currentState, action.keysToRemove);
        break;

      case `clear`:
        currentState = {};
        break;
    }

    history.push({ ...currentState });
  }

  return history;
}

function addProperties(state, extraData) {
  const stateCopy = { ...state };

  return Object.assign(stateCopy, extraData);
}

function removeProperties(state, keysToRemove) {
  const stateCopy = { ...state };

  for (const prop of keysToRemove) {
    delete stateCopy[prop];
  }

  return stateCopy;
}

module.exports = transformStateWithClones;
