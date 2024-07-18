from langflow.load import run_flow_from_json
TWEAKS = {
  "Prompt-AWxmv": {
    "context": "",
    "template": "You are a smart assistant integrated into a Chrome extension designed to assist users, including those with learning disabilities such as ADHD and dyslexia, in understanding and focusing on web content. Your task is to fetch the content of the current webpage and provide a user-friendly summary, highlight important points, and generate quiz questions based on the content. Additionally, you should suggest areas of improvement based on the user's performance on the quiz.\n\n\n2.⁠ ⁠*Content Summarization*:\n   - Fetch the entire content of the current webpage.\n   - Generate a concise summary of the main ideas and important points.\n   - Ensure the summary is clear and accessible for users with learning disabilities.\n\n\n\nExample Interaction:\n\n. *Content Summarization*:\n   - \"Here is a summary of the main points from this webpage: [Summary].\"\n   - \"Important points to note: [Key Points].\"\n\n3*Quiz Generation*:\n   - \"Let's test your understanding with a few questions: [Quiz Questions].\"\n\n4.⁠ ⁠*Focus and Engagement*:\n   - \"Remember to take breaks if you feel distracted. Here's a tip to stay focused: [Tip].\"\n\n\n\nContext: {context}"
  },
  "ChatOutput-vdzx1": {
    "data_template": "{text}",
    "input_value": "",
    "sender": "Machine",
    "sender_name": "AI",
    "session_id": "",
    "should_store_message": True
  },
  "Memory-fIU6f": {
    "n_messages": 100,
    "order": "Ascending",
    "sender": "Machine and User",
    "sender_name": "",
    "session_id": "",
    "template": "{sender_name}: {text}"
  },
  "OllamaModel-4pYO0": {
    "base_url": "http://localhost:11434",
    "format": "",
    "input_value": "",
    "metadata": {},
    "mirostat": "Disabled",
    "mirostat_eta": None,
    "mirostat_tau": None,
    "model": "llama3:latest",
    "num_ctx": None,
    "num_gpu": None,
    "num_thread": None,
    "repeat_last_n": None,
    "repeat_penalty": None,
    "stop_tokens": "",
    "stream": True,
    "system": "",
    "system_message": "",
    "tags": "",
    "temperature": 0.2,
    "template": "",
    "tfs_z": None,
    "timeout": None,
    "top_k": None,
    "top_p": None,
    "verbose": True
  },
  "TextInput-aE1Ut": {
    "input_value": "Bayesian probability (/ˈbeɪziən/ BAY-zee-ən or /ˈbeɪʒən/ BAY-zhən)[1] is an interpretation of the concept of probability, in which, instead of frequency or propensity of some phenomenon, probability is interpreted as reasonable expectation[2] representing a state of knowledge[3] or as quantification of a personal belief.[4]\n\nThe Bayesian interpretation of probability can be seen as an extension of propositional logic that enables reasoning with hypotheses;[5][6] that is, with propositions whose truth or falsity is unknown. In the Bayesian view, a probability is assigned to a hypothesis, whereas under frequentist inference, a hypothesis is typically tested without being assigned a probability.\n\nBayesian probability belongs to the category of evidential probabilities; to evaluate the probability of a hypothesis, the Bayesian probabilist specifies a prior probability. This, in turn, is then updated to a posterior probability in the light of new, relevant data (evidence).[7] The Bayesian interpretation provides a standard set of procedures and formulae to perform this calculation.\n\nThe term Bayesian derives from the 18th-century mathematician and theologian Thomas Bayes, who provided the first mathematical treatment of a non-trivial problem of statistical data analysis using what is now known as Bayesian inference.[8]: 131  Mathematician Pierre-Simon Laplace pioneered and popularized what is now called Bayesian probability.[8]: 97–98 "
  }
}

result = run_flow_from_json(flow="flow_model.json",
                            input_value="message",
                            fallback_to_env_vars=True, # False by default
                            tweaks=TWEAKS)
