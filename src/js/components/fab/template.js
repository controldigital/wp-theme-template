/**
 * @module      ./components/fab/template
 */

import { createElement } from 'Modules/elements.js';

/**
 * Creates a template specific for the fab element.
 * 
 * @function        createElement
 * @returns         {HTMLTemplateElement}
 */
export const createTemplate = () => {

    // Icon slot
    const iconSlot = createElement('slot', {
        attributes: {
            name: 'icon'
        }
    });

    // Icon with slot child.
    const icon = createElement('div', { 
        classes: ['icon'],
        children: [iconSlot]
    });

    // Menu item slot
    const menuItemSlot = createElement('slot', {
        attributes: {
            name: 'menu-item'
        }
    });

    // Menu list with menu item slot child.
    const menuList = createElement('div', {
        classes: ['menu-list'],
        children: [menuItemSlot]
    });

    // Nav element with menu list child.
    const menu = createElement('nav', {
        classes: ['menu'],
        children: [menuList]
    });

    // Template with icon and menu children.
    const template = createElement('template', {
        children: [icon, menu]
    });

    return template;

};