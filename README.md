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

##### Bootstrap

To make the layout of the page, bootstrap was used.  However, rather than load bootstrap using the index and a CDN, the react-bootstrap package was chosen as it allowed for slightly easier to read code and is a more "react" way of doing this.

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
* Only videos can have start a chat - images do not start any chat functionality.  This was decided based on the screenshot in the assignment documentation
![Image](readmeImages/assignmentScreenshot.png)
* Only videos can show the FAQs - this was decided as a follow on to the point above.  It also made sense that the FAQs would be specific to the video.
* It made sense to have a separate chat component - and once it was decided that each video could have its' own chat, it made sense to tab this window.

To accomplish this task, firstly, the videos were uploaded to firestore. The UI was then constructed, firstly with a video to merely displaying the video.  As the i-want-to-study-engineering site had both videos and images shown in modals, fortunately react-bootstrap (like it's CDN counterpart) has a modal component, so this is what would be used.   Next was to determine how this modal would be used.  It was considered having a single modal component and then having this displayed different depending on if an image or a vide was selected.  However, this was rejected.  Splitting into a modal for images and a modal for videos allowed a better seperation of concerns as images wouldn't have the chat (or the FAQ.)  Then the logic for the confused button was added.  Finally the thread "locking" mechanism was added.  This took care of how a user would initiate a chat, but it not the chat feature.

To add the final chat feature, a method was needed to call the chat.  It was decided to have an option on the NavBar.  This would allow the chat to be called from anywhere in the application.  Initially, it was envisioned to have a "count" of unread messages, but it was then determined that this would be horribly complex and needless over complicate the assignment.  In keeping with the "spike" methodology the count was removed and a much simpler action would be added.  A simple button which would call a chat modal. 

The button was styled with a font awesome icon. <img src='https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/regular/comment-dots.svg' width='50' height='50'>  In keeping with the requirement that nothing is accessable unless logged in, the chat icon will only appear if a user has logged in.

Clicking on the button will open the chat feature.
![Image](readmeImages/chatFeature.png)

As noted at the beginning of this section, the requirements were unclear about the chat feature, so some liberty was taken with the UI.  As can be seen, there are 6 tabs (one for each video - the name has been derived from the JSON for the video) and each of these tabs is separate, what is entered into one tab is not shown on the others.  As can also be seen from the screenshot, the Admin user (on the left) has an "Add to FAQ" button, while the non-admin has none (but this is the second feature and will be spoken about there.)

The work for the live chat feature was contained within tickets:

![Image](readmeImages/liveChatTickets.png)

In order to support the chat feature, a new firebase collection was created.  This collection was named "chats."

The chats document was constructed with the following fields:
```
{
  addedToFAQ: (boolean)
  content: (string)
  image: (string)
  isAdmin: (boolean)
  timestamp: (number)
  type: (StudentQuery)
  userName: (array)
    0: (string)
    1: (string)
  uuid: (string)
  video: (string)
}
```

When a chat is initiated (via the video) then a new document is created which will populate the fields in the document.  When the user moves to the chat portion, depending on which tab is clicked, a query will run to pull back, in descending time order, the chats for that specific video.  This is done using the following query:
```javascript
const query = firestore.collection('chats').where('video', '==', activeTab).orderBy('timestamp', 'desc');
```
The "activeTab" variable comes from the user clicking on the tab.  The react-tab package will return an index of the tab which has been clicked:
```javascript
<Tabs defaultIndex={0} onSelect={(index) => setActiveTab(chatNames[index])}>
```
To match this up, a simple array was declared:
```javascript
  const chatNames = [
    'problem_s',
    'spec_strat_balan_s',
    'mom_s',
    'spec_mom_s',
    'gravity_s',
    'spec_gravity_s',
  ];
```
This results in the query being updated with the appropriate video when the user clicks on a tab.

In terms of the chat, this is all dealt with with the following code:
```javascript
        <div className=''>
          <div className='userLayout'>
            {localMessages.map((localMessage) => (              
              <div className={`${userId}` === `${localMessage.uuid}` ? 'fromUserLayout userCurrentLayout' : 'fromUserLayout userOtherLayout'} >
                {console.log("")}
                <div className={`${userId}` === `${localMessage.uuid}` ? 'user userCurrent' : 'user userOther'}>
                  <p className='chatUser'>{`${userId}` === `${localMessage.uuid}` ? 'You' : localMessage.userName[0] } {localMessage.isAdmin === true ? '- ( Chat Admin )': ''}</p>
                  <p>{localMessage.content}</p>
                  { localMessage?.image && localMessage.image.length > 0 && <img style={{width: '100%', height: 'auto', marginBottom: 24}} src={localMessage.image} alt='chat' /> }
                  <p className='chatTimestamp'><b>Sent:</b> {new Date(localMessage.timestamp).toLocaleTimeString()}, {new Date(localMessage.timestamp).toDateString() }</p>
                  {(admin === true && localMessage.addedToFAQ === false) ? <button className='addFAQButton' onClick={async () => {
                    await firestore.collection('chats').doc(localMessage.mid).update({
                      addedToFAQ: true,
                    });
                  }}>Add to FAQ</button> : ''}
                </div>
              </div>),
            )}
          </div>
```

This code will take the output of the query run when a tab is clicked, and then will determine if the message belongs to the user, or if if it belongs to another user.  This will determine which CSS class is used.  This same mechanism will also be used to show the name of the user who sent the message.  If it was the logged in user, the name is replaced with "You" - otherwise their first name is shown.  And if the user is admin then "(admin)" is appended.

Admittedly, these tickets could have been broken down to a much lower level.  Indeed, if this was a multiple person project it would have been essential to break these down to lower level tasks.  However, as this was a single person project - these 3 tickets were enough to track the progress.

### Task 2: FAQ

Following on from the Live Chat feature, is the Add to FAQ section. This was actually a fairly easy to implement.  When a chat messsage has been created, it has a field for "addedToFAQ" and this is set to false.  

The tickets for this feature are:

![Image](readmeImages/addToFAQTickets.png)

The code for this was already shown in the

### Task 3: Percentage for Responses.

## Evaluation