/**
 * @module		./components/calculator/operators
 */

import { memo } from 'Utilities/memoization';

/**
 * Add a and b together. Store the result in a cache
 * for retrieving the result for a call with the exact
 * same arguments to limit calculations.
 * 
 * @function	add
 * @param		{number} a Number represented as a.
 * @param		{number} b Number represented as b.
 * @returns		{number}
 */
export const add = memo((a, b) => a + b);

/**
 * Subtract b from a. Store the result in a cache
 * for retrieving the result for a call with the exact
 * same arguments to limit calculations.
 * 
 * @function	subtract
 * @param		{number} a Number represented as a.
 * @param		{number} b Number represented as b.
 * @returns		{number}
 */
export const subtract = memo((a, b) => a - b);

/**
 * Multiply a by b. Store the result in a cache
 * for retrieving the result for a call with the exact
 * same arguments to limit calculations.
 * 
 * @function	multiply
 * @param		{number} a Number represented as a.
 * @param		{number} b Number represented as b.
 * @returns		{number}
 */
export const multiply = memo((a, b) => a * b);

/**
 * Divide a by b. Store the result in a cache
 * for retrieving the result for a call with the exact
 * same arguments to limit calculations.
 * 
 * @function	divide
 * @param		{number} a Number represented as a.
 * @param		{number} b Number represented as b.
 * @returns		{number}
 */
export const divide = memo((a, b) => a / b);

/**
 * Calculate using two numbers and a operator.
 * The operator will calculate the two numbers together
 * to return a new number.
 * 
 * @function	calculate
 * @param 		{number} a Number represented as a.
 * @param 		{number} b Number represented as b.
 * @param 		{Function} operator The operator to use.
 * @returns		{number}
 */
export const calculate = (a, b, operator) => operator(a, b);