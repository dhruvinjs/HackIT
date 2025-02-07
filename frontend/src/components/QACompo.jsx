import { useEffect, useState } from "react";
const QACompo=({qacompo})=>{
    const { question, answer }=qacompo;
    const [ questionClick,setQuestionClick ]=useState(false);
    useEffect(()=>{
        return setQuestionClick(false);
    },[]);
    return(
        <div className="hs-accordion pb-3 mt-4" id="hs-basic-with-title-and-arrow-stretched-heading-one">
        <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between ghap-x-3 w-full md:text-xl font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" aria-expanded="true" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
        onClick={()=>setQuestionClick(!questionClick)}
        >
          {question}
            <svg className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            <svg className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg>
        </button>
        {questionClick && (
            <div id="hs-basic-with-title-and-arrow-stretched-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
            <p className="text-gray-600 dark:text-neutral-400">
               {answer}
            </p>
        </div>
        )}
    </div>
    )
}
export default QACompo