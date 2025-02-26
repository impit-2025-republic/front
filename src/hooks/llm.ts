import { useState, useCallback } from "react";
//@ts-nocheck
export const useLLM = () => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'ai' | 'system' }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;

    const userMessage = { text: userInput, sender: 'user' };
    //@ts-ignore
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsLoading(true);
    setMessages((prevMessages) => [...prevMessages, { text: '', sender: 'ai' }]);

    try {
      const response = await fetch('https://api.b8st.ru/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream; charset=utf-8',
        },
        body: JSON.stringify({ prompt: userInput }),
      });
      //@ts-ignore
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let responseText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        let lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '[DONE]') break;

          let jsonStr = line.trim();
          try {
            if (jsonStr.startsWith('data: ')) {
              jsonStr = jsonStr.substring(6);
            }
            if (!jsonStr){
                console.log("stop")
            }
            if (jsonStr !== '') {
              const jsonData = JSON.parse(jsonStr);
              
              if (jsonData.choices && jsonData.choices.length > 0 && jsonData.choices[0].text !== null) {
                responseText += jsonData.choices[0].text;
                setMessages((prevMessages) => {
                  const newMessages = [...prevMessages];
                  const lastIndex = newMessages.length - 1;
                  if (lastIndex >= 0 && newMessages[lastIndex].sender === 'ai') {
                    newMessages[lastIndex] = { ...newMessages[lastIndex], text: responseText };
                  }
                  return newMessages;
                });
              }
              if (jsonData.choices && jsonData.choices.length > 0 && jsonData.choices[0].finish_reason === "stop") {
                responseText += jsonData.choices[0].text;
                setMessages((prevMessages) => {
                  const newMessages = [...prevMessages];
                  const lastIndex = newMessages.length - 1;
                  if (lastIndex >= 0 && newMessages[lastIndex].sender === 'ai') {
                    newMessages[lastIndex] = { ...newMessages[lastIndex], text: responseText };
                  }
                  return newMessages;
                });
              }
            }
          } catch (jsonError) {
            console.error('Failed to parse JSON line:', jsonStr, jsonError);
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        const lastIndex = newMessages.length - 1;
        if (lastIndex >= 0 && newMessages[lastIndex].sender === 'ai') {
          newMessages[lastIndex] = {
            text: 'Ошибка: Не удалось подключиться к API. Пожалуйста, попробуйте позже.',
            sender: 'system',
          };
        } else {
          newMessages.push({
            text: 'Ошибка: Не удалось подключиться к API. Пожалуйста, попробуйте позже.',
            sender: 'system',
          });
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, isLoading, sendMessage };
};