$(function(){
  const openBtn = $("#hamburger");
  const closeBtn = $("#close");
  const overlay = $("#overlay");
  const panel = $("#drawer-menu");
  function panelOpen() {
    overlay.fadeIn('fast');
    panel.addClass('open');
  }
  function panelClose() {
    overlay.fadeOut('fast');
    panel.removeClass('open');
  }
  openBtn.on('click',function(){
    panelOpen();
  });
  closeBtn.on('click',function(){
    panelClose();
  });
  overlay.on('click',function(){
    panelClose();
  });
  $(window).on('resize',function(){
    panelClose();
  });
});