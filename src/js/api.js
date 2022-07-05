export async function getResponse() {
  let response = await fetch(
    "https://62b4de4cda3017eabb120a85.mockapi.io/Post"
  );
  let products = await response.json();
  return (products = products.splice(0, 12));
}
