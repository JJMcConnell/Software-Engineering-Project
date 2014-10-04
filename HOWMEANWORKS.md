Software-Engineering-Project
============================

[front end people](front-end-people:)
[back end people](back-end-people:)

![Schedule](http://freethoughtalliance.org/fta/wp-content/uploads/2012/01/schedule.jpg)
### FRONT END PEOPLE:
All your stuff is in mean-master/public/modules/core
Don't worry about anything else!!

##### What is that?
  Core is the module of the website that contains the home page. This contains a seperate folder for views, controllers, routes (the config folder), images, and css files, which all contribute to the home page (or any other html pages you add to views).
  
##### What is a module?
 A module is simply a folder that contains all the previously mentioned things. It's an organizational thing. You could add another module if you wanted to seperate pages into groups rather than put all of them in the views folder of the core module.
    
##### What is the config folder and these routes?
Here is your routes file. Routes contain which addresses go where. For instance `localhost:3000/` will go to the home page, because `/` is routed to the home html file. You can add more routes to route more addresses to more pages. So I could add a route from `/banana` to `monkey.html` and when you go to `localhost:3000/banana` it will take you to `monkey.html`
    
###### How do I make a link from one page to another page?
Easy! Add a route to set up the address for both pages (two routes), and then on the link of the first page add a link to the route to the second page. For instance, `href=/banana` will take you to `monkey.html` in the last example.

##### How do controllers work?
  Controllers are basically just containers of java methods. Any html page can reference any controller, and it will have access to all the methods inside that controller. Many pages can have one controller, or one page can have mutiple controllers. Which controllers are referenced by which page does not affect how they work, it is just organizational.

##### P.S
You should get an html editor of some kind. Microsoft Web Developer works. You can create individual pages just for graphics, and then once you are ready to put them in meanjs and use javascript just copy them into the views folder. (Also Sublime is a godsend! - Danny)
  
###  BACK END PEOPLE:
All of your stuff is in the app folder!

##### What am I looking at?
  A computer screen. JK, backend has controllers too, but also has models for setting up what the database will contain, routes for backend routing, tests, and views.

##### What are these views? That's not backend!
  Don't worry about it. They are just extra pages like error pages and stuff.
  
##### What are these routes?
  For backend, routes can tie certain web addresses to backend methods. That means when you go to a certain address or page on the website it will automatically run a method from a backend controller.
  
##### What are controllers?
  Controllers are just java script files that contain methods. You can put all the methods into one controller or seperate them into different controllers, but that is completely organizational. Backend controllers should contain methods which do spefic backend functions like add to the database or query the database.
  
##### What are models?
Simple. Each model file will use mongoose to create a schema. Schemas show what a collection will look like. A collection is a kind of thing you add into mongodb with a defined set of properties, like a table in sql. So a model will define the properties of something you are planning to add and retrieve from the database. For instance, if you want to add dogs do the database a model called dog might contain properties like birthday, breed, fur color, and a boolean for whether it is infected with rabies or not.
