export const urlSlashChecker = (url?: string) => {
  if (!url) {
    return;
  } else if (url[url.length - 1] !== '/') {
    return url + '/';
  }
  return url;
};
