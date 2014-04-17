(function(){
  'use strict';

  var images = ['blastoise', 'charizard', 'electrode', 'gengar', 'mew', 'muk', 'pikachu', 'scyther', 'venasaur', 'zubat'];

  var clock = 60;
  var timer;
  var clone = images.slice(0);
  for(var i = 0; i < clone.length; i++){
    images.push(clone[i]);
  }

  console.log(images);

  $(document).ready(init);

  function init(){
    $('#start').click(start);
    // $('#animate').click(animate);
    $('#game').on('click', 'img', boardClick);
  }

  function boardClick(){
    var capture = $(this);
    $(this).toggleClass('hidden');
    reHide(capture);
  }

  function reHide(image){

    setTimeout(function(){
      image.toggleClass('hidden');
    },500);

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

    console.log(images);
    return images;
  }

  function srcImages(){

    var $tds = $('#game td');

    for(var i = 0; i < images.length; i++){
      var $img = $('<img>');
      var pokemon = images[i];
      $img.attr('src', './media/' + pokemon + '.jpg').addClass('hidden');
      console.log(pokemon);
      $($tds[i]).empty();
      $($tds[i]).append($img);
    }

  }


  function start(){
    shuffleImages(images);
    createTable();
    srcImages();
    timer = setInterval(countdown, 1000);
    clock = 60;
    countdown();
  }

  function countdown(){
    clock--;
    $('#countdown').text(clock);
    if (clock <= 0){
     clearInterval(timer);
     $('#game').empty();
     $('#warning').addClass('hidepoke');
     return;
    }

    if(clock<=10){
      $('#warning').removeClass('hidepoke');
      setInterval(function () {
        $('#warning').css('background-color', function () {
          this.switch = !this.switch;
          return this.switch ? '#000' : '';
        });
      }, 200);
    }
  }


  // function animate(){
  //   $('.flipper').toggleClass('rotate');
  // }



})();
