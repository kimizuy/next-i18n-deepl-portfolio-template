import type { Frontmatter } from './type';

const isString = (value: unknown): value is string => typeof value === 'string';
const isDate = (value: unknown): value is Date =>
  value instanceof Date || Object.prototype.toString.call(value) === '[Object Date]'
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isFrontmatter = (arg_0: unknown): arg_0 is Frontmatter => isObject(arg_0) && 
  ('title' in arg_0 && (isString)(arg_0['title'])) && ('publishedAt' in arg_0 && (isDate)(arg_0['publishedAt']));
export function assertIsFrontmatter(value: unknown): asserts value is Frontmatter {
  if (!isFrontmatter(value)) throw new TypeError(`value must be Frontmatter but received ${value}`)
};