const createPaymentIntent = (data) => {
  return fetch('http://localhost:4002/payment-sheet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
    });
};

export default createPaymentIntent;