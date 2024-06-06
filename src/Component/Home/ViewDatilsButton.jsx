import { Button } from 'flowbite-react';
import React, { useState } from 'react';

const ViewDatilsButton = ({articleId}) => {
  const [count, setCount] = useState("1");
  const id=articleId;
  
  const handleCount = () =>{
    fetch(`http://localhost:5000/blog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ count: count })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Count updated successfully:', data);
    })
    .catch(error => {
      console.error('There was a problem updating the count:', error);
    });
  };
    return (
        <div>
            <Button onClick={handleCount}>
              Read more
              <svg
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
        </div>
    );
};

export default ViewDatilsButton;