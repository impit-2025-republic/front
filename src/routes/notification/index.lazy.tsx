import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "../../components/catalyst/button";
import { useState } from "react";
import { useLLM } from "../../hooks/llm";
import { Input } from "../../components/catalyst/input";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export const Route = createLazyFileRoute("/notification/")({
  component: RouteComponent,
});

function RouteComponent() {

  const { messages, isLoading, sendMessage } = useLLM();
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    sendMessage(input);
    setInput('');
  };
  return (
    <div className="flex flex-col gap-6 items-center text-white w-full">
      <p className="text-3xl">Чат</p>
      <div className="flex flex-col items-start gap-2 mb-24">

      {!!messages && "Задайте вопрос"}
      {messages.map((msg, i) => {
        if (msg.sender === "ai") {
          return (
            <div key={i} className={`message ${msg.sender}`}>
              <p className={``}>
              {msg.text.split('assistant')[1]}
              </p>
            </div>
          );
        }
        return;
      })}
      {isLoading && !messages ? "Загрузка" : ""}
      </div>
      
      <div className="flex flex-row gap-2 justify-center fixed top-auto bottom-18 w-full pr-8 bg-[#191B1F]">
        <Input onChange={(e)=>setInput(e.target.value)} disabled={!!!messages && isLoading} />
        <Button children={<PaperAirplaneIcon color="#fff" />} disabled={!!!messages && isLoading} onClick={() =>{handleSubmit()}} />
      </div>
    </div>
  );
}
