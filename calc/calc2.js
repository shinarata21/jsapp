// 年月の指定
var year = 2022;
var month = 5;

window.onload = function(){
    var data = generate_month_calendar(year, month);
    document.getElementById('calendar').appendChild(data);
}

/**
 *  指定した年月のカレンダー要素を生成して返す
 * @param {number} year - 年の指定
 * @param {number} month - 月の指定
 */

function generate_month_calendar(year, month){
    var weekdayData = ['日','月','火','水','木','金','土'];
    // カレンダーの情報を取得
    var calendarData = get_month_calender(year, month);
    // 初日の曜日の取得
    var i = calendarData[0]['weekday'];
    // カレンダー上の初日より前を埋める
    while(i > 0) {
        i--;
        calendarData.unshift({
            day: '',
            weekday: i
        });
    }
    // 末日の曜日を取得
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

    var inserData = '';
    // 曜日の部分の生成
    inserData += '<thead>';
    inserData += '<tr>';
    for (var i = 0; i < weekdayData.length; i++){
        inserData += '<th>';
        inserData += weekdayData[i];
        inserData += '</th>';
    }
    inserData += '</tr>';
    inserData += '</thead>';

    // 日付部分の生成
    inserData += '<tbody>';
    for (var i = 0; i < calendarData.length; i++){
        if(calendarData[i]['weekday'] <= 0){
            inserData += '<tr>';
        }
        inserData += '<td>';
        inserData += calendarData[i]['day'];
        inserData += '</td>';
        if(calendarData[i]['weekday'] >=6){
            inserData += '</tr>';
        }
        inserData += '</tbody>';

        cTable.innerHTML = inserData;
        return cTable;
    }

    /**
     * 指定した年月のカレンダーの情報を返す
     * @param {number} year - 年の指定
     * @param {number} month - 月の指定
     */

    function get_month_calender(year, month) {
        // 指定した年月の初日の情報
        var firstDate = new Date(year, (month -1), 1);
        // 指定した年月の末日
        var lastDay = new Date(year, (firstDate.getMonth() + 1), 0).getDate();
        // 指定した年月の初日の曜日
        var weekday = firstDate.getDay();

        // カレンダーの情報を格納
        var calendarData = [];
        // 曜日のカウント用
        var weekdayCount = weekday;
        for (var i = 0; i < lastDay; i++){
            calendarData[i] = {
                day: i +1;
                weekday: weekdayCount
            }
            // 曜日のカウントが6（土曜日）まできたら0（日曜日）に戻す
            if(weekdayCount >= 6){
                weekdayCount = 0;
            } else {
                weekdayCount++;
            }
            return calendarData;
        }
    }
}