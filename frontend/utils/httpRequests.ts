export const putUser = (customer) => {
  return fetch(`http://localhost:5000/api/v1/customer`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer),
  }).then((res) => res.json());
};
