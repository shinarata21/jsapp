
// 年月の指定
var year = 2022;
var month = 5;

window.onload = function(){
    console.log(get_month_calender(year, month));
}

function get_month_calender(year, month){
    // 指定した年月の初日の情報を取得
    var firstDate = new Date(year, (month -1),1);
    // 指定した年月の末日
    var lastDay = new Date(year, (firstDate.getMonth() + 1),0).getDate();
    // 指定した年月の曜日
    var weekday = firstDate.getDate();

    // カレンダーの情報を格納
    var calenderData = [];
    // 曜日のカウント用
    var weekdayCount = weekday;
    for (var i =0; i < lastDay; i++){
        calenderData[i] = {
            day: i + 1,
            weekday: weekdayCount
        }
        // 曜日のカウントが6(土曜日)まできたら0(日曜日)に戻す
        if(weekdayCount >= 6){
            weekdayCount = 0;
        }else{
            weekdayCount++;
        }
    }
    return calenderData;
}