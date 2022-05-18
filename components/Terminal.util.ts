export const submitPrompt = async (prompt: string) => {
  const initialPrompt =
    '\nYou: How do I combine arrays?\nJavaScript chatbot: You can use the concat() method.\n\nYou: How?\n\nJavaScript chatbot:\nJS:var firstArray = [1, 2, 3];\nvar secondArray = firstArray.concat(4);\n\nYou:  How do you make an alert appear after 10 seconds?\n\nJavaScript chatbot:\nJS:var timer = setInterval(function(){\nalert("Hello, world!");\n}, 10);\n\nYou: Find the largest number in an array.\n\nJavaScript chatbot:\n\nvar largestNumber = Math.max(arr[0], arr[1]);\nYou: What is the reduce function used for?\n\nJavaScript chatbot:\n\nThe reduce function is used to reduce an array of data. It takes two arguments: the first is the initial value, and the second is the reducer function.\nYou: Find the median of an array.\n\nJavaScript chatbot:\n\nvar median = arr.reduce(function(a, b) {\nreturn a + b / 2;\n}, 0);\n';
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `${initialPrompt}\nYou: ${prompt.trim()}\n`,
    }),
  });
  if (response.ok) {
    return response.json();
  }

  throw new Error('Uncaught Error :(');
};

// Scroll the latest response into view
export const updateScrollPosition = () => {
  const history = document.getElementById('history');
  if (!history) {
    return;
  }

  const responses = history.querySelectorAll(':scope > div');
  const lastResponse = responses.length ? responses[responses.length - 1] : undefined;
  if (lastResponse) {
    lastResponse.scrollIntoView();
  }
};
