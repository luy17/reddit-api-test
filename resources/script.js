//Initializing variables
var next = 'x';
var content = document.getElementById("reddit-list-container");

function getAww(after){

  var apiUrl = 'https://www.reddit.com/r/aww/hot.json'
  if (next != 'x'){
    //If this wasn't the first time getting data, then load data after the name. 
    apiUrl = `https://www.reddit.com/r/aww/hot.json?after=${next}`
  }
  //console.log(apiUrl);
  fetch(`${apiUrl}`)
    .then(function(res) {
      //Convert the data into JSON
      return res.json();
    })
    //calls the addPosts function in order to put the posts onto the HTML page. 
    .then(data => {
      addPosts(data, data.data.after);
    })
    .catch(function(err) {
      //Error catcher
      console.log(err);
    });
}

//Function that appends the posts onto the HTML page. 
function addPosts(response, after){
  //Checks to see if the items have been properly inputted 
  //console.log(after);
  //console.log(response);
  
  //copies the after tag for the API to work with.
  next = after;
  
  //gets the posts then prints them out into the console.
  posts = response.data.children;
  console.log(posts);

  //for each Post, add them to a div in order to append them into the reddit-list-container
  posts.forEach(post => {
    var newdiv = `<div class='reddit-list-item'>`
      if (post.data.thumbnail != "self"){
        newdiv = newdiv + `<img src='${post.data.thumbnail}'></img>`
      }
      //gets the link from permalink instead of url, due to the fact that some image posts have the image as the url.
      newdiv = newdiv + `<a href="https://www.reddit.com${post.data.permalink}" target='_blank'>${post.data.subreddit_name_prefixed}: ${post.data.title}</a>`
    newdiv = newdiv + '</div>'
    $('#reddit-list-container').append(newdiv);
  });
}


$(document).ready(function(){
  getAww(next);
  //console.log(response);

  window.addEventListener('scroll',()=>{
    //console.log(window.scrollY) //scrolled from top
    //console.log(window.innerHeight) //visible part of screen
    if(window.scrollY + window.innerHeight >= 
    document.documentElement.scrollHeight){
      console.log(next);
      getAww(next);
    }
  });
});
