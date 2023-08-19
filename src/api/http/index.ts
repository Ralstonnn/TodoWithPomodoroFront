export type GetParams = {
  params?: any;
  headers?: any;
} | null;

export class $http {
  static BASE_URL = import.meta.env.VITE_API_URL + "/api/v1";
  static BASE_HEADERS = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };
  static async get(endpoint: string, data: GetParams = null) {
    let url = this.BASE_URL + endpoint;
    if (data && data.params) url += "?" + new URLSearchParams(data.params);
    const headers =
      data && data.headers
        ? { ...this.BASE_HEADERS, ...data.headers }
        : this.BASE_HEADERS;
    return (
      await fetch(url, {
        method: "GET",
        headers: headers,
      })
    ).json();
  }
  static async post(
    endpoint: string,
    body: { [key: string]: any },
    headers: any | null = null
  ) {
    const headersObj = headers
      ? { ...this.BASE_HEADERS, ...headers }
      : this.BASE_HEADERS;
    return (
      await fetch(this.BASE_URL + endpoint, {
        method: "POST",
        headers: headersObj,
        body: JSON.stringify(body),
      })
    ).json();
  }
  static async put(
    endpoint: string,
    body: { [key: string]: any },
    headers: any | null = null
  ) {
    const headersObj = headers
      ? { ...this.BASE_HEADERS, ...headers }
      : this.BASE_HEADERS;
    return (
      await fetch(this.BASE_URL + endpoint, {
        method: "PUT",
        headers: headersObj,
        body: JSON.stringify(body),
      })
    ).json();
  }
  static async delete(endpoint: string, data: GetParams = null) {
    let url = this.BASE_URL + endpoint;
    if (data && data.params) url += "?" + new URLSearchParams(data.params);
    const headers =
      data && data.headers
        ? { ...this.BASE_HEADERS, ...data.headers }
        : this.BASE_HEADERS;
    return (
      await fetch(url, {
        method: "DELETE",
        headers: headers,
      })
    ).json();
  }
}
