# Langflow API connection

To start you need to create a new instance of the class object

````bash
const Test = new LangflowClient(
  "http://127.0.0.1:7860/api/v1/run",
  "Replace this with your langflow API key"
);```

# API Calls

```bash const response = await Test.runFlow(
        "5a1a9a3f-1d80-4880-aab7-bd495a8df67f",
        inputValue,
        tweaks,
        false,
        (data) => console.log("Received:", data), // onUpdate callback
        (message) => console.log("Stream Closed:", message), // onClose callback
        (error) => setError(`Stream Error: ${error}`) // onError callback
      );`

# Response

The response is sorted here
```bash response.outputs[0].outputs[0].outputs.message.text```s
````
