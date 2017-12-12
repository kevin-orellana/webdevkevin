$( document ).ready(function() {

    // NAVIGATION MENU
    // MAKE BODY FADE IN
    TweenLite.from($('body'), 2, { autoAlpha: 0 });

    //animate our menu in from off the page
    TweenLite.from($('#sideMenu'), 1, { top: -500, delay: 1 });

    // variables for each button
    var     $Section5Btn = $('#Section5Btn'),
            $Section4Btn = $('#Section4Btn'),
            $Section3Btn = $('#Section3Btn'),
            $Section2Btn = $('#Section2Btn'),
            $Section1Btn = $('#Section1Btn'),
            $Section0Btn = $('#Section0Btn');

    // create a list of all items
    var $navButtons = $('li');
    // add and remove active class on mouse enter and leave
    $navButtons.mouseenter(function() {
        TweenLite.to(this, 0.2, { className: '+=active' });
    });

    $navButtons.mouseleave(function() {
        TweenLite.to(this, 0.2, { className: '-=active' });
    });

    // assign an HTML5 data attribute to each of our buttons
        $Section0Btn.attr('data-scrollPos', $('#Section0Panel').offset().top);
        $Section1Btn.attr('data-scrollPos', $('#Section1Panel').offset().top + 80);
        $Section2Btn.attr('data-scrollPos', $('#Section2Panel').offset().top + 50) ;
        $Section3Btn.attr('data-scrollPos', $('#Section3Panel').offset().top + 20);
        $Section4Btn.attr('data-scrollPos', $('#Section4Panel').offset().top + 30);
        $Section5Btn.attr('data-scrollPos', $('#Section5Panel').offset().top);

       
        // SET SCROLLING FUNCTION
        $navButtons.click(function() {
            var myScrollPosition = $(this).attr('data-scrollPos');
            console.log(myScrollPosition);
            TweenLite.to(window, 1, { scrollTo: myScrollPosition, ease: Back.easeOut });
        });

        // scroll to this floor on load..
        var initialFloor = $('#Section0').attr('data-scrollPos');
        TweenLite.to(window, 1, {scrollTo: initialFloor});

       // scrolling function
        


    // CAROUSEL
     $('#myCarousel').carousel({
          interval: 15000,
          pause: 'hover'
        });

    // For carousel changes
      // prev next events for carousel
        $('.carousel-control-prev').click(function(){
          $('#myCarousel').carousel('prev');
        });

        $('.carousel-control-next').click(function(){
          $('#myCarousel').carousel('next');
        });

    // indicators
        // for final extra credt if you refactor into a reusable function that takes index #
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
        // use THIS to access the one that was actually clicked
        $('.item-0').click(function(){
          $('#myCarousel').carousel(0);
        });

        $('.item-1').click(function(){
          $('#myCarousel').carousel(1);
        });

        $('.item-2').click(function(){
          $('#myCarousel').carousel(2);
        });




});
