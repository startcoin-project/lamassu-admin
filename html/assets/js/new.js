'use strict';

$(document).ready(function() {
  var backend = new BackendClient();
  $('.nav--primary__item').click(function(e) {
    e.preventDefault();
    var target = $(this);
    var link = target.find('a');
    var targetPage = $('#page-' + link.data('page'));
    var otherPages = $('#page-container > div').not(targetPage);

    $('.nav--primary__item').removeClass('is-current');
    target.addClass('is-current');
    otherPages.hide();
    otherPages.addClass('hidden');
    targetPage.show();
    otherPages.removeClass('js-active');
    targetPage.addClass('js-active');
    window.setTimeout(function() { targetPage.removeClass('hidden'); }, 0);
  });
  $('.nav--primary__item').has('[data-page="exchanges"]').click();
  $('#floating-bar a').click(function(e) {
    e.preventDefault();
    backend.sendPage();
  });
  backend.populate();
});

var BackendClient = function BackendClient() {
  this.config = null;
};

BackendClient.prototype.populate = function populate() {
  var self = this;
  $.get('/ajax/init', function(data) {
    self.config = data;
    console.dir(data);
    self.populateExchanges();
  });
};

BackendClient.prototype.populateExchanges = function populateExchanges() {
  this.populateExchange('ticker');
  this.populateExchange('trade');
  this.populateExchange('transfer');
};

BackendClient.prototype.populateExchange = function populateExchange(type) {
  var self = this;
  var exchangeInfo = this.config.info.exchanges;
  var exchangeConfig = this.config.userConfig.exchanges;
  var exchanges = exchangeInfo.plugins.available[type];
  var exchangeOptions = _.map(exchanges, function(code) {
    return {
      text: exchangeInfo.plugins.info[code].display,
      value: code
    };
  });
  var list = $('#exchanges-' + type + '-current').selectize({
    maxItems: 1,
    options: exchangeOptions,
    sortField: [{field: 'text'}],
    onChange: function(value) { self.loadExchangeFields(type, value); }
  });
  var selectized = list[0].selectize;
  var currentExchange = exchangeConfig.plugins.current[type];
  if (currentExchange === null) return;
  selectized.addItem(currentExchange);
//  this.loadExchangeFields(type, currentExchange);
};

BackendClient.prototype.loadExchangeFields = 
    function loadExchangeFields(type, currentExchange) {
  var exchangeInfo = this.config.info.exchanges;
  var exchangeConfig = this.config.userConfig.exchanges;
  var template = $('#exchanges-' + type + ' li.template');
  var container = $('#exchanges-' + type + ' ul.form-fields');
  container.find('.js-dynamic-field').remove();
  if (!currentExchange) return;
  var fields = exchangeInfo.plugins.info[currentExchange].fields;
  _.each(fields, function(rec) {
    var newField = template.clone();
    var input = newField.find('input');
    var name = ['exchanges', 'plugins', 'settings', currentExchange, rec.code].join('-');
    newField.addClass('js-dynamic-field').removeClass('template');
    input.attr('placeholder', rec.display).attr('name', name);
    var settings = exchangeConfig.plugins.settings[currentExchange];
    if (settings) input.val(settings[rec.code]);
    container.append(newField);
  });
};

BackendClient.prototype.sendPage = function sendPage() {
  var activeForm = $('#page-container .js-active form');
  $.ajax({
      type: 'POST',
      url: '/ajax/update',
      data: JSON.stringify(activeForm.serializeArray()),
      contentType: 'application/json',
      dataType: 'json'
  });  
};