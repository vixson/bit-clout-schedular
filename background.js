chrome.runtime.onInstalled.addListener(details => {
  chrome.storage.sync.clear(() => {
    chrome.storage.sync.set({ user: 'BitClout', posts: [] });
  });

  setInterval(() => {
    chrome.tabs.query({ // TODO: Make this on tab change or browser loads
      url: [
        'https://*.bitclout.com/*',
      ],
    }, tabs => {
      if (tabs.length > 1) {
        // chrome.tabs.reload(tabs[0].id, { bypassCache: true }); // Refresh when possible
        // chrome.tabs.update(tabs[0].id, { active: true }); // Focus on the first tab that was open.
      }
      chrome.storage.sync.get('posts', ({ posts }) => {
        const _posts = posts;
        console.info(`Pending Posts :>>`, posts, tabs);
        posts.forEach((post, i) => {
          if (post.time <= Date.now()) {
            tabs.forEach(tab => {
              chrome.tabs.update(tab.id, { active: true }); // Focus on the first tab that was open.
              chrome.tabs.sendMessage(tab.id, post, null, (response) => {
                console.info(`Response From ${tab.title} :>>`, response);
                if (response === post.time) {
                  _posts.splice(i, 1);
                  chrome.storage.sync.set({ posts: _posts });
                }
              });
            });
          }
        });
      });
    });
  }, 5000);
  console.log('Service worker active %cBitClout', `backgroundColor: #E7E7E7`, chrome, details);
});

chrome.runtime.onUpdateAvailable.addListener(details => {
  console.log('Updated Available', details);
});

