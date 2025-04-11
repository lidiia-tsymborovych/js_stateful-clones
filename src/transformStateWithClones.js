'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const HISTORY = [];
  let currentState = { ...state };

  for (const ACTION of actions) {
    switch (ACTION.type) {
      case 'addProperties':
        currentState = addProperties(currentState, ACTION.extraData);
        break;

      case 'removeProperties':
        currentState = removeProperties(currentState, ACTION.keysToRemove);
        break;

      case `clear`:
        currentState = {};
        break;
    }

    HISTORY.push({ ...currentState });
  }

  return HISTORY;
}

function addProperties(state, extraData) {
  const STATE_COPY = { ...state };

  return Object.assign(STATE_COPY, extraData);
}

function removeProperties(state, keysToRemove) {
  const STATE_COPY = { ...state };

  for (const prop of keysToRemove) {
    delete STATE_COPY[prop];
  }

  return STATE_COPY;
}

module.exports = transformStateWithClones;
