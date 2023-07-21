// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const processButton = document.getElementById('processButton');
  
    processButton.addEventListener('click', async () => {
      const imageUrl = 'https://example.com/image.png'; // Replace with the actual image URL
      const filename = 'image.png'; // Replace with the desired filename
  
      try {
        const response = await fetch('/process-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl, filename }),
        });
  
        if (response.ok) {
          const result = await response.text();
          console.log(result); // Image processed successfully
        } else {
          console.error('Failed to process image:', response.statusText);
        }
      } catch (error) {
        console.error('Error processing image:', error);
      }
    });
  });
  