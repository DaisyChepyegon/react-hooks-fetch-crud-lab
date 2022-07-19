import React,{useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuesions] = useState ([]);
  
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((resp) => resp.json())
    .then((questions) => {
      setQuesions(questions)
    })
  }, [])

  function handleDelete(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
    . then((resp) => resp.json())
    .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id)
      setQuesions(updatedQuestions)
    })
  }

  function handleChange(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex})
    })
    .then((resp) => resp.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((q) => {
        if(q.id === updatedQuestion.id) return updatedQuestion;
        return q;
      })
      setQuesions(updatedQuestions)
    })
  }

  const questionItems = questions.map((q) =>(
    <QuestionItem
      key={q.id}
      question={q}
      onDelete={handleDelete}
      onChange={handleChange}
    />
  ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
