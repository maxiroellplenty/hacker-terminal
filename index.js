var user = {
  username: "Warmachine68",
  password: "WARMACHINEROX"
};
var errorMessage = "TermGear$: command not found: ";
var machineName = "ATCU MAINFRAME";
var terminal = document.getElementsByClassName("terminal")[0];
var terminalHeader = document.getElementsByClassName("terminal-header")[0];
var matrixRainInterval;
initTerminal();

function initTerminal() {
  addMessage(terminal, "Password: ");
  addMessage(terminal, "************", true);
}

function addInputEventListener() {
  var input = document.getElementsByTagName("INPUT")[0];
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      if(input.value === '')
      {
        replaceInput(input, terminal);
        addInput(terminal);
        return;
      }
      replaceInput(input, terminal);
      executeCommand(input.value);
      addInput(terminal);
    }
  });
}

function executeCommand(inputValue) {
  inputValue = inputValue.toLowerCase();
  switch (inputValue) {
    case "exit":
      destroyTerminal(terminal);
      break;
    case "clear":
      clearTerminal(terminal);
      break;
    case "engage":
        engage();
        break;
    case "sshcrack":
        sshCrack();
        break;
    case "connect":
        connect();
        break;
    default:
      addErrorMessage(inputValue);
      break;
  }
}

function connect()
{
  
}

function sshCrack()
{
  addMessage(terminal,'Starting SSHCrack');
}

function engage()
{
    drawMatrixRain();   
    
}

function addMessage(terminal, message, simulated) {
  var messageContainer = document.createElement("div");
  if (simulated === true) {
    terminal.appendChild(messageContainer);
    simulatedTyping(message, messageContainer,addMessage);
  } else {
    messageContainer.innerHTML = message;
    terminal.appendChild(messageContainer);
  }
}
function simulatedTyping(string, element, callback) {
  (function writer(i) {
    if (string.length <= i++) {
      element.innerHTML = string;
      return;
    }
    element.innerHTML = string.substring(0, i);
    if (element.innerHTML[element.innerHTML.length - 1] != " ") element.focus();
    var rand = Math.floor(Math.random() * 100) + 140;
    setTimeout(function() {
      writer(i);
    }, rand);
    if(i === string.length)
    {
      callback(terminal,`Logged in as ${user.username}`);
      addInput(terminal);
    }
  })(0);
}

function addErrorMessage(command) {
  var errorMessageContainer = document.createElement("div");
  errorMessageContainer.innerHTML = errorMessage + command;
  errorMessageContainer.classList.add("error");
  terminal.appendChild(errorMessageContainer);
}

function addInput(terminal, type) {
  type = type || "text";
  commandInput = document.createElement("div");
  commandInput.innerHTML = machineName + `$ <input type='${type}' autofocus>`;
  terminal.appendChild(commandInput);
  addInputEventListener();
}

function replaceInput(input, terminal) {
  var inputValue = input.value;
  var executedCommand = document.createElement("div");
  terminal.lastElementChild.remove();
  executedCommand.innerHTML = machineName + "$ " + inputValue;
  terminal.appendChild(executedCommand);
}

function destroyTerminal(terminal) {
  terminal.remove();
  terminalHeader.remove();
}
function clearTerminal(terminal) {
  terminal.innerHTML = "";
}
//drawing the characters
function drawMatrixRain()
{
  var container = document.createElement('canvas');
  container.classList.add('matrix-effect');
  terminal.appendChild(container);
  var c = document.getElementsByClassName("matrix-effect")[0];
  var ctx = c.getContext("2d");
  //making the canvas full screen
  c.height = 300;
  c.width = terminal.clientWidth;
  //chinese characters - taken from the unicode charset
  var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
  //converting the string into an array of single characters
  chinese = chinese.split("");
  var font_size = 14;
  var columns = c.width / font_size; //number of columns for the rain
  //an array of drops - one per column
  var drops = [];
  //x below is the x coordinate
  //1 = y co-ordinate of the drop(same for every drop initially)
  for (var x = 0; x < columns; x++)
    drops[x] = 1;
  

	//Black BG for the canvas
  //translucent BG to show trail
    matrixRainInterval = setInterval(function(){ 
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);
    
    ctx.fillStyle = "#FF0000"; //green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for(var i = 0; i < drops.length; i++)
    {
      //a random chinese character to print
      var text = chinese[Math.floor(Math.random()*chinese.length)];
      //x = i*font_size, y = value of drops[i]*font_size
      ctx.fillText(text, i*font_size, drops[i]*font_size);
      
      //sending the drop back to the top randomly after it has crossed the screen
      //adding a randomness to the reset to make the drops scattered on the Y axis
      if(drops[i]*font_size > c.height && Math.random() > 0.975)
        drops[i] = 0;
      
      //incrementing Y coordinate
      drops[i]++;
    }
  }, 33);
}



