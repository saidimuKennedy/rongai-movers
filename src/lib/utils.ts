/**
 * @file Utility functions for the application.
 * @module lib/utils
 * @description This file provides general-purpose utility functions, primarily for front-end development
 *              such as handling CSS class names. It does not contain business logic or directly render UI components.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Conditionally joins CSS class names together.
 *
 * This utility function combines `clsx` for conditional class joining
 * and `tailwind-merge` for intelligently merging Tailwind CSS classes,
 * resolving potential conflicts by ensuring that the most specific
 * or latest class takes precedence.
 *
 * @param {...ClassValue[]} inputs - An array of class values, which can be strings,
 *   objects (where keys are class names and values are booleans), or arrays
 *   of class values.
 * @returns {string} A single string of merged and unique CSS class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
