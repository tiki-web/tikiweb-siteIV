(function(window, $, undefined) {
    var $links, $sections, $pageNav, $header, $contentLink, $topLink;

  function isOnScreen(section, scrollTop) {
    var top = section.offset().top - scrollTop,
        bottom = section.offset().top + section.height() - scrollTop;
    return top < $(window).height() * 0.5 && bottom > $(window).height() * 0.5 ? true : false;
  }
    
  function setActiveLink(id){
    $.each($links, function(i,e){
			var href = $(e).attr('href');
			if (id == href)
				$(e).parent().addClass('active');
			else 
				$(e).parent().removeClass('active');
		});
  }
  
  function onScroll() {
    var scrollTop = $(window).scrollTop(),
      navTop = $pageNav.offset().top - scrollTop,
      headerBottom = $header.height();
    
    if (navTop < 0)
      $pageNav.addClass('nav-fixed');
    
    if (scrollTop < headerBottom)
      $pageNav.removeClass('nav-fixed');
    
    $.each($sections, function(i, e) {
      if(isOnScreen($(e),scrollTop)){
        setActiveLink('#'+$(e).attr('id'));
        $(e).addClass('active-section');
      }
      else
        $(e).removeClass('active-section');
    });
  }

  function scrollTo(e) {
    e.preventDefault();
    var target = $(e.target.hash);
    $('html,body').animate({
      scrollTop: target.offset().top
    }, 750);
  }

  $(function() {
    $links = $('.page-nav-link a, #scroll-h-top a, #scroll-h-bottom a');
    $sections = $('.section');
    $pageNav = $('#page-nav');
    $header = $('#page-header');
    $links.bind('click', scrollTo);
    window.onscroll = onScroll;
  });
})(this, jQuery);
