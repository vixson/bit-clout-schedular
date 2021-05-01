chrome.action.onClicked.addListener((tab) => {
  console.info(`Tab :>>`, tab, chrome);
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('schedular-form').onsubmit = schedule;
});

function schedule(ev) {
  // console.info(`Chrome :>>`, chrome);
  ev.preventDefault();
  try {
    const form = {}, inputs = ev.target.elements;
    for (const k in inputs) {
      const ele = inputs[k];
      if (!!ele.name) switch (ele.type) {
        case 'checkbox':
          form[ele.name] = ele.checked;
          break;
        default:
          if (!!ele.value) form[ele.name] = ele.value;
          break;
      }
    };

    // console.info(`Clout form :>>`, form);

    // Add post to the schedular
    chrome.storage.sync.get('posts', ({ posts }) => {
      posts.push({ ...form, time: new Date(form.time).getTime() });
      chrome.storage.sync.set({ posts });
    });

    // chrome.tabs.query({
    //   url: 'https://*.bitclout.com/*',
    // }, tabs => {
    //   if (tabs.length > 1) {
    //     // chrome.tabs.reload(tabs[0].id, { bypassCache: true }); // Refresh when possible
    //     chrome.tabs.update(tabs[0].id, { active: true }); // Focus on the first tab that was open.
    //   }
    //   tabs.forEach(tab => {
    //     chrome.tabs.sendMessage(tab.id, { message: 'Data from schedular' }, null, (response) => {
    //       console.info(`Response From ${tab.title} :>>`, response);
    //     });
    //   });
    // })
  } catch (error) {
    console.error(`Caught error :>`, error);
  }
}
