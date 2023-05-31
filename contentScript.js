/* eslint-disable no-undef */
(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = '';

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === 'New') {
      currentVideo = videoId;
      newVideoLoaded();
    }
  });
})();
