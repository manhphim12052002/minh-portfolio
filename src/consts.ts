import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Minh Pham",
  EMAIL: "ngocminhpham@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 1,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Minh Pham — building quiet software, one careful detail at a time.",
};

export const BLOG: Metadata = {
  TITLE: "Writing",
  DESCRIPTION: "Notes, essays, and the occasional talk.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I've shipped, and what I learned doing it.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "Small things I've built on the side.",
};

export const SOCIALS: Socials = [
  {
    NAME: "twitter-x",
    HREF: "https://x.com/MinhPham960831",
  },
  {
    NAME: "threads",
    HREF: "https://www.threads.net/@manhphim",
  },
  {
    NAME: "github",
    HREF: "https://github.com/manhphim"
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/minhpham1205/",
  }
];
