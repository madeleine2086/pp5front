<h1>BOOK|tagram Testing</h1>

Back to the [README](README.md)

<h1 id="contents">Contents</h1>

-   [Manual Functional Testing](#manual-testing)
-   [Automated Jest Testing](#automated-testing)
-   [Alerts](#alerts)
-   [HTML Validator](#html-validation)
-   [CSS Validator](#css-validation)
-   [Console Results](#console-results)
-   [Lighthouse Results](#lighthouse)
    -   [Desktop](#lighthouse-desktop)
    -   [Mobile](#lighthouse-mobile)
-   [Bugs / Issues](#bugs)

<h1 id="manual-testing">Manual Functional Testing Results</h1>

<br/>
<h1 id="automated-testing">Automated Jest Testing Results</h1>
<br />
<h1 id="alerts">Alerts</h1>

<h2>Authentication</h2>

-   On the sign in and sign up page if a user submits a password that does not meet the requirments a warning alert will be displayed explaining the reason it failed.

<img src="documentation/readme-screenshots/testing/console/manual-checks/password-alert.png">

-   Logged in success alert with username top right of the screen.

<img src="documentation/readme-screenshots/testing/console/manual-checks/signin-alert.png">

-   Logged out success alert top of the screen.

<img src="documentation/readme-screenshots/testing/console/manual-checks/signout-alert.png">

<h2>Posts</h2>

-   Success alert pops up when post is created, edited and deleted (after confirming deletion)
<img src="documentation/readme-screenshots/testing/console/manual-checks/post-create-confirm.png">


-   When the delete icon is clicked a confirmation modal pops up to confirm the action to prevent accidental deletions.

<img src="documentation/readme-screenshots/testing/console/manual-checks/deletion-alert.png">


<h2>Comments</h2>

-   Success alert pops up when post is created, edited and deleted (after confirming deletion)
<img src="documentation/readme-screenshots/testing/console/manual-checks/comment-crud-alert.png">

-   When the delete comment icon is clicked a confirmation modal pops up to confirm the action to prevent accidental deletions.
<img src="documentation/readme-screenshots/testing/console/manual-checks/deletion-alert.png">


<h2>Likes</h2>

-   Success alert after like/unlike a post:
<img src="documentation/readme-screenshots/testing/console/manual-checks/like-post-alert.png">

-   Message displayed to inform a user that they can't like their own post:
<img src="documentation/readme-screenshots/testing/console/manual-checks/own-post-like.png">

<h1 id="html-validation">HTML Validation</h1>

<img src="documentation/readme-screenshots/testing/console/html-css/htmltest.png">

<h1 id="css-validation">CSS Validation</h1>

<img src="documentation/readme-screenshots/testing/console/html-css/csstest.png">

<h1 id="console-results">Console Results</h1>

<h2 id="console-loggedout">Logged Out</h2>

<img src="documentation/readme-screenshots/testing/console/console-notloggedin.png">

-   The browser console shows 3 errors related to authentication as is expected as the user is not logged in.

<h2 id="console-loggedin">Logged In</h2>

<img src="documentation/readme-screenshots/testing/console/console-loggedin.png">

<h1 id="lightHouse">Lighthouse</h1>

<h2 id="lighthouse-desktop">Desktop</h2>

-   Performance could be improved on by adding lazy loading to the images and implementing a CDN with caching.

<img src="documentation/readme-screenshots/testing/console/lighthouse/lighthouse-desktop.png">

<h2 id="lighthouse-mobile">Mobile</h2>

<img src="documentation/readme-screenshots/testing/console/lighthouse/lighthouse-mobile.png">

<h1 id="bugs">Bugs / Issues</h1>

