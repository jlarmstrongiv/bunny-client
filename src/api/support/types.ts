// see also https://developer.zendesk.com/api-reference/ticketing/introduction/

export interface User {
  /**
   * user display name
   * @example "User 456e3"
   * @example "Tomas"
   */
  Name: string;
  /**
   * user external id
   * @example "c2fbdbcf-0961-4a89-b818-edf3ad7456e3"
   * @example null
   */
  ExternalId: string | null;
  /**
   * user alias
   * @example null
   * @example "Tomas"
   */
  Alias: null | string;
  /**
   * user is email verified
   * @example true
   */
  Verified: boolean;
  /**
   * user signature
   * @example null
   * @example "Best Regards,\nTomas\n\nbunny.net\nhttps://bunny.net",
   */
  Signature: null | string;
  /**
   * user role
   * @example "end-user"
   * @example "agent"
   */
  Role: string;
  /**
   * user profile picture url
   * @example "https://www.gravatar.com/avatar/8292f524bb616e5a1b49351761de6a74?d=https%3A%2F%2Fbunnynet-avatars.b-cdn.net%2F.ai%2Fimg%2Fdalle-256%2Favatar%2F8292f524bb616e5a1b49351761de6a74%2Frabbit.jpg%3Ftoken%3Db6R6-nsuF6kT0SIsEWblocQ8B_GLmmkhF1IDuZbcw6E%26expires%3D19132025855"
   * @example "https://bunnycdn.zendesk.com/system/photos/7706916107548/tomas-support.png"
   */
  PhotoUrl: string;
}

export interface Attachment {
  /**
   * url to download the attachment (BUG: corrupted file returned)
   * @example "https://bunnycdn.zendesk.com/attachments/token/27ZaTyB7eg2ceSSKNr60zZbvG/?name=steps.txt"
   */
  ContentUrl: string;
  /**
   * [Content-Type](https://web.archive.org/web/20230429020308/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) of the attachment, see also [MIME Types](https://web.archive.org/web/20230429020146/https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
   * @example "text/plain"
   */
  ContentType: "text/plain";
  /**
   * size of the file in bytes
   * @example 42
   */
  Size: number;
  /**
   * attachment thumbnail previews (can be empty)
   * @example []
   */
  Thumbnails: string[];
  /**
   * attachment file name (BUG: trailing space)
   * @example "steps.txt "
   */
  FileName: string;
  /**
   * attachment id
   * @example 8617793197852
   */
  Id: number;
}

export interface CreateAttachment {
  /**
   * the body, or content, of the attachment
   * @example "Steps to reproduce the issue:"
   */
  Body: string;
  /**
   * file name of the attachment
   * @example "reproduction.txt"
   */
  FileName: string;
  /**
   * [Content-Type](https://web.archive.org/web/20230429020308/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) of the attachment, see also [MIME Types](https://web.archive.org/web/20230429020146/https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
   * @example "text/plain"
   */
  ContentType: string;
}

export interface Comment {
  /**
   * comment id
   * @example 8617221600540
   */
  Id: number;
  /**
   * comment type
   * @example "Comment"
   */
  Type: string;
  /**
   * comment body
   * @example "My videos are buffering"
   * @example "Hello,\n\nThank you for contacting bunny.net.\n\nIf there is something we can assist you with, do not hesitate to let us know.\n\nBest Regards,\nTomas\n\nbunny.net\nhttps://bunny.net"
   */
  Body: string;
  /**
   * comment html body
   * @example "<div class="zd-comment" dir="auto"><p dir="auto">My videos are buffering</p></div>"
   * @example "<div class=\"zd-comment\" dir=\"auto\">Hello,<br><br>Thank you for contacting bunny.net.<br><br>If there is something we can assist you with, do not hesitate to let us know.<br>\n\n<span class=\"collapse-signature\"></span><div class=\"signature\"><p dir=\"auto\">Best Regards,<br>\nTomas</p>\n<p dir=\"auto\">bunny.net<br>\n<a href=\"https://bunny.net\" rel=\"noreferrer\">https://bunny.net</a></p></div></div>"
   */
  HtmlBody: string;
  /**
   * is comment public
   * @example true
   */
  Public: boolean;
  /**
   * comment author id
   * @example 8600481430684
   */
  AuthorId: number;
  /**
   * ISO 8601 date and time comment created at
   * @example "2023-04-29T02:42:01"
   */
  CreatedAt: string;
  /**
   * user object related to the comment
   */
  User: User;
  /**
   * file attachments
   */
  Attachments: Attachment[];
}

export interface Ticket {
  /**
   * ticket id
   * @example 196584
   */
  Id: number;
  /**
   * ticket status
   * @example "new"
   * @example "open"
   * @example "solved"
   * @example "deleted"
   * @example "closed"
   */
  Status: string;
  /**
   * ticket comments
   */
  Comments: Comment[];
  /**
   * ticket subject
   * @example "Stream"
   */
  Subject: null | string;
  /**
   * ISO 8601 date and time ticket created at
   * @example "2023-04-29T02:42:01"
   */
  CreatedAt: string;
  /**
   * ISO 8601 date and time ticket last updated at
   * @example "2023-04-29T02:42:01Z"
   */
  LastUpdatedAt: string;
}

export type Department =
  | "CDN"
  | "Edge Storage"
  | "Optimizer"
  | "Stream"
  | "Billing"
  | "Sales"
  | "Feedback";

export type IssueCategory = "General" | "Troubleshooting" | "Other";

export type CommonUseCases = Record<
  Department,
  Partial<Record<IssueCategory, Record<string, string>>>
>;

export const commonUseCases = {
  CDN: {
    General: {
      "I need help with configuration": "I need help with configuration",
      "I have technical questions": "I have technical questions",
    },
    Troubleshooting: {
      "I am being routed incorrectly": "I am being routed incorrectly",
      "My website is slow": "My website is slow",
      "I am experiencing 502/504 errors": "I am experiencing 502/504 errors",
      "I am experiencing slow download speeds":
        "I am experiencing slow download speeds",
      "I cannot reach the bunny.net network":
        "I cannot reach the bunny.net network",
    },
    Other: {
      "I have a different issue": "I have a different issue",
      "I am missing a feature": "I am missing a feature",
    },
  },
  "Edge Storage": {
    General: {
      "I need help with configuration": "I need help with configuration",
      "I have technical questions": "I have technical questions",
      "I want to disable a replicated region":
        "I want to disable a replicated region",
    },
    Troubleshooting: {
      "I am having issues uploading files":
        "I am having issues uploading files",
      "I am having issues downloading files":
        "I am having issues downloading files",
      "I am seeing 502 errors from the CDN":
        "I am seeing 502 errors from the CDN",
    },
    Other: {
      "I have a different issue": "I have a different issue",
      "I am missing a feature": "I am missing a feature",
    },
  },
  Optimizer: {
    General: {
      "I need help with configuration": "I need help with configuration",
      "I have technical questions": "I have technical questions",
    },
    Troubleshooting: {
      "Image processing is not working correctly":
        "Image processing is not working correctly",
      "CSS/JS files are not being minimized correctly":
        "CSS/JS files are not being minimized correctly",
    },
    Other: {
      "I have a different issue": "I have a different issue",
      "I am missing a feature": "I am missing a feature",
    },
  },
  Stream: {
    General: {
      "I need help with configuration": "I need help with configuration",
      "I have technical questions": "I have technical questions",
    },
    Troubleshooting: {
      "My videos are not processing": "My videos are not processing",
      "My videos are not playing": "My videos are not playing",
      "My videos are buffering": "My videos are buffering",
    },
    Other: {
      "I have a different issue": "I have a different issue",
      "I am missing a feature": "I am missing a feature",
    },
  },
  Billing: {
    General: {
      "I have a billing question": "I have a billing question",
    },
    Troubleshooting: {
      "I am unable to submit a payment": "I am unable to submit a payment",
    },
    Other: { "I have a different issue": "I have a different issue" },
  },
  Sales: {
    General: {
      "I want a custom quote": "I want a custom quote",
      "I need help with a big project": "I need help with a big project",
      "I need custom features or configuration":
        "I need custom features or configuration",
      "I am looking for a partnership": "I am looking for a partnership",
      "I am looking for premium support options":
        "I am looking for premium support options",
    },
    Other: {
      "I have a different question": "I have a different question",
    },
  },
  Feedback: {
    General: {
      "I want to submit a feature request":
        "I want to submit a feature request",
      "I want to submit a complaint": "I want to submit a complaint",
      "I love bunny.net 🐰": "I love bunny.net 🐰",
      "I want to submit a bug": "I want to submit a bug",
    },
  },
} as const;
