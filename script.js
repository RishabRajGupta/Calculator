let keys = document.querySelectorAll(".keys");
let ops = document.querySelectorAll(".op");
let equal = document.querySelector("#equal");
let screen = document.querySelector("#screen");
let clear = document.querySelector("#C");
let del = document.querySelector("#back");

let a = "";
let b = "";
let operation = "";
let flip = false;

function compute(x, y, op) {
  switch (op) {
    case "+": return x + y;
    case "-": return x - y;
    case "*": return x * y;
    case "/": return x / y;
    default:  return y;
  }
}

keys.forEach(key => {
  key.addEventListener('click', () => {
    if (!flip) {
      a += key.textContent;
      screen.textContent = a;
    } else {
      b += key.textContent;
      screen.textContent = b;
    }
  });
});

ops.forEach(btn => {
  btn.addEventListener('click', () => {
    const op = btn.textContent.trim();

    if (a === "") return;

    if (!flip) {
      operation = op;
      flip = true;
      screen.textContent = op;
      return;
    }

    if (b === "") { 
      operation = op;
      screen.textContent = op;
      return;
    }

    const result = compute(parseFloat(a), parseFloat(b), operation);
    screen.textContent = result;
    a = String(result);
    b = "";
    operation = op;
  });
});

equal.addEventListener('click', () => {
  if (operation === "" || b === "") return;

  const result = compute(parseFloat(a), parseFloat(b), operation);
  screen.textContent = result;
  a = String(result);
  b = "";
  operation = "";
  flip = false;
});

del.addEventListener('click', () => {
    if (!flip) {
        a = a.slice(0, -1);
        screen.textContent = a || "0";
    } else {
        b = b.slice(0, -1);
        screen.textContent = b || "0";
    }
});

clear.addEventListener('click', () => {
    a = "";
    b = "";
    operation = "";
    flip = false;
    screen.textContent = "0";
});

