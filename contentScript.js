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

  const newVideoLoaded = () => {
    const bookmarkBtnExists = document.getElementsByClassName('boomark-btn')[0];

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement('img');

      bookmarkBtn.src = chrome.runtime.getURL('assets/bookmark.png');
      bookmarkBtn.className = 'ytp-button ' + 'bookmark-btn';
    }
  };
})();
