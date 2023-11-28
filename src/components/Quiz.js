import React, { useEffect, useState } from "react";
import './Quiz.css'

const Quiz= () => {
    const[show,setshow]=useState(true);
    const[quiz,setquiz]=useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(Array(10).fill(''));
    const [marks, setMarks] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const getQuiz=async()=>{
        const response=await fetch("quiz.json");
        const result=await response.json();
        setquiz(result);
    }
    useEffect(()=>{
        getQuiz();
    },[]);
    
    const checkAnswer = (question, selected,idx,index) => {
        const Answer=[...selectedAnswer];
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[idx] = index;
        setSelectedOptions(newSelectedOptions);
        // event.target.style.cssText="background-color:#00308F;color:white ;"
        if(Answer[idx] === " "){
            Answer[idx] = selected;
            setSelectedAnswer(Answer);
            if (selected === question.answer) {
                setMarks(marks + 5);
            } 
        }else if(Answer[idx]===question.answer){
            if(selected !== question.answer){
                setMarks(marks-5);
                Answer[idx]=selected;
                setSelectedAnswer(Answer);
            }
        }else if(Answer[idx]!==question.answer){
            Answer[idx]=selected;
            setSelectedAnswer(Answer);
            if(selected === question.answer){
                setMarks(marks + 5);
            }
        }
        // console.log("index of Answer",idx);
        // console.log("array of answers", selectedAnswer); 
        // console.log("score",marks);
    }
    const showResult=()=>{
        setshow(false);
    }
    const startQuiz=()=>{
        setshow(true);
        setMarks(0);
        setSelectedAnswer(Array(10).fill(''));
    }
    return(
        <>
            <div className="quiz-box my-3 p-4 text-white">
                <h2><strong>Marks: </strong>{marks}</h2>
                {
                    show?
                    quiz?quiz.map((question,idx)=>{
                        return(
                            <div className="single-question mt-5" key={idx}>
                                <h6><span className="me-2">Q.{question.id}</span>{question.question}</h6>
                            {
                            question?.options?.map((item, index) => 
                                <button
                                    key={index}
                                    className={`option w-100 text-start  py-2 px-3 mt-3 rounded ${selectedOptions[idx] === index ? 'selected' : ''}`}
                                    
                                    onClick={() => checkAnswer(question,item,idx,index)}
                                >
                                {item}
                                </button>
                            )}
                            </div>
                        )      
                    })                
                    :"No Quiz"                    
                    :
                    <div className="quiz-result">
                       <strong>Score:{marks}/50</strong>
                    </div>
                
                }
                {
                    show?
                    <button onClick={()=>showResult()}>Submit</button>
                    :
                    <button onClick={()=>startQuiz()}>Restart Quiz</button>
                }
            </div>
        </>
    );
}
export default Quiz