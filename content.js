
chrome.runtime.onMessage.addListener((data, sender, response) => {
  response(data.time);
  let textareaEle = document.querySelector('textarea');
  let buttonEle = document.querySelector('button');
  try {
    textareaEle = document.querySelector('.feed-create-post__textarea');
    buttonEle = textareaEle.closest('feed-create-post').querySelector('div button');
  }
  catch (error) {
    console.error(`Caugth error :>`, error);
  }
  if (confirm(`You are about to make Schecduled Post [${new Date(data.time)}]: \n${data.message}`)) {
    textareaEle.value = data.message;
    buttonEle.click();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  console.info(`Welcome ${document.title} to Bitclout schedular!`);
});
