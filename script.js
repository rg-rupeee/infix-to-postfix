console.log('hello rrruuuuupeeee.........');

var UIController = (function(){
    return {
       displayResult: function(ip, op){
          document.querySelector('.infix').innerHTML = ip;
          document.querySelector('.postfix').innerHTML = op;
       }
    }
})();


var Stack = (function(){

  var top = -1;
  var stack = [];

  return {
    push : function(ch){
      top++;
      stack[top] = ch;
      // console.log('pushed '+ch+' to stack');
    },
    pop : function(){
      if(top>=0)
      {
        var item;
        item = stack[top];
        top--;
        // console.log('poped '+item+' from stack');
        return item;
      }
      else
      {
        // console.log('stack is empty');
      }
    },
    peek : function(){
      if(top >= 0)
      {
        var item;
        item = stack[top];
        return item;
      }
    }
  }  
})();

var logicController = (function(stack){

  var precedence = function(ch){
    switch(ch)
    {
    case '^': return 5;
        break;
    case '/': return 4;
        break;
    case '*':  return 4;
        break;
    case '-': return 3;
        break;
    case '+': return 3;
        break;
    default: return 2;
        break;
    }
  };

  var convert = function(input){
    var infix, len, index, pind, current, temp;
    var postfix = [];

    infix = Array.from(input);
    console.log(infix);

    len = infix.length;
    stack.push("(");
    infix[len] = ")";
    len++;

    index = 0;
    pind = -1;
    while(index<len)
    {
      current = infix[index];
      // console.log("currently scanned :"+ current);
      switch(current)
      {
        case '(':
          stack.push(current);
          break;
        
        case ')':
          temp = stack.pop();
          while(temp != '(')
          {
            pind++;
            postfix[pind] = temp;
            temp = stack.pop();
          }
          break;

        case '+':
        case '-':
        case '*':
        case '/':
        case '^':
          while(precedence(stack.peek()) >= precedence(current))
          {
            temp = stack.pop();
            // console.log("comparing with " + temp);
            pind++;
            postfix[pind] = temp;
            // console.log("pushed "+ temp + "to the postfix array");
          }
          stack.push(current);
          break;
        
        default:
          pind++;
          postfix[pind] = current;
          // console.log("pushed "+ current + "to postfix array")
          break;
      }
      index++;
    }

    var resStr = postfix.join('');
    console.log(" ");
    console.log(resStr);

    return resStr;
  };

  return{
    infix_to_postfix : function(inp){
      var op;
      op = convert(inp);
      return op;
    }
  }
})(Stack);

var globalController = (function(uiCtrl, logicCtrl){

  var inputValue, finalValue;

  document.querySelector('.btn').addEventListener('click', function(){
    console.log("button was clicked");
    inputValue = document.querySelector('.inputfeild').value;

    if(inputValue !== "")
    {
      finalValue = logicController.infix_to_postfix(inputValue);
      UIController.displayResult(inputValue, finalValue);
    }

  });

})(UIController,logicController);

