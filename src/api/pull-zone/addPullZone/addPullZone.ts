/* eslint-disable sort/type-properties */

import { deepmerge } from "deepmerge-ts";
import normalize from "normalize-path";
import type { StorageHostname as StorageZoneEndpoint } from "../../../api/storage-zone/types";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

/**
 * UI Parameters
 *
 * Pull Zone Name
 * @example myoriginurl
 *
 * Origin Type
 * @example https://myoriginurl.com, with optional Host Header
 * @example Storage Zone
 *
 * Tier
 * @example $10/TB Standard Tier (websites), with priced enable zone selection
 * @example $5/TB High Volume Tier (large files and videos)
 */
export interface AddPullZoneRequest {
  /**
   * User-specific [API Key](https://dash.bunny.net/account/settings)
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  apiKey?: string;
  /**
   * Sets the origin URL of the Pull Zone
   */
  OriginUrl?: string;
  /**
   * Sets the list of referrer hostnames that are allowed to access the pull zone. Requests containing the header Referer: hostname that is not on the list will be rejected. If empty, all the referrers are allowed
   */
  AllowedReferrers?: string[];
  /**
   * Sets the list of referrer hostnames that are blocked from accessing the pull zone.
   */
  BlockedReferrers?: string[];
  /**
   * Sets the list of IPs that are blocked from accessing the pull zone. Requests coming from the following IPs will be rejected. If empty, all the IPs will be allowed
   */
  BlockedIps?: string[];
  /**
   * Determines if the delivery from the North America region should be enabled for this pull zone
   */
  EnableGeoZoneUS?: boolean;
  /**
   * Determines if the delivery from the Europe region should be enabled for this pull zone
   */
  EnableGeoZoneEU?: boolean;
  /**
   * Determines if the delivery from the Asia / Oceania regions should be enabled for this pull zone
   */
  EnableGeoZoneASIA?: boolean;
  /**
   * Determines if the delivery from the South America region should be enabled for this pull zone
   */
  EnableGeoZoneSA?: boolean;
  /**
   * Determines if the delivery from the Africa region should be enabled for this pull zone
   */
  EnableGeoZoneAF?: boolean;
  /**
   * Determines if the zone should block requests to the root of the zone.
   */
  BlockRootPathAccess?: boolean;
  /**
   * Determines if the POST requests to this zone should be rejected.
   */
  BlockPostRequests?: boolean;
  /**
   * Determines if the query string ordering should be enabled.
   */
  EnableQueryStringOrdering?: boolean;
  /**
   * Determines if the WebP Vary feature should be enabled.
   */
  EnableWebpVary?: boolean;
  /**
   * Determines if the AVIF Vary feature should be enabled.
   */
  EnableAvifVary?: boolean;
  /**
   * Determines if the Mobile Vary feature is enabled.
   */
  EnableMobileVary?: boolean;
  /**
   * Determines if the Country Code Vary feature should be enabled.
   */
  EnableCountryCodeVary?: boolean;
  /**
   * Determines if the Hostname Vary feature should be enabled.
   */
  EnableHostnameVary?: boolean;
  /**
   * Determines if cache slicing (Optimize for video) should be enabled for this zone
   */
  EnableCacheSlice?: boolean;
  /**
   * Determines if the zone token authentication security should be enabled
   */
  ZoneSecurityEnabled?: boolean;
  /**
   * Determines if the token authentication IP validation should be enabled
   */
  ZoneSecurityIncludeHashRemoteIP?: boolean;
  /**
   * Determines if the Pull Zone should ignore query strings when serving cached objects (Vary by Query String)
   */
  IgnoreQueryStrings?: boolean;
  /**
   * Sets the monthly limit of bandwidth in bytes that the pullzone is allowed to use
   */
  MonthlyBandwidthLimit?: boolean;
  /**
   * Sets the list of extensions that will return the CORS headers
   */
  AccessControlOriginHeaderExtensions?: string[];
  /**
   * Determines if CORS headers should be enabled
   */
  EnableAccessControlOriginHeader?: boolean;
  /**
   * Determines if the Pull Zone should automatically remove cookies from the responses
   */
  DisableCookies?: boolean;
  /**
   * Sets the list of two letter Alpha2 country codes that will be redirected to the cheapest possible region
   */
  BudgetRedirectedCountries?: string[];
  /**
   * Sets the list of two letter Alpha2 country codes that will be blocked from accessing the zone
   */
  BlockedCountries?: string[];
  /**
   * Sets the cache control override setting for this zone
   */
  CacheControlMaxAgeOverride?: number;
  /**
   * Sets the browser cache control override setting for this zone
   */
  CacheControlPublicMaxAgeOverride?: number;
  /**
   * @deprecated
   * (Deprecated) Sets the browser cache control override setting for this zone
   */
  CacheControlBrowserMaxAgeOverride?: number;
  /**
   * Determines if the zone should forward the requested host header to the origin
   */
  AddHostHeader?: boolean;
  /**
   * Determines if the canonical header should be added by this zone
   */
  AddCanonicalHeader?: boolean;
  /**
   * Determines if the logging should be enabled for this zone
   */
  EnableLogging?: boolean;
  /**
   * Determines if the log anonymization should be enabled
   */
  LoggingIPAnonymizationEnabled?: boolean;
  /**
   * The ID of the storage zone that should be used as the Perma-Cache
   */
  PermaCacheStorageZoneId?: number;
  /**
   * Determines if the AWS signing should be enabled or not
   */
  AWSSigningEnabled?: boolean;
  /**
   * Sets the AWS signing region name
   */
  AWSSigningRegionName?: string;
  /**
   * Sets the AWS signing secret key
   */
  AWSSigningSecret?: string;
  /**
   * Determines if the origin shield should be enabled
   */
  EnableOriginShield?: boolean;
  /**
   * Determines the zone code where the origin shield should be set up
   */
  OriginShieldZoneCode?: string;
  /**
   * Determines if the TLS 1 should be enabled on this zone
   */
  EnableTLS1?: boolean;
  /**
   * Determines if the TLS 1.1 should be enabled on this zone
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  EnableTLS1_1?: boolean;
  /**
   * Determines if the cache error responses should be enabled on the zone
   */
  CacheErrorResponses?: boolean;
  /**
   * Determines if the SSL certificate should be verified when connecting to the origin
   */
  VerifyOriginSSL?: boolean;
  /**
   * Sets the log forwarding token for the zone
   */
  LogForwardingEnabled?: boolean;
  /**
   * Sets the log forwarding destination hostname for the zone
   */
  LogForwardingHostname?: string;
  /**
   * Sets the log forwarding port for the zone
   */
  LogForwardingPort?: number;
  /**
   * Sets the log forwarding token for the zone
   */
  LogForwardingToken?: string;
  /**
   * Sets the log forwarding protocol type
   */
  LogForwardingProtocol?: number;
  /**
   * Determines if the logging permanent storage should be enabled
   */
  LoggingSaveToStorage?: boolean;
  /**
   * Sets the Storage Zone id that should contain the logs from this Pull Zone
   */
  LoggingStorageZoneId?: number;
  /**
   * Determines if the zone should follow redirects return by the origin and cache the response
   */
  FollowRedirects?: boolean;
  /**
   * Determines the maximum number of connections per IP that will be allowed to connect to this Pull Zone
   */
  ConnectionLimitPerIPCount?: number;
  /**
   * Determines the maximum number of requests per second that will be allowed to connect to this Pull Zone
   */
  RequestLimit?: number;
  /**
   * Determines the amount of traffic transferred before the client is limited
   */
  LimitRateAfter?: number;
  /**
   * Determines the maximum number of requests per second coming from a single IP before it is blocked.
   */
  LimitRatePerSecond?: number;
  /**
   * Determines the maximum burst requests before an IP is blocked
   */
  BurstSize?: number;
  /**
   * Determines if WAF should be enabled on the zone
   */
  WAFEnabled?: boolean;
  /**
   * Determines the enabled WAF rule groups
   */
  WAFDisabledRuleGroups?: string[];
  /**
   * Determines the disabled WAF rules
   */
  WAFDisabledRules?: string[];
  /**
   * Determines if WAF should enable request headers logging
   */
  WAFEnableRequestHeaderLogging?: boolean;
  /**
   * Determines the list of headers that will be ignored in the WAF logs
   */
  WAFRequestHeaderIgnores?: string[];
  /**
   * Determines if custom error page code should be enabled.
   */
  ErrorPageEnableCustomCode?: true;
  /**
   * Contains the custom error page code that will be returned
   */
  ErrorPageCustomCode?: string;
  /**
   * Determines if the statuspage widget should be displayed on the error pages
   */
  ErrorPageEnableStatuspageWidget?: boolean;
  /**
   * The statuspage code that will be used to build the status widget
   */
  ErrorPageStatuspageCode?: string;
  /**
   * Determines if the error pages should be whitelabel or not
   */
  ErrorPageWhitelabel?: boolean;
  /**
   * Determines if the optimizer should be enabled for this zone
   */
  OptimizerEnabled?: boolean;
  /**
   * Determines the maximum automatic image size for desktop clients
   */
  OptimizerDesktopMaxWidth?: number;
  /**
   * Determines the maximum automatic image size for mobile clients
   */
  OptimizerMobileMaxWidth?: number;
  /**
   * Determines the image quality for desktop clients
   */
  OptimizerImageQuality?: number;
  /**
   * Determines the image quality for mobile clients
   */
  OptimizerMobileImageQuality?: number;
  /**
   * Determines if the WebP optimization should be enabled
   */
  OptimizerEnableWebP?: boolean;
  /**
   * Determines the image manipulation should be enabled
   */
  OptimizerEnableManipulationEngine?: boolean;
  /**
   * Determines if the CSS minification should be enabled
   */
  OptimizerMinifyCSS?: boolean;
  /**
   * Determines if the JavaScript minification should be enabled
   */
  OptimizerMinifyJavaScript?: boolean;
  /**
   * Determines if image watermarking should be enabled
   */
  OptimizerWatermarkEnabled?: boolean;
  /**
   * Sets the URL of the watermark image
   */
  OptimizerWatermarkUrl?: string;
  /**
   * Sets the position of the watermark image
   */
  OptimizerWatermarkPosition?: number;
  /**
   * Sets the offset of the watermark image
   */
  OptimizerWatermarkOffset?: number;
  /**
   * Sets the minimum image size to which the watermark will be added
   */
  OptimizerWatermarkMinImageSize?: number;
  /**
   * Determines if the automatic image optimization should be enabled
   */
  OptimizerAutomaticOptimizationEnabled?: boolean;
  /**
   * Determines the list of optimizer classes
   */
  OptimizerClasses?: OptimizerClass[];
  /**
   * Determines if the optimizer classes should be forced
   */
  OptimizerForceClasses?: boolean;
  /**
   * The type of the pull zone.
   *
   * Premium = 0
   *
   * Volume = 1
   */
  Type?: PullZoneType;
  /**
   * The number of retries to the origin server
   */
  OriginRetries?: number;
  /**
   * The amount of seconds to wait when connecting to the origin. Otherwise the request will fail or retry.
   */
  OriginConnectTimeout?: number;
  /**
   * The amount of seconds to wait when waiting for the origin reply. Otherwise the request will fail or retry.
   */
  OriginResponseTimeout?: number;
  /**
   * Determines if we should use stale cache while cache is updating
   */
  UseStaleWhileUpdating?: boolean;
  /**
   * Determines if we should use stale cache while the origin is offline
   */
  UseStaleWhileOffline?: boolean;
  /**
   * Determines if we should retry the request in case of a 5XX response.
   */
  OriginRetry5XXResponses?: boolean;
  /**
   * Determines if we should retry the request in case of a connection timeout.
   */
  OriginRetryConnectionTimeout?: boolean;
  /**
   * Determines if we should retry the request in case of a response timeout.
   */
  OriginRetryResponseTimeout?: boolean;
  /**
   * Determines the amount of time that the CDN should wait before retrying an origin request.
   */
  OriginRetryDelay?: number;
  /**
   * Determines the origin port of the pull zone.
   */
  DnsOriginPort?: number;
  /**
   * Determines the origin scheme of the pull zone.
   */
  DnsOriginScheme?: string;
  /**
   * Contains the list of vary parameters that will be used for vary cache by query string. If empty, all parameters will be used to construct the key
   */
  QueryStringVaryParameters?: string[];
  /**
   * Determines if the origin shield concurrency limit is enabled.
   */
  OriginShieldEnableConcurrencyLimit?: boolean;
  /**
   * Determines the number of maximum concurrent requests allowed to the origin.
   */
  OriginShieldMaxConcurrentRequests?: number;
  /**
   * Determines if the Cookie Vary feature is enabled.
   */
  EnableCookieVary?: boolean;
  /**
   * Contains the list of vary parameters that will be used for vary cache by cookie string. If empty, cookie vary will not be used.
   */
  CookieVaryParameters?: string[];
  /**
   * Determines if the SafeHop is enabled.
   */
  EnableSafeHop?: boolean;
  /**
   * Determines the max queue wait time
   */
  OriginShieldQueueMaxWaitTime?: number;
  /**
   * Determines the max number of origin requests that will remain in the queue
   */
  OriginShieldMaxQueuedRequests?: number;
  /**
   * Determines if cache update is performed in the background.
   */
  UseBackgroundUpdate?: boolean;
  /**
   * If set to true, any hostnames added to this Pull Zone will automatically enable SSL.
   */
  EnableAutoSSL?: boolean;
  /**
   * Sets the log anonymization type for this pull zone
   */
  LogAnonymizationType?: number;
  /**
   * The ID of the storage zone that will be used as the origin
   */
  StorageZoneId?: number;
  /**
   * The ID of the edge script that will be used as the origin
   */
  EdgeScriptId?: number;
  /**
   * Determine the type of the origin for this Pull Zone
   */
  OriginType?: number;
  MagicContainersAppId?: string;
  LogForwardingFormat?: number;
  ShieldDDosProtectionType?: number;
  ShieldDDosProtectionEnabled?: boolean;
  /**
   * Sets the host header that will be sent to the origin
   */
  OriginHostHeader?: string;
  EnableSmartCache?: boolean;
  /**
   * Determines if request coalescing is currently enabled.
   */
  EnableRequestCoalescing?: boolean;
  /**
   * Determines the lock time for coalesced requests.
   */
  RequestCoalescingTimeout?: number;
  /**
   * If set to true, the built-in let's encrypt will be disabled and requests are passed to the origin.
   */
  DisableLetsEncrypt?: boolean;
  /**
   * Determines if Bunny Image AI is currently enabled.
   */
  EnableBunnyImageAi?: boolean;
  BunnyAiImageBlueprints?: BunnyAiImageBlueprints[];
  /**
   * Determines if the preloading screen is currently enabled
   */
  PreloadingScreenEnabled?: boolean;
  /**
   * The custom preloading screen code
   */
  PreloadingScreenCode?: string;
  /**
   * The preloading screen logo URL
   */
  PreloadingScreenLogoUrl?: string;
  /**
   * The currently configured preloading screen theme. (0 - Light, 1 - Dark)
   */
  PreloadingScreenTheme?: PreloadingScreenTheme;
  /**
   * The delay in milliseconds after which the preloading screen will be displayed (0 - 10000ms)
   */
  PreloadingScreenDelay?: number;
  /**
   * The list of routing filters enabled for this zone
   */
  RoutingFilters?: string[];
  /**
   * The name of the pull zone.
   */
  Name: string;
}

/**
 * Preloading screen theme
 *
 * 0 - Light
 *
 * 1 - Dark
 */
export type PreloadingScreenTheme = 0 | 1;

export interface BunnyAiImageBlueprints {
  Name: string;
  properties: Record<string, string>;
}

/**
 * The type of the pull zone.
 *
 * Premium = 0
 *
 * Volume = 1
 */
export type PullZoneType = 0 | 1;

export interface OptimizerClass {
  /**
   * The name of the optimizer class that will be used in the query string
   */
  Name: string;
  /**
   * The list of settings and values the class will send to the optimizer
   */
  properties: string;
}

export type AddPullZoneResponse = void;

export const addPullZone = u
  .input<AddPullZoneRequest>()
  .output<AddPullZoneResponse>();

const options: RequestInit = {
  headers: {
    "content-type": "application/octet-stream",
  },
  method: "PUT",
};

export const addPullZoneEndpoints = {
  addPullZone: "addPullZone",
  "POST /pullzone": "POST /pullzone",
} as const;

export async function addPullZoneClient(
  defaultRequestInit: RequestInit,
  input: AddPullZoneRequest
): Promise<AddPullZoneResponse> {
  console.log(input);
  // Const overrideOptions: RequestInit = {
  //   body: file,
  //   headers: {
  //     ...(storageZonePassword && { AccessKey: storageZonePassword }),
  //   },
  // };
  // const fullPath = normalize(`${storageZoneName}/${path}/${fileName}`, false);
  // const overrideUrl = `https://${storageZoneEndpoint}/${fullPath}`;
  // const response = await fetch(
  //   overrideUrl,
  //   deepmerge(defaultRequestInit, options, overrideOptions)
  // );
  // if (!response.ok) {
  //   throw new FetchError(response.status, response.statusText, response);
  // }
}
