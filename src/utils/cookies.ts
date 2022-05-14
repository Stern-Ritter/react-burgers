export function setCookie(
  name: string,
  value: string | null,
  props: Record<string, any> = {}
) {
  props = {
    path: "/",
    ...props,
  };

  let expires = props.expires;

  if (expires && typeof expires === "number") {
    const date = new Date();
    date.setTime(date.getTime() + expires * 1000);
    expires = props.expires = date;
  }

  if (expires && expires instanceof Date) {
    props.expires = expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value ?? "");
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}
