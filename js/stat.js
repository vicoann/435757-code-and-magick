'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var TEXT_HEIGHT = 16;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var MAX_BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// функция , находящая максимальное время прохождения в цикле times
var getMaxTime = function (times) {
  var max = times[0]; // беру первый элемент массива, предполагаю, что это макс значение массива
  for (var i = 0; i < times.length; i++) { // перебираю весь массив
    // если элемент больше чем в переменной то присваеваем его значение переменной
    if (times[i] > max) {
      max = times [i];
    }
  }
  return max;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0,0,0,0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2 + TEXT_HEIGHT);

  var maxTime = getMaxTime(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'black';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 5 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT - GAP - (MAX_BAR_HEIGHT * times[i] / maxTime) - TEXT_HEIGHT - GAP);
    if (names [i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }
    ctx.fillRect(CLOUD_X + GAP * 5 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT - GAP - (MAX_BAR_HEIGHT * times[i] / maxTime), BAR_WIDTH, MAX_BAR_HEIGHT * times[i] / maxTime);
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], CLOUD_X + GAP * 5 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT);
  }
};
