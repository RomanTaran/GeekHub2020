const follow = document.querySelector('.follow');
const followers = document.getElementById('followers').firstChild;
let followersNum = followers.textContent.trim().split(',');
let result = Number(followersNum[1]);
let clickNum = 0;
let color = '';
let text = '';

follow.addEventListener('click', () => {
  clickNum++;
  if (clickNum % 2 !== 0) {
    color = '#46cc25';
    text = 'Following';
    result++;
  } else {
    color = '#2589cc';
    text = 'Follow';
    result--;
  }
  follow.style.backgroundColor = color;
  follow.innerHTML = text;
  followers.textContent = followersNum[0] + ',' + result;
})