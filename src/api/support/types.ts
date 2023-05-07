// See also https://developer.zendesk.com/api-reference/ticketing/introduction/

export interface User {
  /**
   * User alias
   * @example null
   * @example "Tomas"
   */
  Alias: string | null;
  /**
   * User external id
   * @example "c2fbdbcf-0961-4a89-b818-edf3ad7456e3"
   * @example null
   */
  ExternalId: string | null;
  /**
   * User display name
   * @example "User 456e3"
   * @example "Tomas"
   */
  Name: string;
  /**
   * User profile picture url
   * @example "https://www.gravatar.com/avatar/8292f524bb616e5a1b49351761de6a74?d=https%3A%2F%2Fbunnynet-avatars.b-cdn.net%2F.ai%2Fimg%2Fdalle-256%2Favatar%2F8292f524bb616e5a1b49351761de6a74%2Frabbit.jpg%3Ftoken%3Db6R6-nsuF6kT0SIsEWblocQ8B_GLmmkhF1IDuZbcw6E%26expires%3D19132025855"
   * @example "https://bunnycdn.zendesk.com/system/photos/7706916107548/tomas-support.png"
   */
  PhotoUrl: string;
  /**
   * User role
   * @example "end-user"
   * @example "agent"
   */
  Role: string;
  /**
   * User signature
   * @example null
   * @example "Best Regards,\nTomas\n\nbunny.net\nhttps://bunny.net",
   */
  Signature: string | null;
  /**
   * User is email verified
   * @example true
   */
  Verified: boolean;
}

export interface Attachment {
  /**
   * [Content-Type](https://web.archive.org/web/20230429020308/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) of the attachment, see also [MIME Types](https://web.archive.org/web/20230429020146/https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
   * @example "text/plain"
   */
  ContentType: "text/plain";
  /**
   * Url to download the attachment (BUG: corrupted file returned)
   * @example "https://bunnycdn.zendesk.com/attachments/token/27ZaTyB7eg2ceSSKNr60zZbvG/?name=steps.txt"
   */
  ContentUrl: string;
  // TODO: attachments are base64 encoded https://toshy.github.io/BunnyNet-PHP/base-api/#list-tickets
  /**
   * Attachment file name (BUG: trailing space)
   * @example "steps.txt "
   */
  FileName: string;
  /**
   * Attachment id
   * @example 8617793197852
   */
  Id: number;
  /**
   * Size of the file in bytes
   * @example 42
   */
  Size: number;
  /**
   * Attachment thumbnail previews (can be empty)
   * @example []
   */
  Thumbnails: string[];
}

export interface CreateAttachment {
  // TODO: attachments are base64 encoded https://toshy.github.io/BunnyNet-PHP/base-api/#list-tickets
  /**
   * The body, or content, of the attachment
   * @example "Steps to reproduce the issue:"
   */
  Body: string;
  /**
   * [Content-Type](https://web.archive.org/web/20230429020308/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) of the attachment, see also [MIME Types](https://web.archive.org/web/20230429020146/https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
   * @example "text/plain"
   */
  ContentType: string;
  /**
   * File name of the attachment
   * @example "reproduction.txt"
   */
  FileName: string;
}

export interface Comment {
  /**
   * File attachments
   */
  Attachments: Attachment[];
  /**
   * Comment author id
   * @example 8600481430684
   */
  AuthorId: number;
  /**
   * Comment body
   * @example "My videos are buffering"
   * @example "Hello,\n\nThank you for contacting bunny.net.\n\nIf there is something we can assist you with, do not hesitate to let us know.\n\nBest Regards,\nTomas\n\nbunny.net\nhttps://bunny.net"
   */
  Body: string;
  /**
   * ISO 8601 date and time comment created at
   * @example "2023-04-29T02:42:01"
   */
  CreatedAt: string;
  /**
   * Comment html body
   * @example "<div class="zd-comment" dir="auto"><p dir="auto">My videos are buffering</p></div>"
   * @example "<div class=\"zd-comment\" dir=\"auto\">Hello,<br><br>Thank you for contacting bunny.net.<br><br>If there is something we can assist you with, do not hesitate to let us know.<br>\n\n<span class=\"collapse-signature\"></span><div class=\"signature\"><p dir=\"auto\">Best Regards,<br>\nTomas</p>\n<p dir=\"auto\">bunny.net<br>\n<a href=\"https://bunny.net\" rel=\"noreferrer\">https://bunny.net</a></p></div></div>"
   */
  HtmlBody: string;
  /**
   * Comment id
   * @example 8617221600540
   */
  Id: number;
  /**
   * Is comment public
   * @example true
   */
  Public: boolean;
  /**
   * Comment type
   * @example "Comment"
   */
  Type: string;
  /**
   * User object related to the comment
   */
  User: User;
}

export interface Ticket {
  /**
   * Ticket comments
   */
  Comments: Comment[];
  /**
   * ISO 8601 date and time ticket created at
   * @example "2023-04-29T02:42:01"
   */
  CreatedAt: string;
  /**
   * Ticket id
   * @example 196584
   */
  Id: number;
  /**
   * ISO 8601 date and time ticket last updated at
   * @example "2023-04-29T02:42:01Z"
   */
  LastUpdatedAt: string;
  /**
   * Ticket status
   * @example "new"
   * @example "open"
   * @example "solved"
   * @example "deleted"
   * @example "closed"
   */
  Status: string;
  /**
   * Ticket subject
   * @example "Stream"
   */
  Subject: string | null;
}

export type Department =
  | "Billing"
  | "CDN"
  | "Edge Storage"
  | "Feedback"
  | "Optimizer"
  | "Sales"
  | "Stream";

export type IssueCategory = "General" | "Other" | "Troubleshooting";

export type CommonUseCases = Record<
  Department,
  Partial<Record<IssueCategory, Record<string, string>>>
>;

/* eslint-disable @typescript-eslint/naming-convention */
export const commonUseCases = {
  Billing: {
    General: {
      "I have a billing question": "I have a billing question",
    },
    Other: { "I have a different issue": "I have a different issue" },
    Troubleshooting: {
      "I am unable to submit a payment": "I am unable to submit a payment",
    },
  },
  CDN: {
    General: {
      "I have technical questions": "I have technical questions",
      "I need help with configuration": "I need help with configuration",
    },
    Other: {
      "I am missing a feature": "I am missing a feature",
      "I have a different issue": "I have a different issue",
    },
    Troubleshooting: {
      "I am being routed incorrectly": "I am being routed incorrectly",
      "I am experiencing 502/504 errors": "I am experiencing 502/504 errors",
      "I am experiencing slow download speeds":
        "I am experiencing slow download speeds",
      "I cannot reach the bunny.net network":
        "I cannot reach the bunny.net network",
      "My website is slow": "My website is slow",
    },
  },
  "Edge Storage": {
    General: {
      "I have technical questions": "I have technical questions",
      "I need help with configuration": "I need help with configuration",
      "I want to disable a replicated region":
        "I want to disable a replicated region",
    },
    Other: {
      "I am missing a feature": "I am missing a feature",
      "I have a different issue": "I have a different issue",
    },
    Troubleshooting: {
      "I am having issues downloading files":
        "I am having issues downloading files",
      "I am having issues uploading files":
        "I am having issues uploading files",
      "I am seeing 502 errors from the CDN":
        "I am seeing 502 errors from the CDN",
    },
  },
  Feedback: {
    General: {
      "I love bunny.net 🐰": "I love bunny.net 🐰",
      "I want to submit a bug": "I want to submit a bug",
      "I want to submit a complaint": "I want to submit a complaint",
      "I want to submit a feature request":
        "I want to submit a feature request",
    },
  },
  Optimizer: {
    General: {
      "I have technical questions": "I have technical questions",
      "I need help with configuration": "I need help with configuration",
    },
    Other: {
      "I am missing a feature": "I am missing a feature",
      "I have a different issue": "I have a different issue",
    },
    Troubleshooting: {
      "CSS/JS files are not being minimized correctly":
        "CSS/JS files are not being minimized correctly",
      "Image processing is not working correctly":
        "Image processing is not working correctly",
    },
  },
  Sales: {
    General: {
      "I am looking for a partnership": "I am looking for a partnership",
      "I am looking for premium support options":
        "I am looking for premium support options",
      "I need custom features or configuration":
        "I need custom features or configuration",
      "I need help with a big project": "I need help with a big project",
      "I want a custom quote": "I want a custom quote",
    },
    Other: {
      "I have a different question": "I have a different question",
    },
  },
  Stream: {
    General: {
      "I have technical questions": "I have technical questions",
      "I need help with configuration": "I need help with configuration",
    },
    Other: {
      "I am missing a feature": "I am missing a feature",
      "I have a different issue": "I have a different issue",
    },
    Troubleshooting: {
      "My videos are buffering": "My videos are buffering",
      "My videos are not playing": "My videos are not playing",
      "My videos are not processing": "My videos are not processing",
    },
  },
} as const;
/* eslint-enable @typescript-eslint/naming-convention */
