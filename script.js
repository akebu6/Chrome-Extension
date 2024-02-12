/*The code above is a bookmarking app that stores the current tab's URL in a local storage.

Args:
self: The current window.
new_data: The new data to be added to the bookmark.
Returns:
Nothing.

Time complexity: 0(n)
*/
 
let myBookmark = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");
const bookmarkFromLocalStorage = JSON.parse(localStorage.getItem("myBookmark"));

if (bookmarkFromLocalStorage){
   myBookmark = bookmarkFromLocalStorage
   renderBookmark(myBookmark);
} 

tabBtn.addEventListener("click", function()
 {
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      myBookmark.push(tabs[0].url);
      localStorage.setItem("myBookmark", JSON.stringify(myBookmark));
      renderBookmark(myBookmark);
   });
 });

deleteBtn.addEventListener("dblclick", function() {
  localStorage.clear();
  myBookmark = [];
  renderBookmark(myBookmark);
});

inputBtn.addEventListener("click", function() 
{
   myBookmark.push(inputEl.value);
   inputEl.value = " ";
   localStorage.setItem("myBookmark", JSON.stringify(myBookmark));

   renderBookmark(myBookmark);
});

function renderBookmark(bookmark)
{
   let listItems = " ";

   for (let i = 0; i < bookmark.length; i++)
   {
      listItems += `
         <li>
            <a target='_blank' href='${bookmark[i]}'>
               ${bookmark[i]}
            </a>
         </li>
      `
   }

   ulEl.innerHTML = listItems;
}
