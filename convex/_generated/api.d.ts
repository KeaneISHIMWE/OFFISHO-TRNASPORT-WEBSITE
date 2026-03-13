/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as actions_cloudinary from "../actions/cloudinary.js";
import type * as actions_email from "../actions/email.js";
import type * as actions_index from "../actions/index.js";
import type * as auth from "../auth.js";
import type * as cars from "../cars.js";
import type * as contact from "../contact.js";
import type * as http from "../http.js";
import type * as lib_auth from "../lib/auth.js";
import type * as migrations from "../migrations.js";
import type * as requests from "../requests.js";
import type * as reset_roles from "../reset_roles.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "actions/cloudinary": typeof actions_cloudinary;
  "actions/email": typeof actions_email;
  "actions/index": typeof actions_index;
  auth: typeof auth;
  cars: typeof cars;
  contact: typeof contact;
  http: typeof http;
  "lib/auth": typeof lib_auth;
  migrations: typeof migrations;
  requests: typeof requests;
  reset_roles: typeof reset_roles;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
