export enum Pages {
  SignIn = "signin",
  Settings = "settings",
  Home = "home",
  Logout = "logout",
  Comments = "comments",
  About = "about",
}

export function getCommentsPagePath(searchState: string) {
  return `/comments?site=${encodeURIComponent(searchState)}`;
}
