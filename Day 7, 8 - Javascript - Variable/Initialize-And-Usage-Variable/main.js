let i = 10;
let f = 20.5;
let s = "Hà Nội";
let b = true;

document.write('i = ' + i);
document.write('<br/>');
document.write('f = ' + f);
document.write('<br/>');
document.write('b = ' + b);
document.write('<br/>');
document.write('s = ' + s);

document.write("<hr>");

let rectHeight = 20;
let rectWidth = 30;
let rectArea = rectHeight * rectWidth;
document.write("Rectangle area: " + rectArea);

document.write("<hr>");

let num1 = prompt("Nhập a: ");
let num2 = prompt("Nhập b: ");

// let result = num1%num2==0 ? "a là bội số của b" : "a không phải là bội số của b";
alert(num1%num2==0 ? `${num1} là bội số của ${num2}` : `${num1} không phải là bội số của ${num2}`);