/* eslint-disable no-undef */
chrome.tabs.onUpdated.addListener((tabId, id) => {
  if (tab.url && tab.url.includes('youtube.com/watch')) {
    const queryParameters = tab.url.split('?')[1];
    const urlParameters = new URLSearchParams(queryParameters);

    chrome.tabs.sendMessage(tabId, {
      type: 'New',
      videoId: urlParameters.get('v'),
      random: 'random',
    });
  }
});
