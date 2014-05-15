# Matt Tyas Prototype Website

> Front-end website prototype system, built with Assemble, Inuit.css and Grunt.

## Using this system

Install [Node.js](http://nodejs.org) and [Grunt.js CLI](http://gruntjs.com/getting-started)

Then, once you have the project downloaded, run the command `npm install` in the root of the project.

Once this finishes running, you can build the project by running the command `grunt`

Credit where is is due. This is not a fork exactly, but an idea I got from [github.com/buildingblocks](https://github.com/buildingblocks/bb-prototype-website). I have heavily simplified their very clever work to suit my own needs.

### [Assemble](http://assemble.io/)?

Assemble is a component and static site generator that makes it dead simple to build modular sites, documentation and components from reusable templates and data.

### [Inuit.css](http://inuitcss.com/)?

Powerful, scalable, Sass-based, BEM, OOCSS framework.

### [Grunt.js](http://gruntjs.com/)?

In one word: automation. The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes. After you've configured it, a task runner can do most of that mundane work for you—and your team—with basically zero effort.

[Find out more at the Grunt.js website](http://gruntjs.com/).

## Documentation
 * To run the scss lint task you need to also install the scss gem `$ gem install scss-lint` [this article is helpful](http://www.theguardian.com/info/developer-blog/2014/may/13/improving-sass-code-quality-on-theguardiancom).
 * Run `$ scss-lint path/to/your/sass/files` on the scss to lint

## Release history
 * 15/06/12 V1.1 Fixed issue with cmq no compiling to the correct directory, updated readme to include info scss lint
 * 15/06/15 V1 HTML and SASS builds, grunt tasks are in place.