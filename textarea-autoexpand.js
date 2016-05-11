$(document).ready(function initializeEndNotes() {
  $.each($('input'), function handleInitalFormInput(index) {
    $(this).addClass('auto-expand-input');
    $(this).attr('endnotes-index', index);
    $("<textarea class='autoExpand auto-expand-textarea' rows='1' data-min-rows='1' endnotes-index=" + index + '></textarea>').insertAfter($(this));
    var destination = $('.auto-expand-input[endnotes-index="' + index + '"]').offset();
    $('.auto-expand-textarea[endnotes-index="' + index + '"]').offset({
      top: destination.top,
      left: destination.left
    });

    $(document).one('focus.auto-expand-textarea', '.auto-expand-textarea[endnotes-index="' + index + '"]', setSavedValue);
    $('.auto-expand-input, .auto-expand-textarea').on('keyup', showTextarea);
  });

  $('.auto-expand-textarea').hide();
  $('.auto-expand-textarea').on('focusout', hideTextarea);
  $('.auto-expand-input').on('click', showTextarea);

  $(document).on('input.auto-expand-textarea', '.autoExpand', function setRows() {
    var minRows = this.getAttribute('data-min-rows') | 0;
    var rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
    this.rows = minRows + rows;
  });
});

function hideTextarea() {
  $('.auto-expand-textarea').hide();
}

function showTextarea() {
  var endnotesIndex = $(this).attr('endnotes-index');
  var endnotesIndexSelector = '[endnotes-index="' + endnotesIndex + '"]';
  var val = $(this).val();
  // $('.auto-expand-textarea' + endnotesIndexSelector).val(val);
  $('.auto-expand-input' + endnotesIndexSelector).val(val);
  $('.auto-expand-textarea' + endnotesIndexSelector).show();
  $('.auto-expand-textarea' + endnotesIndexSelector).focus();
}

function setSavedValue() {
  var savedValue = this.value;
  this.value = '';
  this.baseScrollHeight = this.scrollHeight;
  this.value = savedValue;
}
