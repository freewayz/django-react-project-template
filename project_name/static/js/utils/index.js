import { TextDecoder } from 'text-encoding';

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText)
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  return response.json();
}

export function getResponseBody(reader) {
  let body = '';
  let decoder = new TextDecoder();
  return reader.read().then((result) => {
    body += decoder.decode(result.value || new Uint8Array, {
      stream: !result.done
    });
    return JSON.parse(body);
  });
}
