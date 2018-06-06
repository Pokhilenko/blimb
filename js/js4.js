$(function () {
  if (!navigator.cookieEnabled) {
    alert('Включите cookies для правильной работы с нашим сайтом');
  }

  var textAlert = [
    'Ну же',
    'Время пришло'
  ];

  if ($.browser.mozilla) {
    var audio1 = new Audio('audio/audio1.ogg');
    var audio2 = new Audio('audio/audio2.ogg');
    var audio3 = new Audio('audio/audio3.ogg');
  } else {
    var audio1 = new Audio('audio/audio1.wav');
    var audio2 = new Audio('audio/audio2.wav');
    var audio3 = new Audio('audio/audio3.wav');
  }
  $('.mini').click(function () {
    if ($(this).hasClass('active')) {
      $(this)
        .removeClass('active')
        .addClass('disabled');
      $('.img')
        .removeClass('active')
        .addClass('disabled');
    }

    setTimeout(function(){
      location.reload(true);
    }, 500);
    return false;
  });
  var checkVoice = getCookie('audio');
  var volume = $('.volume');

  if (checkVoice) {
    volume.prop('class', 'volume').addClass(checkVoice);
  }

  $('.type_browser').click(function(){
    $('.bag_list').toggleClass('active');
  });
  volume.click(function () {
    $('.volume_list').toggleClass('active');
  });

  $('.volume_list li span').click(function () {
    volume.prop('class', 'volume');
    audio1.pause();
    audio1.currentTime = 0;
    audio2.pause();
    audio2.currentTime = 0;
    audio3.pause();
    audio3.currentTime = 0;
    if ($(this).hasClass('first_voice')) {
      volume.addClass('first');
      audio1.play();

      setCookie('audio', 'first');
    } else if ($(this).hasClass('second_voice')) {
      volume.addClass('second');
      audio2.play();
      setCookie('audio', 'second');
    } else if ($(this).hasClass('three_voice')) {
      volume.addClass('three');
      audio3.play();
      setCookie('audio', 'three');
    } else {
      volume.addClass('off');
    }
  });

  for(var point = 1; point < 11; point++){
    var pointVolume = point /10;
    $('<div class="point_volume" data-volume=" ' + pointVolume + ' "></div>').prependTo('.slide_line_volume');
  }
  $('.point_volume').first().addClass('active');
  var checkMouse;

  $('.slide_line_volume').mousedown(function(){
    checkMouse = true;
    $('.point_volume').hover(function(){
      if(checkMouse){
        $('.point_volume').removeClass('active');
        $(this).addClass('active');
        changeAudioVolume($(this).attr('data-volume'));
      }
    }).click(function(){
      $('.point_volume').removeClass('active');
      $(this).addClass('active');
      changeAudioVolume($(this).attr('data-volume'));
    });
  }).mouseup(function(){
    checkMouse = false;
  }).mouseleave(function(){
    checkMouse = false;
  });

  function changeAudioVolume(level){
    audio1.volume = level;
    audio2.volume = level;
    audio3.volume = level;
    audio1.currentTime = 0;
    audio2.currentTime = 0;
    audio3.currentTime = 0;

    $('.slide_line_volume').find('.after').css({
      'height' : (level * 100) +'%'
    });
    if(level == 1 || level == 0.9){
      $('.volume_panel').prop('id','maximum');
    }else
    if(level == 0.8 || level == 0.7 || level == 0.6){
      $('.volume_panel').prop('id','middle');
    }else
    if(level == 0.5 || level == 0.4 || level == 0.3){
      $('.volume_panel').prop('id','medium');
    }else{
      $('.volume_panel').prop('id','minimum');
    }


    if(volume.hasClass('first')){
      audio1.play();
    }else
    if(volume.hasClass('second')){
      audio2.play();
    }else{
      audio3.play();
    }
  }

  function languageSide(language){
    if(language == 'ua'){
      $('.likely__button_twitter').text('Твітнути');
      $('.likely__button_facebook').text('Поділитися');
      $('.likely__button_vkontakte').text('Поділитися');
      $('.likely__button_pinterest').text('Запінити');
      $('.type_browser').prop('title','Баг-лист');

      textAlert = [
        'Дiй',
        'Час прийшов'
      ];
      getBugList('bag_list/ukraine.html');
    }else
    if(language == 'ru'){
      $('.likely__button_twitter').text('Твитнуть');
      $('.likely__button_facebook').text('Поделиться');
      $('.likely__button_vkontakte').text('Поделиться');
      $('.likely__button_pinterest').text('Запинить');
      $('.type_browser').prop('title','Баг-лист');

      textAlert = [
        'Get up',
        'Time is coming'
      ];

      getBugList('bag_list/russian.html');
    }else{
      $('.likely__button_twitter').text('Twit');
      $('.likely__button_facebook').text('Share');
      $('.likely__button_vkontakte').text('Share');
      $('.likely__button_pinterest').text('Pin');
      $('.type_browser').prop('title','Bag-list');

      textAlert = [
        'Ну же',
        'Время пришло'
      ];

      getBugList('bag_list/english.html');
    }
  }

  function getBugList(url){
    $.ajax({
      type: "POST",
      url: url,
      data: $(this).html(),

      success: function(data){
        $('.bag_list_content').html(data);
      }
    });
  }

  $('.volume_panel').click(function(){
    $('.slide_line_volume').toggleClass('active');
  });

  $(document).click(function(event){
    if(event.target.closest('.option_panel')) return false;

    $('.slide_line_volume, .volume_list').removeClass('active');
  });

  var typeOfLanguage = getCookie('language');


  if(typeOfLanguage == undefined){
    var broserLanguage = navigator.language || navigator.userLanguage;

    if(broserLanguage.indexOf('ru') != -1){
      $('body').addClass('russian');
      setTimeout(function () {
        languageSide('ru');
      }, 100);
      $('.language_panel').find('span').text('Ru');
    }else
    if(broserLanguage.indexOf('uk') != -1){
      $('body').addClass('ukraine');
      setTimeout(function () {
        languageSide('ua');
      }, 100);
      setCookie('language', 'ukraine');
      $('.language_panel').find('span').text('Ua');

    }else{
      $('body').addClass('english');
      setTimeout(function () {
        languageSide('en');
      }, 100);
      setCookie('language', 'english');
      $('.language_panel').find('span').text('En');
    }
  }else
  if (typeOfLanguage == 'ukraine') {
    $('body').addClass('ukraine');
    setTimeout(function () {
      languageSide('ua');
    }, 100);
    $('.language_panel').find('span').text('Ua');
  }else
  if (typeOfLanguage == 'russian') {
    $('body').addClass('russian');
    setTimeout(function () {
      languageSide('ru');
    }, 100);
    $('.language_panel').find('span').text('Ru');
  }else{
    $('body').addClass('english');
    setTimeout(function () {
      languageSide('en');
    }, 100);
    $('.language_panel').find('span').text('En');
  }

  $('.language_panel').click(function () {
    var typePanel = $(this).find('span');
    var body = $('body');

    if(body.hasClass('russian')){
      body.prop('class', 'english');
      setCookie('language', 'english');
      typePanel.text('En');

      languageSide('en');
    }else
    if(body.hasClass('ukraine')){
      body.prop('class', 'russian');
      setCookie('language', 'russian');
      typePanel.text('Ru');
      languageSide('ru');
    }else{
      body.prop('class', 'ukraine');
      setCookie('language', 'ukraine');
      typePanel.text('Ua');
      languageSide('ua');
    }
  });
  $(window).resize(function () {
    resizeWindow();
  });
  resizeWindow();

  var resizeTime;

  function resizeWindow() {
    var heightOfWindow = window.innerHeight;

    if ($('.last').hasClass('active') || $('.massiveBlock.first').hasClass('active')) {
      $('#wrapper').css('padding-top', '');
      if ($('.massiveBlock.first').hasClass('active') && heightOfWindow < 540) {
        $('.navi_block').addClass('stopped');
      } else {
        $('.navi_block').removeClass('stopped');
      }
    } else {
      clearTimeout(resizeTime);

      var padding = heightOfWindow / 2 - 205;

      if (padding < 1) {
        padding = 0;
      }
      resizeTime = setTimeout(function () {
        $('#wrapper').css({
          'padding-top': padding
        });

      }, 200);

    }
  }

  var day = new Date().getDate();
  var hour = new Date().getHours();
  var minutes = new Date().getMinutes();
  var seconds = new Date().getSeconds();
  var howMatch = 0;
  var time;
  var timeIn = 5;
  var globalTime;
  var nTime;


  function isInteger(num) {
    return (num ^ 0) === num;
  }

  if (getCookie('dates') !== undefined && isInteger(parseInt(getCookie('dates')))) {
    var getDate = getCookie('dates');
    var presentSprint = (day * 24 * 3600) + (hour * 3600) + (minutes * 60) + seconds;

    if (presentSprint - getDate < 43200) {
      globalTime = presentSprint - getDate;
      $('.extended_counter').addClass('active');
      startGlobalTime();
    } else {
      setCookie('dates', 0);
      globalTime = 0;
    }
  }else {
    globalTime = 0;
  }

  var blickIcon = true;

  $('.muted').click(function () {
    volume.prop('class', 'volume').addClass('off');
    setCookie('audio', 'off');
  });

  $('#start').click(function () {
    $('.img, .mini').removeClass('disabled');
    changeBlock();
    timeExecice();
    $('.social-button').css('display', 'none');
    $('.extended_counter').removeClass('active');
    $('.timer, .img, .mini').addClass('active');
    blickIcon = false;
    setTimeout(function () {
      $('link[rel$=icon]').remove();
      $('head').append($('<link rel="shortcut icon" type="image/x-icon"/>').attr('href', ""+ faviconPrimal +""));
      $('title').text('blimb');
    }, 1000);
  });

  $('.continue').click(function () {
    if ($('#do_not_show_again').is(':checked')) {
      setCookie('skill', 'expert');
    }
    clearInterval(time);
    changeBlock();
    timeExecice();
    $('.instruction_block').css('display', 'none').removeClass('massiveBlock');

    return false;
  });

// функция измения класса active для блоков
  function changeBlock() {
    $('.massiveBlock.active')
      .next()
      .addClass('active')
      .prev()
      .removeClass('active');
    $('.timer').html(parseInt($('.massiveBlock.active').attr('data-time')));

    resizeWindow();
  }

  function timeExecice() {
    timeIn = parseInt($('.massiveBlock.active').attr('data-time'));
    time = setInterval(function () {
      timeIn--;

      if (timeIn == 0) {


        if (volume.hasClass('three')) {
          audio3.play();
        } else if (volume.hasClass('second')) {
          audio2.play();
        } else if (volume.hasClass('first')) {
          audio1.play();
        }

        clearInterval(time);
        changeBlock();
        howMatch++;
        if (howMatch < parseInt($('.massiveBlock').size()) - 1) {
          timeExecice();
        } else {
          //записи данных в куки, время на момент завершения, все параметры в первоначальное
          // состояние
          $('#wrapper').css('padding-top', '0');
          day = new Date().getDate();
          hour = new Date().getHours();
          minutes = new Date().getMinutes();
          seconds = new Date().getSeconds();

          var postTimeSprint = (day * 24 * 3600) + (hour * 3600) + (minutes * 60) + seconds;

          setCookie('dates', parseInt(postTimeSprint));
          $('.massiveBlock').removeClass('active');
          $('.last').addClass('active');
          setTimeout(function () {
            $('.massiveBlock.first')
              .addClass('active');
            $('.extended_counter').addClass('active');
            $('.last').removeClass('active');
            setCookie('dates', parseInt(postTimeSprint));
            if (getCookie('skill') != 'expert') {
              $('.instruction_block').css('display', '').addClass('massiveBlock');
            }
          }, 10000);

          clearInterval(nTime);
          $('.timer, .img, .mini').removeClass('active');
          $('.mini').addClass('disabled');
          $('.img').hide();
          setTimeout(function () {
            $('.img').show().addClass('disabled');
          }, 1000);
          globalTime = 0;
          timeIn = 5;
          howMatch = 0;
          startGlobalTime();
          $('.social-button').css('display', 'block');
          resizeWindow();

        }
      }

      $('.timer').html(timeIn < 10 ? "0" + timeIn : timeIn);
    }, 1000);
  }

// функция старта глобального отсчета - пост выполения скрипта
  function startGlobalTime() {
    nTime = setInterval(function () {
      globalTime++;
      var sec = globalTime;
      var h = sec / 3600 ^ 0;
      var m = (sec - h * 3600) / 60 ^ 0;
      var s = sec - h * 3600 - m * 60;

      $('.extended_counter .hour').html((h < 10 ? "0" + h : h));
      $('.extended_counter .minutes').html((m < 10 ? "0" + m : m));
      $('.extended_counter .seconds').html((s < 10 ? "0" + s : s));
      if (h >= 1) {
        getUpBaby();
      }
    }, 1000);
  }

  var faviconText = 0;

  function getUpBaby() {
    if (blickIcon) {
      faviconText++;

      if(faviconText > faviconsArray.length - 1){
        faviconText = 0;
      }

      $('link[rel$=icon]').remove();
      $('head').append($('<link rel="shortcut icon" type="image/x-icon"/>').attr('href', "" + faviconsArray[faviconText] + ""));

      if ((faviconText % 2) == 0) {
        $('title').text(textAlert[0]);
      }
      else
      if ((faviconText % 1) == 0) {
        $('title').text(textAlert[1]);
      }
    }
  }

// функция для записи кукисок в браузер
  function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
      var d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
      updatedCookie += "; " + propName;
      var propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }

    document.cookie = updatedCookie;
  }

// возвращает cookie с именем name, если есть, если нет, то undefined
  function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  /* Detect Chrome */
  if (!$.browser.mozilla || !$.browser.msie) {


    var $div = document.getElementById("gradient");

    var gradients = [
      {start: [69, 126, 128], stop: [145, 203, 205]},
      {start: [53, 76, 116], stop: [82, 123, 156]},
      {start: [201, 91, 119], stop: [137, 93, 160]},
      {start: [138, 219, 176], stop: [157, 197, 120]},
      {start: [233, 126, 130], stop: [242, 166, 109]},
      {start: [146, 122, 155], stop: [193, 96, 161]},
      {start: [172, 26, 1], stop: [152, 93, 131]}
    ];

    var transition_time = 20;

    var fps = 60;


    var timer; // for the setInterval
    var interval_time = Math.round(1000 / fps); // how often to interval
    var currentIndex = 0; // where we are in the gradients array
    var nextIndex = 1; // what index of the gradients array is next
    var steps_count = 0; // steps counter
    var steps_total = Math.round(transition_time * fps); // total amount of steps
    var rgb_steps = {
      start: [0, 0, 0],
      stop: [0, 0, 0]
    }; // how much to alter each rgb value
    var rgb_values = {
      start: [0, 0, 0],
      stop: [0, 0, 0]
    }; // the current rgb values, gets altered by rgb steps on each interval
    var prefixes = ["-webkit-", "-moz-", "-o-", "-ms-", ""]; // for looping through adding styles
    var div_style = $div.style; // short cut to actually adding styles
    var gradients_tested = false;
    var color1, color2;

// sets next current and next index of gradients array
    function set_next(num) {
      return (num + 1 < gradients.length) ? num + 1 : 0;
    }

// work out how big each rgb step is
    function calc_step_size(a, b) {
      return (a - b) / steps_total;
    }

// populate the rgb_values and rgb_steps objects
    function calc_steps() {
      for (var key in rgb_values) {
        if (rgb_values.hasOwnProperty(key)) {
          for (var i = 0; i < 3; i++) {
            rgb_values[key][i] = gradients[currentIndex][key][i];
            rgb_steps[key][i] = calc_step_size(gradients[nextIndex][key][i], rgb_values[key][i]);
          }
        }
      }
    }

// update current rgb vals, update DOM element with new CSS background
    function updateGradient() {
      // update the current rgb vals
      for (var key in rgb_values) {
        if (rgb_values.hasOwnProperty(key)) {
          for (var i = 0; i < 3; i++) {
            rgb_values[key][i] += rgb_steps[key][i];
          }
        }
      }

      // generate CSS rgb values
      var t_color1 = "rgb(" + (rgb_values.start[0] | 0) + "," + (rgb_values.start[1] | 0) + "," + (rgb_values.start[2] | 0) + ")";
      var t_color2 = "rgb(" + (rgb_values.stop[0] | 0) + "," + (rgb_values.stop[1] | 0) + "," + (rgb_values.stop[2] | 0) + ")";

      // has anything changed on this interation
      if (t_color1 != color1 || t_color2 != color2) {

        // update cols strings
        color1 = t_color1;
        color2 = t_color2;

        // update DOM element style attribute
        div_style.backgroundImage = "-webkit-gradient(linear, left bottom, right top, from(" + color1 + "), to(" + color2 + "))";
        for (var i = 0; i < 4; i++) {
          div_style.backgroundImage = prefixes[i] + "linear-gradient(45deg, " + color1 + ", " + color2 + ")";
        }
      }

      // test if the browser can do CSS gradients
      if (div_style.backgroundImage.indexOf("gradient") == -1 && !gradients_tested) {
        // if not, kill the timer
        clearTimeout(timer);
      }
      gradients_tested = true;

      // we did another step
      steps_count++;
      // did we do too many steps?
      if (steps_count > steps_total) {
        // reset steps count
        steps_count = 0;
        // set new indexs
        currentIndex = set_next(currentIndex);
        nextIndex = set_next(nextIndex);
        // calc steps
        calc_steps();
      }
    }

    calc_steps();

// go go go!
    timer = setInterval(updateGradient, interval_time);
  } else {
    var backgroundNumber = 0;

    setInterval(function () {
      if (backgroundNumber == 10) {
        backgroundNumber = 0;
      } else {
        backgroundNumber++;
        $('html').addClass('background' + backgroundNumber);
      }
    }, 15000);
  }
});