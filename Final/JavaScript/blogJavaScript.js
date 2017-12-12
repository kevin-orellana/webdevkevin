var $modal;

$( document ).ready(function() {
    var $searchButton = $('#searchButton');
    startup();
    // $searchButton.click(search());
    $modal = document.getElementById("myModal");
    $modal.addEventListener("click", resetModal);
    $modal.click(resetModal());

});

function resetModal(){
    $modal.style.visibility = "hidden";
    var myNode = document.getElementById("modalBody");
    myNode.innerHTML = "";
    var newH2 = document.createElement("H2");
    newH2.innerHTML = "Search results";
    myNode.append(newH2);
}

$('#reset').click(function() {

    // $('#Container').mixItUp('filter', '');   
});

function startup(){
    console.log("starting up");
    // var mixer = mixitup('.container');

    $('#Container').mixItUp({
            load: {
                filter: 'all'
            },
            controls: {
                toggleFilterButtons: true, //allowing more than one filter button to be selected at the same time, try changing to false
                toggleLogic: 'and' // this means when mutiple buttons are selected for filtering we only show the items which have all filters true, try changing to or
            },
            animation: {
                enable: true,
                effects: 'fade translateZ(-100%)',
                duration: 1000,
                easing: 'ease',
                perspectiveDistance: '3000',
                perspectiveOrigin: '50% 50%',
                queue: true,
                queueLimit: 1,
                animateChangeLayout: false,
                animateResizeContainer: false,
                animateResizeTargets: false,
                staggerSequence: false,
                reverseOut: false
            }


        });
};

function search(){
    // access text input in searchQuery form
    var $searchQuery = $('searchQuery');
    // re-format the search query
    searchQuery.value.toLowerCase();

    // parse the search query
    var queryArray = searchQuery.value.toLowerCase().split(" ");

    // count number of queries
    var numberQueries = queryArray.length;
    // access all posts
    var blogPosts = $('.post');
    // count number of posts
    var numberPosts = blogPosts.length;

    // call match function
    match(blogPosts, queryArray, numberQueries, numberPosts);
    // update modal 
    var modal = document.getElementById("myModal");
    modal.style.visibility = "visible";

};

function match(postsObject, queryArray, numberQueries, numberPosts){
    // boolean value to check if a post is found
    var found = false;

    // two for loops to check for each query and each post
    for (i = 0; i < numberQueries; i++){
        for (j = 0; j < numberPosts; j++){
            // parse the text of the current post we're searching through 
            var testArray = postsObject[j].innerHTML.toLowerCase().split(' ');
            // call jQuery $.inArray function to check if queryArray[i] is in testArray
            var index = $.inArray(queryArray[i], testArray);
            // if index != 1 then a post match was found
            if (index != -1){
                foundBlog(queryArray[i], postsObject, j);
                // set found to be true
                found = true;
            }
        }
    }
    // if search query isnt found
    if (!found){
        console.log("sorry not found!");
    }
}

function addToModal(articleFoundLink, articleFoundName){
    // access modalBody element
    var modalBody = document.getElementById('modalBody');
    // create a new h3 element
    var h3 = document.createElement("H3");
    // update h3 element to contain the article found
    // h3.innerHTML = articleFoundName;
    var link = document.createElement("A");
    link.href = articleFoundLink;
    // link.append(h3);
    link.innerHTML = articleFoundName;
    h3.append( link);
    // append the new article found to 
    modalBody.append(h3);

}

function foundBlog(newFilter, postsObject, index){
    var $container = $("#Container");
    // console.log("container", $container);
    console.log("searchHit with", postsObject[index]);
    // target all elements with filter class to avoid repetitive filters
    var $filters = $(".controls");
    // create a button for the new filter
    var button = document.createElement("BUTTON");
    // add the filter class to the button
    button.className += "filter";
    // add the data-filter newFilter to button
    button.setAttribute('data-filter', "." + newFilter);
    // add button to reflect new search query
    button.innerHTML += newFilter;
    // if newFilter is not in $addedCategories..
    var $post = postsObject[index];
    var postParentNode = $post.parentNode;
    addToModal(postParentNode.href, postParentNode.childNodes[0].data);



};



