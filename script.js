function reverseStr(str) {
  const reversedStr = str.split("").reverse().join("");
  return reversedStr;
}

function isPalindrome(str) {
  const reverse = reverseStr(str);
  return str === reverse;
}

//helper function
function convertDateToString(date) {
  //object with empty values
  const dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString(); //toString method, a string representing the object
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormats(date) {
  const ddmmyyyy = date.day + date.month + date.year;
  const mmddyyyy = date.month + date.day + date.year;
  const yyyymmdd = date.year + date.month + date.day;
  const ddmmyy = date.day + date.month + date.year.slice(-2);
  const mmddyy = date.month + date.day + date.year.slice(-2);
  const yymmdd = date.year.slice(-2) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var dateFormatList = getAllDateFormats(date);
  var palindromeList = [];
  for (i = 0; i < dateFormatList.length; i++) {
    var result = isPalindrome(dateFormatList[i]);
    palindromeList.push(result);
  }
  return palindromeList;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    // check for leap year
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPrevDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var dateStr = convertDateToString(nextDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function getPrevPalindrome(date) {
  var previousDate = getPrevDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateStr = convertDateToString(previousDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, previousDate];
      }
    }
    previousDate = getPrevDate(previousDate);
  }
}

const dateInput = document.querySelector("#bday-input");
const output = document.querySelector("#result");

document.addEventListener("submit", clickHandler);

function clickHandler(e) {
  e.preventDefault();
  var bdayStr = dateInput.value;
  if (bdayStr !== "") {
    var date = bdayStr.split("-");
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy),
    };

    var dateStr = convertDateToString(date);
    var list = checkPalindromeForAllDateFormats(dateStr);
    var isPalindrome = false;

    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        isPalindrome = true;
        break;
      }
    }
    if (!isPalindrome) {
      const [ctr1, nextDate] = getNextPalindromeDate(date);
      const [ctr2, prevDate] = getPrevPalindrome(date);
      if (ctr1 > ctr2) {
        output.innerText = `Oops! It isn't. The nearest Palindrome date is ${
          prevDate.day
        }-${prevDate.month}-${prevDate.year}, you missed it by ${ctr2} ${
          ctr2 > 1 ? `days.` : `day.`
        }`;
      } else {
        output.innerText = `Oops! It isn't. The nearest Palindrome date is ${
          nextDate.day
        }-${nextDate.month}-${nextDate.year}, you missed it by ${ctr1} ${
          ctr1 > 1 ? `days.` : `day.`
        }`;
      }
    } else {
      output.innerText = "Aree Waaah! Your birthdate is a palindrome !";
    }
  }
}
