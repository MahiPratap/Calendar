let calendarShow = 1;


//  function of get date between 
function getDatesBetween(date1, date2) {
    // date1 & date2 is string so convert in into date object
    let range1 = new Date(date1); 
    let range2 = new Date(date2);

    date1 = settingDate(date1, 31);
    date2 = settingDate(date2, 31);

    function settingDate(date, day) {
        date = new Date(date);
        //  this are js in-built method
        // Set the day as a number (1-31)
        date.setDate(day);
        // Set the hour (0-23)
        date.setHours(23);
        return date;
    }

    let temp;
    //  date [] gives us the last date of every month
    let dates = [];
    while (date1 <= date2) {
        //  when we have month with less than 31 days 
        if (date1.getDate() != 31) {
            temp = settingDate(date1, 0);
            if (temp >= range1 && temp <= range2) dates.push(temp);
            date1 = settingDate(date1, 31);
        }
        // this will increase the month 
        else {
            temp = new Date(date1);
            if (temp >= range1 && temp <= range2) dates.push(temp);
            date1.setMonth(date1.getMonth() + 1);
        }
    }
    console.log(dates);

    let content = "<div class='calendarbtns'><button id='calendarPrev' onclick='callPrev()' disabled = false; >Prev</button> | <button id='calendarNext'onclick='callNext()' >Next</button> ";
    let weekDays = [
        { shortDay: "Mon", fullDay: "Monday" }, 
        { shortDay: "Tue", fullDay: "Tuesday" }, 
        { shortDay: "Wed", fullDay: "Wednesday" }, 
        { shortDay: "Thu", fullDay: "Thursday" }, 
        { shortDay: "Fri", fullDay: "Friday" }, 
        { shortDay: "Sat", fullDay: "Saturday" }, 
        { shortDay: "Sun", fullDay: "Sunday" }
    ];
    for(let i=0; i<dates.length; i++){
        LastDate = dates[i];
        firstDate = new Date(dates[i].getFullYear(), dates[i].getMonth(), 1);
        content += "<div id='calendarTable"+(i+1)+"' class = 'calendarDiv'>";
        content += "<h2>"+firstDate.toString().split(" ")[1]+"-"+firstDate.getFullYear()+"</h2>";
        content += "<table class='calendarTable'>";
        content += "<thead>";
        weekDays.map(item =>{
            content += "<th>"+item.fullDay+"</th>";
        });
        content += "</thead>";
        content += "<tbody>";
        let j=1;
        let displayNum, idMonth;
        while(j <= LastDate.getDate()){
            for(let k=0; k<7; k++){
                displayNum = j < 10 ? `0${j}` : j;
                if(j==1){
                    // to check from which day the day is started put them 
                    if(firstDate.toString().split(" ")[0]== weekDays[k].shortDay){
                        content += "<td>" + displayNum + "</td>";
                        j++;
                    }
                    else{
                        // blank space in calender
                        content += "<td>"+" "+ " </td>"; 
                    }
                }
                else if(j > LastDate.getDate()){
                    content += "<td>"+" "+ "</td>"; 
                }
                else{
                    content += "<td>" + displayNum + "</td>";
                    j++;
                }
            }
            content += "</tr>";
        }

        content += "</table>";
        content += "</div>";
    }
    return content;
}
function callPrev(){
    let allTable = document.getElementsByClassName('calendarDiv');
    document.getElementById("calendarNext").disabled = false;
    calendarShow--;
    if(calendarShow >= 1){
        for(let i=0; i<allTable.length; i++){
            allTable[i].style.display = "none";
        }
        document.getElementById("calendarTable"+calendarShow).style.display = "block";
    }
    if(calendarShow == 1){
        document.getElementById("calendarPrev").disabled = true;
    }
}

function callNext(){
    let allTable = document.getElementsByClassName('calendarDiv');
    document.getElementById("calendarPrev").disabled = false;
    calendarShow++;
    // check the length of table and show then in block 
    if(calendarShow <= allTable.length){
        for(let i=0; i<allTable.length; i++){
            allTable[i].style.display = "none";
        }
        document.getElementById("calendarTable"+calendarShow).style.display = "block";
    }
    if(calendarShow == allTable.length){
        // when it reaches to last month then next button disable
        document.getElementById("calendarNext").disabled = true;
    }
    
}
//    starting date and ending date 
let content = getDatesBetween("2022/01/01", "2025/01/01");
document.getElementById("Calendar").innerHTML = content;



