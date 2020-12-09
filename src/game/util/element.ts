import camelToKebab from './camel-kebab';
import {GenericObject} from 'interfaces';

/**
 *  Create an element, with params
 * 
 *  @param {String} type - element type
 *  @param {Object} attributes - attributes to apply to element
 *  @param {*} content - attributes to apply to element
 */
export function Element(this: any, elementType: string, attributes?: GenericObject, content?: any) : HTMLElement {
  // Create element
  this.element = document.createElement(elementType);

  // Add properties (if they exist)
  if(attributes) for(const [key, value] of Object.entries(attributes)) {
    this.element.setAttribute(camelToKebab(key), String(value));
  }

  // Append content, if exists
  if(content) this.element.append(...content);

  // Return element
  return this.element;
}

/**
 *  Create an image
 * 
 *  @param {String} src - image URL
 *  @param {Number} width - width of image
 *  @param {Number} height - height of image
 */
export function Img(this: any, src: string, width?: number, height?: number, attributes?: GenericObject) : HTMLImageElement {
  // Create image
  this.image = new Image(width, height);

  // Add src
  this.image.src = src;

  // Add properties (if they exist)
  if(attributes) for(const [key, value] of Object.entries(attributes)) {
    this.image.setAttribute(camelToKebab(key), String(value));
  }

  // Return element
  return this.image;
}