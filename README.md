# UI11116: Web Applications Development 2021/22

## Student ID: 19000170

## Contents



***

## Introduction

This assignment was to take a pre existing web page (which was part of a larger whole) and recreate using React.  In addition to creating the page, three new features had to be added.  In completing this work, React had to be learned (to at least a moderate level) as well as a number of features of the Google Firestore suite (specifically Firebase.)

### Repository

All code (including this README file) can be found at https://github.com/adamsjoe/assignment219000170 which is a public GitHub repository.

### Deployed Application

The application has been deployed at https://assignment219000170.web.app

### Methodology

To track work on this board, a Kanban board was created.  Initially this was created with Github but moved to use the Miro platform.  The miro platform allowed for slightly better organisation (for me) as I could tag tickets and implement a basic priority system.

The read only Miro board can be found at: https://miro.com/app/board/uXjVODxHWbc=/?share_link_id=950433864690

A simple tagging system was also implemented.  The tags, and their meanings, are in the table below:

| Tag                  | Description |
| -------------------- | ----------- |
| **New Feature**          | These tickets relate to the new features requested on the assignment. |
| **Helper**               | These tickets relate to any task which will aid progress of the work. |
| **Support Task**         | These tickets relate to any task which is needed to complete main work. |
| **Bug Bash**             | These tickets relate to fixing any minor issues which could be classed as bugs.|
| **Stretch Goal**         | These tickets are "nice to haves" and not required to complete the assignment. |
| **Investigation Needed** | These tickets require some form of reading up, studying, or off project proof of concept work. |
| **Bug**                  | These tickets are bugs within the application. |
| **Refactor**             | These tickets relate to features which are complete, but could be tidied up. |
| **Unplanned Work**       | During the assignment, a hardware failure prompted setting up a new computer.  This meant redoing some tasks from before.  Recorded with this tag. |

## Structure

The starting point for this assignment was the 'create-react-app' package.  This created a basic project which was then customised.  Many of these changes were created within the "src" folder, but a few were outwith this folder.

#### Non "src" changes

* Added a 404.html file.  It was discovered that firebase will automatically serve the file called 404.html if the user attempts to navigate to a page which does not exist.  This file must be present in the "public" directory.  This was, essentially, "free" functionality requiring nothing more than creating a file.  No routes had to be added and the 404 was added.  It was not asked for in the assignment, but it was felt that as this was a spike, the chances of users thinking the application was ready was high, so the 404 was a "safety net" to avoid any embarassing blank screens.  An image of the 404 page is shown below (however the 404 is animated.)
  ![Image](readmeImages/404.png)
* The favicon was changed from the default react image to the university logo.  This was again not requested, but it was felt that making this small change made this look a little more polished - and less like a hacked together spike.
* The index.html had the title changed as well as including the font awesome library - the font awesome library was used for the chat icon as well as the file upload button (more on that later.)

#### "src" changes

There were many changes from the create-react-app within the "src" directory. 

A number of new directories were created.  These are outlined below:

| Directory Name | Function |
| -------------- | -------- |
| components     | To aid project organisation, certain features were split off to be used as components.  |
| icons          | This is only used to store the svg for the site logo. |
| pages          | Three main pages were identified for this project.  These are outlined later, but the files are here. |
| services       | Firebase config is located here |
| styles         | All css files for the application are kept here. |

##### Pages

As indicated above, 3 pages were identified.  These are the main touch points which the user will navigate when using the site.  The three pages are:
* LoginPage
* ProblemIndex
* QuestionPage

When the application first loads, assuming that no user has previously been left "logged in" then the user will see the following:
![Image](readmeImages/firstPage.png)
This image shows the NavBar, which in breaking with the "component" methodology, has been been created as part of the App.js file.  This means the NavBar (and all associated functions) will be available throughout the application.  On the NavBar there are 3 links
* Problem Index - this link redirects the user back to the root of the project.  The root of the project will vary depending on whether the user has logged in or not.  By default, it shows the same "please login to view content" page.
* Problem Generator - this was on the i-want-to-study-engineering site.  The assignment had no information for this, so this link is disabled.
* Login or Signup - will navigate to the login page.  The sign up function was not part of the assignment and has been left out.  If the user has logged in, then this link will allow them to logout.

###### Login Page
![Image](readmeImages/loginPage.png)

The loginPage contains a single button.  This button will launch a Google popup.  If the user has previously used a google account, this popup will briefly appear and used the stored credentials.

##### Problem Index

If the user __has not__ logged in, then the ProblemIndex will show the "Please login to view content."  The assignment asked that a user needed to login before they could view anything.  Once the user has logged in, the ProblemIndex page shows the following:
![Image](readmeImages/problemIndexLoggedIn.png)
Note: for this assignment, data was available for the "Balances" problem only.  So all links _except_ balances have been disabled.

##### Question Page

Clicking on the "balances" link (or if this was a fully developed site, any link) will load the Problem Page with the appropriate questions:
![Image](readmeImages/QuestionPage.png)

This page has been made up of a number of components:
![Image](readmeImages/questionPageComponents.png)

* The orange box shows the "QuestionComponent"
* The blue box shows the "HintComponent"
* The purple box shows the "AnswerComponent"

Each of these components is stored in the ```src/components``` directory - other components are also present here.

| Component Name | Function |
| AnswerComponent | As above - this shows the answers to the question which has been asked. |
| ChatModal       | Used in the chat feature.  Will be covered in that section. |
| CheckAnswerModal | When the user clicks on an answer and then "check my answer" this modal appears to inform them of either a correct or incorrect answer. |
| HintComponent | As above - this shows the videos and images to help the user answer the question. |
| ImageModal | When the user clicks on an image, this is displayed in a modal |
| QuestionComponent | As above - this shows the image and question text the user needs to answer. |
| VideoModal | When the user clicks on a Video link, this is shown in a specific modal. |

It should be noted that the images and videos all work.  This was not a requirement for the assignment, however images are easy to display with HTML and with HTML 5 and the ```<video>``` tag, not adding these did not make any sense.  Adding them adds to the overall presentation of the spike.

#### Additional Technology

##### Firebase
In order to make this application work, Google's Firebase was used as a backend data source.  The data needed was originally supplied in JSON format (and this can be found in the "data" folder within the repo.  This data is as was given, with one minor exception of removing a split line to aid readability.)  This data was transferred to a firestore document (in this case called "balances")

A snapshot of this can be seen below: 
![Images](readmeImages/firestore.png)

Note: this is a snapshot - it does not show **all** the data.

##### run-script

Looking at the package.json file, a new entry can be seen in the "scripts" section.  This entry is ```"fullDeploy": "react-scripts build && ./node_modules/.bin/firebase deploy"``` - this was added to aid in deployment, running this command with ```npm run-script fullDeploy``` will automatically build the application and deploy this to the firebase servers.  As part of this deployment, 2 additional files exist in the repo.  These are "firestore.rules" and "storage.rules" - these files are what the developer would setup on the firebase console.  With these kept in source control we have better control over any changes to our infrastructure.

##### VS Code addins

A number of addins have been configured in VSCode.  

First among these was installing the fira code font.  This does nothing to the code on the server, it merely aids readability for the developer locally.  Firacode is a monospaced font with ligatures.  It can be found: https://github.com/tonsky/FiraCode
![Image](readmeImages/firacode.png)
The main benefit of fira code is the use of ligatures.  The image above shows the equals with a strike through which is used in place if ```!=```

Also installed was CSpell - which is a spell checker for VS Code.  Any unknown words will be flagged up in the problems tab of VS Code.  Words can be added to the dictionary by adding them to the cspell.json file in the project root.


## Task Breakdown

### Task 1: Live Chat Support

Live chat support was challenging as it was felt this feature was not well specified.  There were some questions which needed to be asked and a "best approach' was taken.  
In the end, some liberty has been taken with this feature.  Specifically:
* Each video can have a chat.
* Each of those chats can be locked (the specification calls for a thread to be locked for a period of 3 days, or until an admin has answered.)


### Task 2: FAQ

### Task 3: Percentage for Responses.

## Evaluation