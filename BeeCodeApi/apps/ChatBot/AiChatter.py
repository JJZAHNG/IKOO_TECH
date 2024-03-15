from openai import OpenAI

class ChatBot:
    def __init__(self):
        self.client = OpenAI()
        self.client.api_key = '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'
        self.messages=[{"role": "system", "content": "You are a helpful assistant."}]

    def get_response(self, prompt):
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=prompt,
        )
        res = response.choices[0].message
        print("Ai-Robot回答： " + res.content)
        self.messages.append({"role": "assistant", "content": res.content})
        return res.content