(function(){
  'use strict';

  var images = ['blastoise', 'charizard', 'electrode', 'gengar', 'mew', 'muk', 'pikachu', 'scyther', 'venasaur', 'zubat'];

  var capture;
  var clock;
  var timer;
  var pair = [];

  var clone = images.slice(0);
  for(var i = 0; i < clone.length; i++){
    images.push(clone[i]);
  }

  $(document).ready(init);

  function init(){
    $('#start').click(start);
    $('#game').on('click', 'img', boardClick);
  }

  function createTable(){
    for(var i = 0; i < 4; i++){
      var $tr = $('<tr>');
      $('#game').append($tr);
    }

    for(var j = 0; j < 5; j++){
      var $td = $('<td class="box">');
      $('#game > tbody > tr').append($td);
    }
  }

  function shuffleImages(images) {
    for (var i = images.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = images[i];
        images[i] = images[j];
        images[j] = temp;
    }
    return images;
  }

  function srcImages(){

    var $tds = $('#game td');

    for(var i = 0; i < images.length; i++){
      var $img = $('<img>');
      var pokemon = images[i];
      $img.attr('src', './media/' + pokemon + '.jpg').addClass('hidden');
      $($tds[i]).append($img);
    }
  }

  function start(){
    $('#game').empty();
    shuffleImages(images);
    createTable();
    srcImages();
    clearInterval(timer);
    timer = setInterval(countdown, 1000);
    clock = 60;
    countdown();
  }

  function boardClick(){
    capture = $(this);
    console.log(this);
    $(this).toggleClass('hidden');
    // reHide(capture);
    pair.push(this);

    if(pair.length === 2){
      compare();
    }
  }

  function compare(){

    var $first = pair[0];
    var $second = pair[1];

    var src1 = $($first).attr('src');
    var src2 = $($second).attr('src');

    if(src1 === src2){
      $($first).addClass('frozen');
      $($second).addClass('frozen');

      $('img.frozen').off('click');
      //$($second).off('click');

    } else {
      setTimeout(function(){
        $($first).toggleClass('hidden');
        $($second).toggleClass('hidden');
      },500);
    }

    pair = [];
  }

  function countdown(){
    clock--;
    $('#countdown').text(clock);
    if (clock <= 0){
     clearInterval(timer);
     $('#warning').addClass('hidepoke');
     results();
     return;
    }

    warning();
  }

  function results(){
    var matches = $('.frozen').length;
    console.log(matches);

    if(matches === 20){
      alert('winner');
    } else {
      alert('LOSER');
    }
  }

  function warning(){
    if(clock === 10){
      $('#warning').removeClass('hidepoke');
      setInterval(function () {
        $('#warning').css('background-color', function () {
          this.switch = !this.switch;
          return this.switch ? '#000' : '';
        });
      }, 200);
      $('#countdown').css('color', 'red');
    }

  }

})();
