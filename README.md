## Devops Workshop Hands-on lab


## Before you begin

To complete this workshop you will need:
- To download and install [Node.js](https://nodejs.org/en/) on your local machine.
- To have an account with a Cloud Foundry provider.
- To have a [GitHub](https://github.com) account and install git.

**Installing Node.js**

1. Go to the [Node.js website](https://nodejs.org/en/) and download the installer for your OS (LTS version is recommended).
2. Open the installer and complete the instructions.
3. Check your installation works by opening up a terminal and typing `node -v`. It should print your version of node e.g. `v8.11.3`.

**Registering with a Cloud Foundry provider**

There are many [certified Cloud Foundry providers](https://www.cloudfoundry.org/certified-platforms/). For these labs, however, it will be easiest if you have an IBM Cloud account:
1. [Sign up for an account here](https://ibm.biz/BdZEbj).
2. Verify your account via the email it sends you.
3. Log in to your IBM Cloud account.

**Getting a Github account and installing git**

GitHub is a source code management tool using the open source [Git](https://git-scm.com/) version control system. There are plenty of choices but GitHub is free (for public repos) and is very popular so it makes a good choice for our workshop.

1. Go to the [GitHub](https://github.com/) site and sign up.
2. Download the appropriate version of git for your OS [from here](https://git-scm.com/downloads).
3. Install git.
4. Check your git installation worked by opening a terminal and typing `git`. You should see a list of available git commands.

## Setting up your repository

We're going to use our code repository as the *start* of our deployment pipeline.

1. Go to GitHub.
2. Click "New repository".
3. Give your repository a name, make sure it is public and then click "create".
4. Copy the git url of your repo. It should look something like this: `https://github.com/username/reponame.git`.

Now we need to set up a folder locally that we can write our app in:
1. `git clone YOUR_REPO_URL`
2. `cd YOUR_REPO_NAME`

Any changes to this folder will be tracked by git and can be committed to the central repository as and when we want.

## Prerequisites

-	In order to follow along with this tutorial, you should have a Node.js server environment and npm installed on your computer. [Learn about Node.js and npm](https://docs.npmjs.com/getting-started/installing-node) and how to install them on Mac/Windows.
-	You will need to have a working knowledge of JavaScript syntax and code structure, data types, mathematical operations and conditional statements.

## Goals
-	The application should add, subtract, divide, and multiply any two numbers.
-	The application should display a warning and exit if it receives any input that does not consist of numbers.
-	The system will provide a command line interface that allows the end users to utilize program functionality.

Now that we know what app should we do, we can begin setting up the environment for testing and developing.

## Setting Up our Environment

Since our application runs in Node.js, we will need to set up a local environment for our files and dependencies.
Create a new directory called calc. In the command prompt, navigate to the directory and initialize a new project using npm init, which will create a new package.json file for our program.
```javascript
npm init 
```

You will be prompted to enter the package name, version, description, and other common package details. 
- We can enter the name calc.js, and continue along pressing ENTER for all the default items, giving a description if you’d like. 
- When you reach test command, type mocha, which is the testing framework we will be using.
``` javascript
Test command: mocha
```
- Continue entering the defaults until the walkthrough is complete. The script will create a package.json file that looks like this:
**package.js**

``` 
javascript
{
  "name": "package",
  "version": "1.0.0",
  "description": "A simple calculator application built with Node.js",
  "main": "index.js",
  "scripts": {
    "start": "node calc.js",
    "test": "mocha"
  },
  "author": "",
  "license": "ISC"
  }
}
```
Our final step for setting up the environment is to install Mocha, the JavaScript testing framework we will be using for our app. 
**Input the following commands to install all the dependencies**:
```
Npm install mocha –-save-dev
```
```
Npm install mocha-jenkins-reporter@0.3.12 –-save-dev
```
```
Npm install rewire@4.0.1  --save-dev
```
```
Npm install chai@4.1.2 --save-dev
```
```
Npm install gulp@4.0.0 --save-dev
```
```
Npm install gulp-mocha@6.0.0 --save-dev
```
```
Npm install growl@1.10.5  --save-dev
```
```
Npm install debug@2.6.9 --save-dev
```
```
Npm install mocha-junit-reporter --save-dev
```
```
Mocha test --reporter mocha-junit-reporter
```
```
Npm install gulp-install@1.1.0 --save-dev
```
```
Mocha -R xunit
```	
Running the previous commands will add a node_modules directory, a package-lock.json file, and the following code to your original package.json:
**package.json**
```javascript
"devDependencies": {
    "mocha": "^5.2.0",
    "mocha-junit-reporter": "^1.18.0"
  },
  "dependencies": {
    "chai": "^4.1.2",
    "gulp": "^3.9.1",
    "gulp-mocha": "^6.0.0",
    "mocha-jenkins-reporter": "^0.3.12",
    "rewire": "^4.0.1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/samerfouad/calculator.git"
  },
  "engines": {
  "node": "8.11.3",
  "npm": "5.6.0"
  }
```

We have our Node project, with the testing script and dependency loaded in. Let’s make sure our testing framework is working properly.
Create a Test directory and add a test.js file in this new directory. We will use the built-in Node.js [assert module]( https://nodejs.org/api/assert.html) to test if true is equal to true. Since it is, the test should pass.
**test.js**
```javascript
const assert = require('assert');
it('should return true', () => {
  assert.equal(true, true);
});	
```
- Now in the command prompt, run the test.
```
Npm test
> mocha

✓ should return true

  1 passing (8ms)
```

The test is passing as expected, so our testing environment setup is complete. Remove everything except the first line from test.js.
**test.js**
```javascript
const assert = require('assert');
```
test.js is the file we will use for testing throughout the creation of our app. 
- Let’s create one additional file: operations.js for our arithmetic and validation functions, and our existing calc.js file is for our app itself.
**We want to keep our files separate so they don’t get too long and complex.**

**Below is our list of files and folders.**

1.	calc.js
2.  node_modules
3.  operations.js
4.  package-lock.json
5.  package.json
6.  test/test.js

From here, we will begin adding our first actual test for the application.

## Adding Mathematical Operations

The first requirement for our application is that it should `add`, `subtract`, and `multiply` any two numbers. This means we’ll have to create a function for each of those mathematical operations.
Let’s start with `addition`.

We will write a test to calculate the sum of two numbers that we know will be true. 
- The below code is testing if 1 plus 3 equals 4 in the `add()`function.
**test.js**
```javascript
const assert = require('assert');

it('correctly calculates the sum of 1 and 3', () => {
  assert.equal(add(1, 3), 4);
});
```

*After* running our test with `npm test`, we will get the following output:
```
> mocha

  0 passing (9ms)
  1 failing

  1) correctly calculates the sum of 1 and 3:
     ReferenceError: add is not defined
     at Context.it (test.js:5:16)
npm ERR! Test failed.  See above for more details.
```

The test has failed, giving us the following information: **ReferenceError: add is not defined**. We’re testing the `add()` function which does not exist yet, so this error makes perfect sense.
In operations.js, we’re going to create the `add()` function.

In **operations.js**, we’re going to create the `add()` function.

**operations.js**
```javascript
const add = (x, y) => (+x) + (+y);
```

The `add()` function takes two arguments (`x` and `y`) and returns their sum. You may notice that it is written as `(+x) + (+y)` instead of `x + y`. We are using the [unary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_plus) to coerce the parameters into numbers in case the input is a string.
**Note: This function is using ES6 arrow functions and implicit returns. Read more about [the different ways to write a function in JavaScript](https://www.digitalocean.com/community/tutorials/how-to-define-functions-in-javascript) for increased clarity.**
Since we’re using Node.js and breaking our code into multiple files, we’ll need to use **module.exports** to export the code.

**operations.js**
```javascript
const add = (x, y) => (+x) + (+y);

module.exports = { add }
```

At the top of test.js, we will import our **operations.js** code with require(). Since we’re pulling in the function through the operations variable, we’ll change `add()` to `operations.add()`. 
The `assert` module provides a simple set of assertion tests that can be used to test invariants.

**test.js**
```javascript
const operations = require('./operations.js');
const assert = require('assert');

it('correctly calculates the sum of 1 and 3', () => {
  assert.equal(operations.add(1, 3), 4);
});
```

Run the test.
```
npm test
```
```
> mocha



  ✓ correctly calculates the sum of 1 and 3

  1 passing (8ms)
```

Now we have a working function, and our test passes as expected. Since the other arithmetic functions all follow the same pattern, we can make tests for `subtract()`, and `multiply()`, as well as one to test negative integers.


**test.js**

```javascript

it('correctly calculates the sum of 1 and 3', () => {
  assert.equal(operations.add(1, 3), 4);
});

it('correctly calculates the sum of -1 and -1', () => {
  assert.equal(operations.add(-1, -1), -2);
});

it('correctly calculates the difference of 33 and 3', () => {
  assert.equal(operations.subtract(33, 3), 30);
});

it('correctly calculates the product of 12 and 12', () => {
  assert.equal(operations.multiply(12, 12), 144);
});
```

We will **create** and **export** all our functions in **test.js**.

**test.js**

```javascript
const add = (x, y) => (+x) + (+y);
const subtract = (x, y) => (+x) - (+y);
const multiply = (x, y) => (+x) * (+y);

module.exports = {
  add,
  subtract,
  multiply
}
```
…and run our new tests.
```
npm test
```
```
> mocha
  ✓ correctly calculates the sum of 1 and 3
  ✓ correctly calculates the sum of -1 and -1
  ✓ correctly calculates the difference of 33 and 3
  ✓ correctly calculates the product of 12 and 12

  4 passing (8ms)

```
All of our tests are **passing**, so now we can be sure that the main objectives of our application will function properly. Moving forward, we will add some **extra validation**.

## Adding Validation

Right now, if the user enters any number and selects an operation, everything works as expected. 
- However, what would happen if they tried to find the `sum of a number and a string` The application would attempt to do the calculation, but as it’s expecting numbers, the output would be `NaN`, or `Not a Number`.
- Instead of just returning strange output, we want to fill the `second goal` of our application – that it should display a warning and exit if it receives any input that is not a number.
First, we’ll have to create a function that tests whether the input is a number or not. 
The application will take two numbers, so we’ll test three things: if `both inputs are a number`, if `only one` is a number, and if `neither one` is a number.

**test.js**
```javascript
it('indicates failure when a string is used instead of a number', () => {
  assert.equal(operations.validateNumbers('sammy', 5), false);
});

it('indicates failure when two strings is used instead of numbers', () => {
  assert.equal(operations.validateNumbers('sammy', 'sammy'), false);
});

it('successfully runs when two numbers are used', () => {
  assert.equal(operations.validateNumbers(5, 5), true);
});
```

Our `validateNumbers()` function will test both parameters. The `isNaN()` function will check if the parameters are not numbers, and will return false if so. 
- Otherwise it will return `true`, and the **validation will be successful**.

**operations.js**

```javascript
const validateNumbers = (x, y) => {
  if (isNaN(x) && isNaN(y)) {
    return false;
  }
  return true;
}
```

Make sure to add 'validateNumbers' to the 'module.exports' at the **bottom** of the file. Now we can run our new tests.

```
npm test
```
```
 1) indicates failure when a string is used instead of a number
  ✓ indicates failure when two strings is used instead of numbers
  ✓ successfully runs when two numbers are used

  7 passing (12ms)
  1 failing


  1) indicates failure when a string is used instead of a number:

      AssertionError [ERR_ASSERTION]: true == false
      + expected - actual

      -true
      +false
```

`Two` of them passed, but `one` failed. Testing for success on two numbers passed, as well as testing for failure on two strings. 
- Our first validation test, one string and one number, failed.
Looking back at our function, it requires that both parameters must be `NaN` to fail. 
- We want it to **fail** even if only one parameter is `NaN`, so we will change `&&` to `||`.

**operations.js**
```javascript
const validateNumbers = (x, y) => {
  if (isNaN(x) || isNaN(y)) {
    return false;
  }
  return true;
}
```
Once we make this change and run `npm test`, all **eight tests** will **pass**.
 ```
   ✓ indicates failure when a string is used instead of a number
  ✓ indicates failure when two strings is used instead of numbers
  ✓ successfully runs when two numbers are used

  8 passing (9ms)
```
All of the functionality of our application has been tested. 
- The functions have been proven to successfully do mathematical operations and validate input. 
- The **final step** is creating the interface for the user.
Currently, our `calc.js` file is **empty**. This is where our application is going to live. 


**To begin, we will `pull` in the functions from operations.js.**

**calc.js**
```javascript
const operations = require('./operations.js');
```
Our interface itself will use the [Readline module](https://nodejs.org/api/readline.html), a built-in Node.js CLI.

**calc.js**
```javascript
const readline = require('readline');
```
Now that we’re pulling in all our requirements, we can begin building the app.
- We will access readline through the **rl** variable to create the interface.

**calc.js**
```javascript
// Use readline to create command line interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
```
The first thing we’ll want the user to see when they run the program is the initial welcome screen, which tells them what they’ve opened, and the instructions for usage. 
- We will do this with a `console.log()`.
**calc.js**
```javascript
console.log(`
Calc.js

Welcome to the Node.js Calculator app! 
Version: 1.0.0.

Usage: The user will be prompted for two numbers, 
then asked to select their operation of choice.
`);
```

Before we get started with the actual functionality of the calculator, let’s test of our `console.log()` is working properly. 
- We’ll make our app print out the message, then **exit**. readline will use the `rl.close()` method to exit.

**calc.js**
```javascript
rl.close();
```

To run a command line application with node, you will type `node` followed by the `filename`.

```
node calc.js
```
```
Calc.js


Welcome to the Node.js Calculator app! 
Version: 1.0.0.
```

**Usage:** The user will be prompted for two numbers, 
then asked to select their operation of choice.

Our welcome screen displays, then the program terminates. 
- The next step will be to take some user input.
- We’re going to require three in total: two numbers, and a choice of operation. 
- We will request each input with the `rl.question()` method.


**calc.js**
```javascript
rl.question('Enter the first number: ', (x) => {
  rl.question('Enter the second number: ', (y) => {
    rl.question(`
Please select from the following options:

[1] Addition (+)
[2] Subtraction (-)
[3] Multiplication (*)

Enter your choice: `, (choice) => {
      // additional code to be added here
      rl.close();
    });
  });
});
```
Our first number will be entered with the parameter of `x`, the second number with `y`, and the operation selection with choice. 
- At this point, running the program will request the desired input, but won’t do anything with it.

After our third question, the first thing we’ll want to do is validate the input to ensure only numbers are being entered. 
- We’re going to reference the `validateNumbers()` function. 
- Using the logical [`NOT` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_NOT), we will test if the parameter values are not numbers, and end the program if so.


**calc.js**
```javascript
if (!operations.validateNumbers(x, y)) {
  console.log('Only numbers are allowed! Please restart the program.');
}
```
If all input is valid and correct, we will want to move forward with the process and run the respective mathematical operations that we created earlier. 
- We will use a [switch statement](https://www.digitalocean.com/community/tutorials/how-to-use-the-switch-statement-in-javascript) to execute code based on the three possible choices, and output the result of the operation. 
- If an invalid choice is made, the default code block will run, telling the user to start over.

**calc.js**
```javascript
if (!operations.validateNumbers(x, y)) {
  console.log('Only numbers are allowed! Please restart the program.');
} else {
  switch (choice) {
    case '1':
      console.log(`The sum of ${x} and ${y} is ${operations.add(x, y)}.`);
      break;
    case '2':
      console.log(`The difference of ${x} and ${y} is ${operations.subtract(x, y)}.`);
      break;
    case '3':
      console.log(`The product of ${x} and ${y} is ${operations.multiply(x, y)}.`);
      break;
    default:
      console.log('Please restart the program and select a number between 1 and 4.');
      break;
  }
}
```
**Note**: The `console.log()` functions are utilizing template literals, a type of string that allows expressions and variables to be embedded in the string. 
- For **more information**, learn [how to work with strings in JavaScript](https://www.digitalocean.com/community/tutorials/how-to-work-with-strings-in-javascript).

Here’s the final code.
**calc.js**
```javascript

/**
 * A simple Node.js calculator app that uses
 * the built-in Readline command line interface.
 */

const operations = require('./operations.js');
const readline = require('readline');

// Use readline to create command line interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`
Calc.js
Welcome to the Node.js Calculator app! 
Version: 1.0.0.
Usage: The user will be prompted for two numbers, 
then asked to select their operation of choice.
`);

rl.question('Enter the first number: ', (x) => {
  rl.question('Enter the second number: ', (y) => {
    rl.question(`
Please select from the following options:
[1] Addition (+)
[2] Subtraction (-)
[3] Multiplication (*)
Enter your choice: `, (choice) => {
      if (!operations.validateNumbers(x, y)) {
        console.log('Only numbers are allowed! Please restart the program.');
      } else {
        switch (choice) {
          case '1':
            console.log(`The sum of ${x} and ${y} is ${operations.add(x, y)}.`);
            break;
          case '2':
            console.log(`The difference of ${x} and ${y} is ${operations.subtract(x, y)}.`);
            break;
          case '3':
            console.log(`The product of ${x} and ${y} is ${operations.multiply(x, y)}.`);
            break;
          default:
            console.log('Please restart the program and select a number between 1 and 4.');
            break;
        }
      }
      rl.close();
    });
  });
});
```

Our application is now complete. Let’s test the final output. 
- We will input 999 and 1 and request a subtraction operation.
```
node calc.js
Enter the first number: 999
Enter the second number: 1
Enter your choice: 2

```
```
The difference of 999 and 1 is 998.
```
Everything went through successfully and our output was as expected. 
**Congratulations!** You have successfully created a simple calculator application with Node.js, and learned the basics of the test-driven development methodology along the way.

## Committing your code and/or changes

Now that we have a basic application we can commit these changes to our source code repository. 
- From your application directory run the following commands in your **terminal**:
1. `git add -A`
2. `git commit -m "First commit"`
3. `git push`

*Note: we have included the node_modules folder in this commit which is actually a bad practice. 
 - We would normally make use of a* `.gitignore` *file.*
 
 If you go back to GitHub and view your repository you can see the files you just added.
 
 ## Creating a DevOps toolchain
 
 Now that we have our code repository set up we need a way to deploy the code from that repository to the cloud. 
  - Previously we were able to run the `cf push` command from our machine to send code directly to the cloud but we can't do that from a repository such as GitHub.
  
We will now **create** and **configure** a toolchain to do this automatically for us:
1. If you aren't already logged in, [log in](https://console.bluemix.net/) to IBM Cloud.
2. Go to the [Toolchains](https://console.bluemix.net/devops/toolchains) section and click `Create a Toolchain`.
3. Under templates, click `Garage Method tutorial with Cloud Foundry`.
4. Change the toolchain name if you want to and click `Create`.

A toolchain is a set of tool integrations that helps automate several **"DevOps"** processes for your application.

**Adding tools to your toolchain**

Once your toolchain has created:
1. Click `Add a Tool`.
2. Select `GitHub`.

You will probably be presented with an `Authorize` button if this is your first time creating a Github integration.
3. Click `Authorize` and follow the instructions on GitHub.
4. Once you are authorized, select `existing` in the Repository Type dropdown.
5. Select your new repository in the Repository URL dropdown and tick `Track deployment of code changes`.
6. Click `Create`.

Now that you've connected your repository to the toolchain we need to add a tool to automate deployments for us:

1. Click `Add a Tool`.
2. Select `Delivery Pipeline`.
3. Give your pipeline and name and click `Create`.

## Configuring the Delivery Pipeline

You should now see a delivery pipeline tile in your toolchain under the `Deliver` heading.

**Adding the build stage**
1. Click on the `Delivery Pipline` tile and click `Add Stage`.
2. Name your stage `Build` and change to the `Jobs` tab.
3. Click `Add Job` and select type `Build`.
4. The `Builder Type` dropdown will give you various build options. Leave `Simple` selected - this will use the default build type from the *buildpack* for your programming language.
5. Click Save. This will navigate you back to the pipeline stages.
6. Run Stage


**Note:** Remember from 12-factor that we store configuration in the environment? Each stage has an environment tab where we can store config.*

**Adding the Unit Testing stage**
1. Click `Add Stage` again, notice how this time it defaults the input settings to the previous stage `build`.
2. Click setting icon next to the stage name and choose configure stage.

3. Name your stage ` Unit Testing ` and change to the `Jobs` tab.
4. Click `Add Job` and select type "Test".
5. Select the Enable Test Report check box.
6. Provide a name for the test report file or use the default that is provided.
Note: Depending on the configuration of your testing framework, the name of this file might need to match what is specified in your test cases. Because this value was defined in the unit test, include the test/mocha-report.xml value.

7. Click Save to return to the pipeline.
8. Run Stage


## Validating the setup

1. On the build stage, click the Run Stage icon to re-run the stage by using the new unit testing configurations.
 - Ensure that the build stage runs successfully. 
 - If the stage fails, check the build stage logs, make any necessary corrections, and then re-run the stage.
2. To view the results of your unit tests, on the build stage, click View logs and history.
3. Select Unit tests and click the TESTS tab to view all of the configured unit tests.
4. Click a unit test to view its results.



**Adding the Deploy to Test stage**
1. Click `Add Stage` again, notice how this time it defaults the input settings to the previous stage `Unit Testing`.
2. Click setting icon next to the stage name and choose configure stage.
3. Name your stage ` Deploy to Test ` and change to the `Jobs` tab.
4. Click `INPUT` tab and choose ( input type :"Build artifacts”, stage: “Build”, Job:”NPM” ).
5. Click `Add Job` and select type "Deploy".
6. Select the Builder Type to be NPM.
7. Click Save. This will navigate you back to the pipeline stages.
8. Run Stage



**Adding the Run Tests - Performance & Scale stage**
1. Click `Add Stage` again, notice how this time it defaults the input settings to the previous stage `Deploy to Test`.
2. Click setting icon next to the stage name and choose configure stage.
3. Click `INPUT` tab and choose(        ).
4. Name your stage ` Run Tests - Performance & Scale ` and change to the `Jobs` tab.
5. Click `Add Job` and select type "Test".
6. In `Tester Type` dropdown select type "Sauce Labs".
7. Click `IBM Cloud Region` and select type your region.
8. Click `Save` This will navigate you back to the pipeline stages.
9. Run Stage


 **Adding the Deploy to prod stage**
1. Click `Add Stage` again, notice how this time it defaults the input settings to the previous stage (Deploy to prod).
2. Click setting icon next to the stage name and choose configure stage.
3. Click `INPUT` tab and choose ( input type :"Build artifacts”, stage: “Build”, Job:”NPM” ).
4. Name your stage ` Blue/Green Deploy` and change to the `Jobs` tab.
5. Click `Add Job` and select type "Deploy".
6. In `Deployer Type` dropdown select type "Cloud Foundry".
7. Click `IBM Cloud Region` and select type your region.
8. Click `Save` This will navigate you back to the pipeline stages.
9. Run Stage

Your pipeline is now all set up and ready to go. Importantly, your pipeline stores all of the outputs from your `Build Stage`. This allows us to reliably redeploy that build to multiple places or to roll back versions if we make a mistake.

*Note: This segregation of Build and Deploy stages is an important element of our 12-factor app as defined by the* [Build, Release, Run](https://12factor.net/build-release-run) *rule.*

## Changing the application

To check that our toolchain is working as intended we'll make a quick change to the code on our machine and push it up to GitHub.

1. Open the `calc.js` file on your local machine, uncomment the division related commented code sections as follows 
```javascript
     case '4':
      console.log(`The quotient of ${x} and ${y} is ${operations.divide(x, y)}.`);
      break;
```
Note:  don’t forget to add a fourth choice for the user to see in the choices, as follows:
```javascript
  rl.question(`
Please select from the following options:

[1] Addition (+)
[2] Subtraction (-)
[3] Multiplication (*)
[4] Division (/)

Enter your choice: `, (choice) => {
```
2. Open the `operations.js` file on your local machine, uncomment the division related commented code sections as follows

```javascript
const divide = (x, y) => (+x) / (+y);
```
**Note:** don’t forget to add `divide` to your `export.modules`

2. Save the project.
3. Back in your terminal run the following commands:
- `git add .`
- `git commit -m "added division function"`
- `git push`

If you jump back to your delivery pipeline you should be able to see the stages running automatically. When the deploy succeeds your app will now display a new message when you visit your route.


## Changing the application

Try making some changes to the code again and then push them to the code repo on GitHub. This time keep refreshing the URL as your application deploys. You'll notice the app never goes down but at some point you switch over to the new version.

To check that our toolchain is working as intended we'll make a quick change to the code on our machine and push it up to GitHub.

1. Open the `calc.js` file on your local machine, uncomment the division related commented code sections as follows 
```javascript
    if (!operations.validateNumbers(x, y)){
    //   console.log('Only numbers are allowed! Please restart the program.');
    // }
    // else{
```
**Note:**  don’t forget to uncomment the curly bracket to close the function as follows:
```javascript
rl.close();
    });}
```

2. Save the project.
3. Back in your terminal run the following commands:
- `git add .`
- `git commit -m "Crash the application"`
- `git push`

If you jump back to your delivery pipeline you should be able to see the stages running automatically.
- When the deploy succeeds your app will now display a new message when you visit your route. Which should fail!!
Then undo the previous changes in the `calc.js` file, then run the pipeline once more.


The steps outlined above can be configured further if there are multiple instances of an app running. We can chose to add delays, ramp up or down instances and/or keep more versions of an app running, as shown in the previous steps that we added the `divide` function and tried to crash the entire application.


## Optional Extra Try!

We may also want to deploy to other geographic regions.


**References**
1. [unit testing](https://www.taniarascia.com/unit-testing-in-javascript/), if you need to know more information on how to do unit testing.


 














