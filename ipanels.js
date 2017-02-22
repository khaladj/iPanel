/*
   Ali Khaladj  Auguest 2016
  JQuery iPanel Plugin

  Usage no JS call use ak-toggle attribute eg:
    <button ak-toggle="#bottom-panel">Open</button>
    <div class="ipanel ipanel-X" id="bottom-panel"></div>

  X: botton, left, right, top
*/
$(function(){

'use strict';

jQuery.iPanel = function() {
    var iPanel={
        closeAll:function(cdr){
          $.each($(".ipanel-active"),function(i){
                var dir = iPanelDir($(this));
                // if clicking / touching the same href to avoid repopen
                if (dir !== cdr )
                   iPanel.close($(this),dir);
          });
        },

        close: function(el,dir){
          var op = {};
           op[dir] = "-100%";
           $( el ).
             animate(op,"slow",function(){
                $(this)
                .removeClass("ipanel-active").
                 addClass("hidden")});
        },

        open: function(el,dir){
          var op = {};
           op[dir] = "0";
           $( el ).
             removeClass("hidden").
             animate(op,"slow",function(){
                $(this)
                .addClass("ipanel-active")});
        },
    }

    var iPanelDir =function(e){
        if ( $(e).hasClass( "ipanel-bottom" ) ){
          return "bottom";
        }else if ( $(e).hasClass( "ipanel-left" ) ){
          return "left";
        }else if ( $(e).hasClass( "ipanel-right" ) ){
          return "right";
        }else if ( $(e).hasClass( "ipanel-top" ) ){
          return "top";
        }
    }


    var handleEvents = function(){

        var closeBtn = $(".ipanel-close-button");
        var ipanelClose = $(".ipanel-close");

        $('body').on('click',"button ,a",function(){
          var el  = $(this).attr("ak-toggle");
          var directions = iPanelDir(el);
          if ($(el).hasClass("hidden") ){
              iPanel.closeAll(directions);
              iPanel.open(el,directions);
          }else{
              iPanel.close(el,directions);}
      });


      ipanelClose.on("click",function(){
        var dir = iPanelDir($(this).closest('.ipanel'));
        var el  = '#'+$(this).closest('.ipanel').attr("id");
        iPanel.close(el,dir);
      })

      closeBtn.on("click",function(){
        var dir = iPanelDir($(this).parent());
        var el  = '#'+$(this).parent().attr("id");
        iPanel.close(el,dir);
      });


      $('.close-all-panels')
           .hammer({ prevent_default: true })
           .on("swipe click",function(evt) {
             if ( $(evt.target).closest('.ipanel').length ||
                  $(evt.target).closest('button').length  ||
                  $(evt.target).closest('.modal').length  ||
                  $(evt.target).closest('input').length   ||
                  $(evt.target).closest('a').length)
                 return;
             iPanel.closeAll(null);
       });
    }
    handleEvents();
  }

  $.iPanel();
});
