This is the front-end for the Dash Evolution username signup.

## To run locally

Checkout the repo.

* `npm install`
* `bower install`
* Install Grunt
* From your web browser navigate to the **/dist** directory.

## Local development

All development should take place in the **/src** directory.

After making changes, build using grunt.

* 'grunt build'

### Templates
The directory structure is self-documenting. Most pages will have a corresponding directory with a **.js** file and a **.tpl.html** file. The **.tpl.html** files contain all of the basic html. The **.tpl** tells grunt this is a template that should be converted from HTML to JS. 

### CSS
The CSS is using Bootstrap 3.3.6 with LESS. To modify the CSS you can change the LESS variables located in **/src/less/variables.less**.

If you need some custom CSS, add it to **/src/css/author.css**. Anything in the **author.css** file will be appended to the bootstrap css. 

### Services
All services are located in **/src/app/common/services/** and **/src/app/common/models/**

## Build to dist/

While developing, you can have grunt build to **/dist** automatically by running the following: `grunt watch`

For production build simply run `grunt deploy`