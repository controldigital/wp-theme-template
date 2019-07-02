# wp-theme-template
WordPress theme template to fire up your WP project.
Put together by Control Digital.

Fork it and use it if you like it.

## Setup
Make sure you have the latest version of node.js installed on your device. If not, you can download it [here](https://nodejs.org/en/).
After installing node open the terminal and go to the folder of your theme.
Type the following below to install all the dependencies needed for this project.
```
npm install
```

If you havent installed the Gulp commandline interface yet, enter the following below to install it globally on your machine.
```
npm install -g gulp-cli
```

After all the packages have been installed, type in `gulp` to startup the Gulp process.
This will startup a few of the processes like Autoprefixing CSS, bundling JS and / or other tasks you might add.
```
gulp
```

To exit gulp press `ctrl` + `z`.


## Features

### Web Components
This branche has a heavy focus on the use of web components. These components are custom HTML elements with the behaviour built in. The selected components can be added or removed in the `define.js` file in the `src/js/components` folder. Head over to the `define.js` in the components folder to include a component. A component can be imported like so:
```javascript
import HTMLTooltipElement from './tooltip/Tooltip.js';
```
Then add the element to the customElementsList with a name, the element' class and an optional options object if the custom element is an extention of an existing native HTMLElement.
```javascript
customElementsList.add('ctrl-tooltip', HTMLTooltipElement);
```

### Sass
Instead of creating a single CSS file we have implemented Sass for a more module like approach.
All the SCSS files come together in the `style.scss` file in the `src/scss` folder. This file will be transpiled to plain CSS and placed in the `dist` folder.

### Service Worker
A Service Worker file is ready to use in this theme. The file already has some prewritten default behaviours. Like checking the browsers cache if a file that is being fetched has already been fetched before and can therefor be retrieved from the cache. Import and use the following module to register the serviceworker.
```javascript
import { registerServiceWorker } from 'Modules/sw.js';

registerServiceWorker('path/of/serviceworker.js');
```