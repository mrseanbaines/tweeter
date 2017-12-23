var tweets = [];

var database = firebase.database();
var dbRefObject = database.ref().child('tweets');

var form = document.querySelector('#form');
var tweetList = document.querySelector('#tweet-list');
var input = document.querySelector('#input');
var errNoText = false;

function post(e) {
  e.preventDefault();
  var text = this.querySelector('#input').value;
  var tweet = {
    message: text,
    timeStamp: new Date().toUTCString(),
    likes: 0
  };
  if (tweet.message !== '') {
    dbRefObject.push(tweet);
    this.reset();
  } else {
    errNoTextFunc(text);
  }
}

function updateTweets() {
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
          <br>
          <i data-index=${i} class="fa fa-heart ${item.likes > 0 ? 'text-danger' : ''}" aria-hidden="true"></i>
          ${item.likes}
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
    var index = e.target.dataset.index;
    tweets.splice(index, 1);
    updateTweets();
  }
}

function like(e) {
  if (e.target.matches('.fa-heart')) {
    var index = e.target.dataset.index;
    tweets[index].likes++;
    updateTweets();
  }
}

input.addEventListener('input', inputChange);
form.addEventListener('submit', post);
tweetList.addEventListener('click', remove);
tweetList.addEventListener('click', like);

(function() {
  dbRefObject.on('value', function(snap) {
    var object = snap.val();
    var updatedTweets = [];
    for (var item in object) {
      var tweet = object[item];
      updatedTweets.push(tweet);
    }
    tweets = updatedTweets;
    updateTweets();
  });
}());
