/* eslint-disable no-undef */
(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = '';
  let currentVideoBookmarks = [];

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === 'New') {
      currentVideo = videoId;
      newVideoLoaded();
    }
  });

  const fetchBookmarks = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get([currentVideo], (obj) => {
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
      });
    });
  };

  const newVideoLoaded = async () => {
    const bookmarkBtnExists = document.getElementsByClassName('boomark-btn')[0];

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement('img');

      bookmarkBtn.src = chrome.runtime.getURL('assets/bookmark.png');
      bookmarkBtn.className = 'ytp-button ' + 'bookmark-btn';
      bookmarkBtn.title = 'Click to bookmark current timestamp';

      youtubeLeftControls =
        document.getElementsByClassName('ytp-left-controls')[0];
      youtubePlayer = document.getElementsByClassName('video-stream')[0];

      youtubeLeftControls.appendChild(bookmarkBtn);
      bookmarkBtn.addEventListener('click', addNewBookmarkEventHandler);
    }
  };

  const addNewBookmarkEventHandler = () => {
    const currentTime = youtubePlayer.currentTime;
    const newBookMark = {
      time: currentTime,
      desc: 'Bookmark at ' + getTime(currentTime),
    };

    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify(
        [...currentVideoBookmarks, newBookMark].sort((a, b) => a.time - b.time)
      ),
    });
  };

  newVideoLoaded();
})();

const getTime = (t) => {
  var date = new Date(0);
  date.setSeconds(t);

  return date.toISOString().substring(11, 8);
};
