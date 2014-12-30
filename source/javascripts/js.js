;window.init = function() {
  $('.tab-header-and-content > a').bind('click', function(e) {
    e.preventDefault();
    $(this).closest('ul').find('a.tab-link.is-active').removeClass('is-active');
    $(this).addClass('is-active');
    $('ul.zonas').hide();
    $('ul.zonas#'+this.id).show();
    $.smoothScroll();
  });
  $('.tab-header-and-content > a:first').trigger('click');

  // fix sub nav on scroll
  var $win    = $(window)
    , tabs    = $('.accordion-tabs')
    , $nav    = tabs
    , navTop  = tabs.offset().top + 40
    , isFixed = 0;
  function processScroll() {
    var scrollTop = $win.scrollTop();
    if (scrollTop >= navTop && !isFixed) {
      isFixed = 1;
      $nav.addClass('subnav-fixed');
    } else if (scrollTop <= navTop && isFixed) {
      isFixed = 0;
      $nav.removeClass('subnav-fixed');
    }
  }
  //TODO: reenable fixed tabs
  //processScroll();
  //$win.on('scroll', processScroll);

  var menu = $('#navigation-menu');
  var menuToggle = $('#js-mobile-menu');

  $(menuToggle).on('click', function(e) {
    e.preventDefault();
    menu.slideToggle(function(){
      if (menu.is(':hidden')) {
        menu.removeAttr('style');
      }
    });
  });

  function extractParamFromUri(uri, paramName) {
    if (!uri) return;
    var regex = new RegExp('[\\?&#]' + paramName + '=([^&#]*)');
    var params = regex.exec(uri);
    if (params != null) return decodeURIComponent(params[1]);
  }

  // social thangs
  if (navigator.userAgent.match(/Chrome/i)) { $(".for-chrome-only").fadeIn(); }
  var $fb_like = $('a.addthis_button_facebook_like');
  $fb_like.bind('edge.create', function (targetUrl) { ga('send', 'social', 'facebook', 'like', targetUrl); });
  $fb_like.bind('edge.remove', function (targetUrl) { ga('send', 'social', 'facebook', 'unlike', targetUrl); });
  $('a.addthis_button_tweet').bind('tweet', function (event) {
    if (event) {
      var targetUrl='';
      if (event.target && event.target.nodeName == 'IFRAME') {
        targetUrl = extractParamFromUri(event.target.src, 'url');
      }
      ga('send', 'social', 'twitter', 'tweet', targetUrl);
    }
  });
}

