//Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// Save bookmark
function saveBookmark(e) {
  //Get form values
  var siteName = document.getElementById("siteName").value;
  var siteURL = document.getElementById("siteURL").value;

  if (!validateForm(siteName, siteURL)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteURL,
  };

  /*
  //Local Storage
  localStorage.setItem("Test", "Hello");
  console.log(localStorage.getItem("Test"));
  console.log(localStorage.removeItem("Test"));
*/
  //Test if bookmark is null
  if (localStorage.getItem("bookmarks") === null) {
    //Init array
    var bookmarks = [];
    //Add to array
    bookmarks.push(bookmark);
    //Set to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    //Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //Push into localstorage
    bookmarks.push(bookmark);
    //Re-set into localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  document.getElementById("myForm").reset();

  //Re-fetch Bookmarks
  fetchBookmarks();

  //Prevent From form submitting
  e.preventDefault();
}

//Delete Bookmark
function deleteBookmark(url) {
  // Get bookmark from local storage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      //Remove from array
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  //Re-fetch Bookmarks
  fetchBookmarks();
}

//Fetching bookmarks
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  //Get output ID
  bookMarksResults = document.getElementById("bookMarksResults");

  //Build Output
  bookMarksResults.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookMarksResults.innerHTML +=
      "<div class = 'card m-3 p-3'>" +
      "<h3>" +
      name +
      " <a class='btn btn-primary' target='_blank' href='" +
      url +
      "'>Visit</a>" +
      " <a onclick='deleteBookmark(\"" +
      url +
      "\")' class='btn btn-danger' href='#'>Delete</a>" +
      "</h3>" +
      "</div>";
  }
}

function validateForm(siteName, siteURL) {
  if (!siteName || !siteURL) {
    alert("Please fill up the form!!");
    return false;
  }

  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteURL.match(regex)) {
    alert("Please enter valid URL!!!");
    return false;
  }

  return true;
}
