'use strict'

// calendarに表示されている日付を管理するオブジェクト
var dateManager = {
  _targetYear: '',
  _targetMonth: '',
  
  get targetYear() {
    return this._targetYear;
  },

  set targetYear(y) {
    this._targetYear = y;
  },

  get targetMonth() {
    return this._targetMonth;
  },

  set targetMonth(m) {
    this._targetMonth = m;
  }
}

// function setCalendar (target_year, target_month) { 
// $function() {
var setCalendar = (target_year, target_month) => { 

  // dateManagerにこれから表示する年と月を連携しておく
  // これは後々、年月を変更する際に使用する
  dateManager.targetYear = target_year;
  dateManager.targetMonth = target_month;
  
  var startDay = (year, month) => {
    return new Date(year + '/' + month + '/01').getDay();
  };
  var lastDays= new Array(31, 28, 31, 30, 31, 30,
                          31, 31, 30, 31, 30, 31);
  if(((target_year % 4 == 0 && target_year % 100 != 0) || target_year % 400 == 0)) {
    lastDays[1] = 29;  //2月
  }
  // Days_of_the_Week
  var dowTbl = new Array('日', '月', '火', '水', '木', '金', '土');

  // $(function() {
    // console.log($('.set_calendar').text());
  // });

  var insertHTML = '';
  insertHTML += '<table class="calendar_table">';
  insertHTML += '<tr class="date_header"><td class="previous">◀︎</td><th colspan=5>';
  insertHTML += target_year + '年' + target_month + '月';
  insertHTML += '</th><td class="next">▶</td></tr>';
  insertHTML += '<tr>'
  dowTbl.map(dow => {
    switch(dow) {
      case '日':
        insertHTML += '<th class="sunday">' + dow + '</th>';
        break;
      case '土':
        insertHTML += '<th class="saturday">' + dow + '</th>';
        break;
      default:
        insertHTML += '<th>' + dow + '</th>';
        break;
    }
  });
  insertHTML += '</tr>';

  // 実際の日付の挿入処理
  var col = 0;  //編集対象の列番号
  var insertClass = ''; // classをつけるための変数
  insertHTML += '<tr>';

  // １日が出てくるまで空のtdで埋めていく
  for(;col < startDay(target_year, target_month); col++) {
    insertHTML += '<td>&nbsp;</td>';
  }

  // 実際に日付のtdを入れる処理
  for(var i = 1; i <= lastDays[target_month - 1]; i++) {
    insertClass+= 'date';
    
    // .todayを入れるか判定
    if((target_year + '/' + target_month+ '/' + i) == 
    myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getDate()) {
      insertClass += ' ' + 'today';
    }

    // 土日判定とcol=6(つまり土曜日)になったら/trして次のtrを入れる処理
    if(col != 6) {
      if(col == 0) {
        insertClass+= ' ' + 'sunday';
      }
      insertHTML +=  '<td class="' +  insertClass + '" name="date" data-date=' + target_year + '/' + target_month + '/' + i + '>' + i + '</td>';
      insertClass = '';
      col++;
    }
    else if(col == 6) {
      insertClass += ' ' + 'saturday';
      insertHTML +=  '<td class="' +  insertClass + '" name="date" data-date=' + target_year + '/' + target_month + '/' + i + '>' + i + '</td>';
      insertHTML += '</tr>';
      insertHTML += '<tr>';
      insertClass = '';
      col = 0;
    }
  }

  // テーブルをクローズ
  insertHTML += '</table>';

  // .set_calendarの中の子要素にinsertHTMLを追加
  $('.set_calendar').append(insertHTML);
  // $('.set_calendar th').addClass('hoge');
}

// init()
var myDate = new Date();
var myYear = myDate.getFullYear();
var myMonth = myDate.getMonth();
setCalendar(myYear, myMonth + 1);

// 日付変更◀︎▶︎をクリックした際にイベント発生
$('#calendar').on('click', '.date_header > .previous', () => {
  $('.set_calendar').empty();

  dateManager.targetMonth--;

  if(dateManager.targetMonth == 0) {
    dateManager.targetYear--;
    dateManager.targetMonth = 12;
  }
  setCalendar(dateManager.targetYear, dateManager.targetMonth);
});

$('#calendar').on('click', '.date_header > .next', () => {
  $('.set_calendar').empty();
 
  dateManager.targetMonth++;
 
  if(dateManager.targetMonth == 13) {
    dateManager.targetYear++;
    dateManager.targetMonth = 1;
  }
  setCalendar(dateManager.targetYear, dateManager.targetMonth);
});