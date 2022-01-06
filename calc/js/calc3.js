
/*
デフォルトで表示するカレンダーを現在の年月にして、
年月の表示・前月と翌月への移動の機能を追加してみます。


add_calendar()とgenerate_calendar_header()という関数を
追加しています。
*/


window.onload = function(){
    // 現在の年月の取得
    var current = new Date();
    var year = current.getFullYear();
    var month = current.getMonth() + 1;

    // カレンダーの表示
    var wrapper = document.getElementById('calendar');
    add_calendar(wrapper, year, month);
}

/**
 * 指定した年月のカレンダーを表示する
 * @param {object} wrapper  - カレンダーを追加する親要素
 * @param {number} year     - 年の指定
 * @param {number} getMonth - 月の指定
 */
function add_calendar(wrapper, year, month){
    // 現在カレンダーが追加されている場合は一旦削除する
    wrapper.textContent = null;

    // カレンダーに表示する内容を取得
    var headData = generate_calendar_header(wrapper, year, month);
    var bodyData = generate_month_calendar(year, month);

    // カレンダーの要素を追加
    wrapper.appendChild(headData);
    wrapper.appendChild(bodyData);
}

/**
 * 指定した年月のカレンダーのヘッダー要素を生成して返す
 * @param {object} wrapper  - カレンダーを追加する親要素
 * @param {number} year     - 年の指定
 * @param {number} month    - 月の指定
 */

function generate_calendar_header(wrapper, year, month){
    // 前月と翌月の取得
    var nextMonth = new Date(year, (month - 1));
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    var prevMonth = new Date(year, (month - 1));
    prevMonth.setMonth(prevMonth.getMonth() - 1);

    // ヘッダー要素
    var cHeader = document.createElement('div');
    cHeader.className = 'calendar-header';

    // 見出しの追加
    var cTitle = document.createElement('div');
    cTitle.className = 'calendar-header__title';
    var cTitlText = document.createTextNode(year + '年' + month + '月');
    cTitle.appendChild(cTitlText);
    cHeader.appendChild(cTitle);

    //前月ボタンの追加
    var cPrev = document.createElement('button');
    cPrev.className = 'calendar-header__prev';
    var cPrevText = document.createTextNode('prev');
    //前月ボタンをクリックしたときのイベント設定
    cPrev.addEventListener('click', function(){
        add_calendar(wrapper, prevMonth.getFullYear(),(prevMonth() + 1));
    }, false)
    cHeader.appendChild(cPrev);

    // 翌月ボタンの追加
    var cNext = document.createElement('button');
    cNext.className = document.createTextNode('next');
    cNext.appendChild(cNextText);
    // 翌月ボタンをクリックした時のイベント設定
    cNext.addEventListener('click',function(){
        add_calendar(wrapper, nextMonth.getFullYear(), (nextMonth.getMonth() + 1));
    }, false);
    cHeader.appendChild(cNext);

    return cHeader;
}

/**
 * 指定した年月のカレンダー要素を生成して返す
 * @param {number} year     - 年の指定
 * @param {number} month    - 月の指定
 */
function generate_month_calendar(year, month){
    var weekdayData = ['日', '月', '火', '水', '木', '金', '土'];
    // カレンダーの情報を取得
    var calendarData = generate_month_calendar(year, month);

    var i = calendarData[0]['weekday']; // 初日の曜日を取得
    // カレンダーの上の初日より前を埋める
    while(i > 0){
        i--;
        calendarData.unshift({
            day:'',
            weekday: i
        });
    }
    // 末日の曜日を取得
    var i = calendarData[calendarData.length - 1]['weekday'];
    // カレンダー上の初日より前を埋める
    while( i > 0){
        i--;
        calendarData.unshift({
            day: '',
            weekday: i
        });
    }
    var i = calendarData[calendarData.length - 1]['weekday'];
    // カレンダー上の末日より後を埋める
    while(i < 6){
        i++;
        calendarData.push({
            day: '',
            weekday: i
        });
    }
    // カレンダーの要素を生成
    var cTable = document.createElement('table');
    cTable.className = 'calendar-table';

    var insertData = '';
    // 曜日部分の生成
    insertData += '<thead>';
    insertData += '<tr>';
    for (var i = 0; i < weekdayData.length; i++){
        insertData += '<th>';
        insertData += weekdayData[i];
        insertData += '</th>';
    }

    // 日付部分の生成
    insertData += '<tbody>';
    for (var i = 0; i < calendarData.length; i++){
        if(calendarData[i]['weekday'] <=0){
            insertData += '<tr>';
        }
        insertData += '<td>';
        insertData += calendarData[i]['day'];
        insertData += '</td>';
        if(calendarData[i]['weekday'] >= 6) {
            insertData += '</tr>';
        }
    }
    insertData += '</tbody>';

    cTable.innerHTML = insertData;
    return cTable;
}

/**
 * 指定した年月のカレンダー情報を返す
 * @param {number} year  - 年の指定
 * @param {number} month - 月の指定
 */
function generate_month_calendar(year, month){
    // 指定した年月の初日の情報
    var firstDate = new Date(year, (month - 1), 1);
    // 指定した年月の末日
    var lastDay = new Date(year, (firstDate.getMonth() +1),0).getDate();
    // 指定した年月の初日の曜日
    var weekday = firstDate.getDay();

    //カレンダーの情報を格納
    var calendarData = [];
    // 曜日のカウント用
    var weekdayCount = weekday;
    for (var i = 0; i< lastDay; i++){
        calendarData[i] = {
            day: i + 1,
            weekday: weekdayCount
        }
        // 曜日のカウントが6（土曜日）まできたら、0（日曜日）に戻す
        if(weekdayCount >= 6){
            weekdayCount = 0;
        }else{
            weekdayCount++;
        }
    }
    return calendarData;
}