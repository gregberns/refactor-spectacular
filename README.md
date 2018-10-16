# Refactor Spectacular

Small code snippets to practice refactoring.

## Why?

Why would you want to practice refactoring?

* The better your refactoring skills, the better you'll write your code in the first place
* Refactoring poorly structured code can reveal previously unseen bugs
* Improves your code reading skills
* Refactoring a poorly constructed piece of code can helps build a solid mental modelof what it is doing (even if you don't use the refactored code in production)

## Refactoring Patterns

Below are several patterns to attempt to use when refactoring. These patterns are used in the examples within this repository.

### Declaritive syntax

Though very simplistic, its possible you've seen a method similar to the following. This is a common style and could be referred to as procedural or imperative code. It has several traits:

* The order of statements is generally quite important
* To understand the code you have to read from top to bottom, and understand each line

```javascript
var obj = { a: 'a' }
var b = 'b'
obj.b = b 
var c = 'c'
obj.c = c

var returnValue = JSON.stringify(obj)

return returnValue
```

Though there may not be anything 'wrong' with this code, there are several attributes that make this more difficult to read than neccesary.

One technique to use it to 'declare' what needs to be returned. Notice how the following requires no ordering and has fewer (no) variable declarations.

```
return JSON.stringify({
  a: 'a',
  b: 'b',
  c: 'c'
})
```

Many times devs use the first style because they want to step through statements with the debugger. Consider putting this method under unit tests and just test the input/output instead.

### Arrange, Act, Assert pattern

Most devs these days are familiar with the 'Arrange, Act, Assert' pattern from unit testing. Using this pattern in our production code can help make code more readable and easier to debug with the 'debugger step-through' method.

```
function (message, callback) {
  var parsedMessage =  JSON.parse(message)
  var requestUrl = environment['baseUrl'] + parsedMessage.type + '/' + parsedMessage.messageId
  var response = http.post(requestUrl, parsedMessage.body, environment['encoding'])
  if (response.status_code == 200){
    callback(null, response.body)
  } else {
    callback(response.error_message)
  }
}
```

Compare to the following, using the 'Arrange, Act, Assert' pattern.

* 'Arrange' is used to declare your variable set or 'define your operating parameters'
* 'Act' is how you combine the variables and execute a procedure
* 'Assert' is where we check the result and return a value

```
function (message, callback) {
  //**Arrange: Declare all the values you'll need
  //Get values from the environment you'll need
  var baseUrl = environment['baseUrl']
  var encoding = environment['encoding']

  //Process the incoming values
  var parsedMessage =  JSON.parse(message)
  var messageId = parsedMessage.id
  var messageType = parsedMessage.type
  var mesageBody = parsedMessage.body
  var requestUrl = `${baseUrl}${messageType}/${messageId}`

  //**Act: Do the thing
  var response = http.post(requestUrl, messageBody, encoding)
  
  //**Assert(Return): Create Respose
  if (response.status_code == 200){
    callback(null, response.body)
  } else {
    callback(response.error_message)
  }
}
```

Things to think about:

* What are the characteristics of the first and second code snippets?
* If we need to add validation checks (on env vars or message properties) is one easier to check than the other?
* Can we break each method into separate pieces?
* Can we separate the generation of the request and its execution?
