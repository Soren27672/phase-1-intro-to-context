// Your code here

function createEmployeeRecord(emp) {
    return {
        firstName: emp[0],
        familyName: emp[1],
        title: emp[2],
        payPerHour: emp[3],
        timeInEvents: [],
        timeInLegend: {},
        timeOutEvents: [],
        timeOutLegend: {}
    }
}

function createEmployeeRecords(emps) {
    return emps.map(createEmployeeRecord);
}

function createTimeInEvent(emp,timestamp) {
    if (timestamp[4] === '-' && timestamp[7] === '-' && timestamp[10] === ' ' && (timestamp.length === 15)) {
        emp.timeInLegend[timestamp.slice(0,10)] = emp.timeInEvents.length;
        emp.timeInEvents.push({
            type: 'TimeIn',
            date: timestamp.slice(0,10),
            hour: parseInt(timestamp.slice(11)),
        });
        return emp;
    }
    else return false;
}

function createTimeOutEvent(emp,timestamp) {
    if (timestamp[4] === '-' && timestamp[7] === '-' && timestamp[10] === ' ' && (timestamp.length === 15)) {
        emp.timeOutLegend[timestamp.slice(0,10)] = emp.timeOutEvents.length;
        emp.timeOutEvents.push({
            type: 'TimeOut',
            date: timestamp.slice(0,10),
            hour: parseInt(timestamp.slice(11)),
        });
        return emp;
    }
    else return false;
}

function hoursWorkedOnDate(emp,date) {
    const rawDiff = ((emp.timeOutEvents[emp.timeOutLegend[date]]).hour - (emp.timeInEvents[emp.timeInLegend[date]]).hour);
    return rawDiff / 100 + (parseInt(rawDiff.toString().slice(-2)) / 60);
}

function wagesEarnedOnDate(emp,date) {
    return emp.payPerHour * hoursWorkedOnDate(emp,date);
}

function allWagesFor(emp) {
    sa(emp);
    sa(emp.timeInEvents);
    return emp.timeInEvents.reduce((ac,cv) => {
        console.log(cv,cv.date);
        if(typeof emp.timeOutLegend[cv.date] === "number") return ac += wagesEarnedOnDate(emp,cv.date);
    },0);
};

function calculatePayroll(empArr) {
    return empArr.reduce((ac,cv) => ac+=allWagesFor(cv),0);
}

/*
Fn takes an employee record and a date and returns the number of hours worked on the date

reference emp outevent by emp.timeOutEvents[timeOutLegend[date]] (+.hour)
return employee's outevent object.hour of date minus the employee's inevent object.hour of date

Need way to reference the event object tied to the date
Make object that has each date as the key and the index they're tied to as the value

Fn takes a difference in time and returns the number of hours between them, minutes represented as a fraction of an hour

Remove first digit from difference x
divide that by 60 x
add that on to the difference x

How to remove the first digit from difference x
convert to string and slice from index 1 onward
actually, wont work with differennces in the thousands
slice from -2 x

fn takes an employee record and a date, then returns the wages earned

returns employeeRec.wage * hoursWorked(empRec,date)

fn takes employeeRec, returns sum of wages for all days worked

Needs to check if employee has both in and out for day
while looping thru timeIns, check if timeoutlegend is not undefined for that date, if it's not undefined, inc it in reduce

for each event in timeInEvs, check if emp.timeoutLeg[event.date] isn't undefined
if it isn't, run wagesEarned for event.date
accumulate that return

Needs to take an array of emp, then return how much all of them made for all dates THEYVE worked

empArr.reduce(return ac+=allWagesFor(cv))
*/



const john = createEmployeeRecord(['john','joyce','engineer',20,]);

createTimeInEvent(john,'2020-01-25 1200');
createTimeOutEvent(john,'2020-01-25 2300')

createTimeInEvent(john,'2020-01-26 1100');
createTimeOutEvent(john,'2020-01-26 2300')

hoursWorkedOnDate(john,'2020-01-25')

function sa(...message) {
    message.forEach(cv => console.log(cv));
}