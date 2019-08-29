/**
 * @module	./components/define
 */

// Import list.
import CustomElementsDefiner from 'Utilities/CustomElementsDefiner.js';

// Import custom elements.
import HTMLCardElement from './card/Card.js';
import HTMLFabElement from './fab/Fab.js';
import HTMLLazyElement from './lazy/Lazy.js';
import HTMLLikeElement from './like/Like.js';
import HTMLMenuElement from './menu/Menu.js';
import HTMLMessageElement from './message/Message.js';
import HTMLModalElement from './modal/Modal.js';
import HTMLPanelElement from './tabs/Panel.js';
import HTMLScrollBarElement from './scrollbar/Scrollbar.js';
import HTMLSliderElement from './slider/Slider.js';
import HTMLSlideElement from './slider/Slide.js';
import HTMLTabsElement from './tabs/Tabs.js';
import HTMLTabElement from './tabs/Tab.js';
import HTMLTimeElement from './time/Time.js';
import HTMLToggleElement from './toggle/Toggle.js';
import HTMLTooltipElement from './tooltip/Tooltip.js';
import HTMLViewElement from './view/View.js';

/**
 * A list with names and constructors for custom elements.
 * 
 * @type {CustomElementsDefiner}
 */
const definer = new CustomElementsDefiner();

// Add card element.
definer.add('card', HTMLCardElement);

// Add fab element.
definer.add('fab', HTMLFabElement);

// Add lazy element.
definer.add('lazy', HTMLLazyElement);

// Add menu element.
definer.add('menu', HTMLMenuElement);

// Add like element.
definer.add('like', HTMLLikeElement);

// Add message element.
definer.add('message', HTMLMessageElement);

// Add modal element.
definer.add('modal', HTMLModalElement);

// Add panel element.
definer.add('panel', HTMLPanelElement);

// Add scrollbar element.
definer.add('scrollbar', HTMLScrollBarElement);

// Add slider element.
definer.add('slider', HTMLSliderElement,);

// Add slide element.
definer.add('slide', HTMLSlideElement,);

// Add tabs element.
definer.add('tabs', HTMLTabsElement);

// Add tab element.
definer.add('tab', HTMLTabElement);

// Add time element.
definer.add('time', HTMLTimeElement);

// Add toggle element.
definer.add('toggle', HTMLToggleElement);

// Add tooltip element.
definer.add('tooltip', HTMLTooltipElement);

// Add view element.
definer.add('view', HTMLViewElement);

// Export the definer as default.
export default definer;