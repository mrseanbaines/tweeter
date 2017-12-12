const tweets = [];

const form = document.querySelector('#form');
const tweetList = document.querySelector('#tweet-list');
const input = document.querySelector('#input');
var errNoText = false;

function post(e) {
  e.preventDefault();
  const text = this.querySelector('#input').value;
  const tweet = {
    message: text,
    timeStamp: new Date().toUTCString()
  };
  if (tweet.message !== '') {
    tweets.unshift(tweet);
    updateTweets(tweet, text);
    this.reset();
  } else {
    errNoTextFunc(text);
  }
}

function updateTweets(tweet, text) {
  tweetList.innerHTML = tweets.map(function(item, i) {
    return`
      <li class="list-group-item list-group-item-action">
        <button type="button" class="close" aria-label="Close">
          <span data-index=${i} aria-hidden="true">&times;</span>
        </button>
        ${item.message}
        <br>
        <span class="text-muted">
          <small>
            ${item.timeStamp}
          </small>
        </span>
      </li>
    `
  }).join('');
}

function errNoTextFunc() {
  errNoText = true;
  document.querySelector('.err-no-text').style.display = 'block';
}

function inputChange(text) {
  if (errNoText && text !== '') {
    document.querySelector('.err-no-text').style.display = 'none';
  }
}

function remove(e) {
  if (e.target.matches('.close span')) {
    const index = e.target.dataset.index;
    tweets.splice(index, 1);
    updateTweets();
  }
}

input.addEventListener('input', inputChange);
form.addEventListener('submit', post);
tweetList.addEventListener('click', remove);
