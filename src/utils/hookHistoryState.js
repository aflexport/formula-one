// @flow strict

let bound = false;

export default function hookHistoryState() {
  if (bound) {
    return;
  }

  const {history, dispatchEvent} = window;
  const pushState = history.pushState;
  history.pushState = function(state) {
    const result = pushState.apply(history, arguments);
    dispatchEvent(new CustomEvent("fo-pushstate", state));
    return result;
  };

  const replaceState = history.replaceState;
  history.replaceState = function(state) {
    const result = replaceState.apply(history, arguments);
    dispatchEvent(new CustomEvent("fo-replacestate", state));
    return result;
  };

  bound = true;
}
