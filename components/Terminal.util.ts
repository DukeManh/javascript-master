export const initialPrompts = [
  {
    prompt: 'You:  How do I combine arrays?',
    result: 'JavaScript chatbot: You can use the concat() method.',
  },
  {
    prompt: 'You: How?',
    result:
      'JavaScript chatbot:\nJS:var firstArray = [1, 2, 3];\nvar secondArray = firstArray.concat(4);',
  },
  {
    prompt: 'You: How do you make an alert appear after 10 seconds?',
    result:
      'JavaScript chatbot:\nJS:var timer = setInterval(function(){\nalert("Hello, world!");\n}, 10);',
  },
  {
    prompt: 'You: What is the reduce function used for?',
    result:
      'JavaScript chatbot:\nThe reduce function is used to reduce an array of data. It takes two arguments: the first is the initial value, and the second is the reducer function.',
  },
  {
    prompt: 'You: Find the median of an array.',
    result:
      'JavaScript chatbot:\nvar median = arr.reduce(function(a, b) {\nreturn a + b / 2;\n}, 0);',
  },
];

export const responseStop = 'JavaScript chatbot:';

export const submitPrompt = async (prompt: string) => {
  const model = initialPrompts.reduce((acc, curr) => {
    return acc.concat(curr.prompt).concat('\n').concat(curr.result).concat('\n');
  }, '');
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `${model}\nYou: ${prompt.trim()}\n`,
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
