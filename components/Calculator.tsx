'use client'

import React, { useState } from 'react'
import style from './Calculator.module.css'
import ScreenResult from './ScreenResult'
function Calculator() {
    let prevInputString : string= ""

    const [inpuString,setInputString] = useState("")
    const [resultString,setResultString] = useState("")
    const handleInput = (e: any) => {
        setInputString((prevInputString) => {
          const updatedInputString = prevInputString + e.target.value;

          console.log(updatedInputString); 
          return updatedInputString;
        });
      };
    
    const doCalculation=(inpuString:String) =>{
        // 2 + 3 * 4 => Queue[2,3,4]; Stack[+,*] ; temporary_container
        const precdence_order: { [key: string]: number } = {
            '*': 1,
            '/': 2,
            '+': 3,
            '-': 4,
          };
        const allowed_operators=['*','/','+','-']
        const operators_stack: any[]=[]
        const operands_stack= []

        for(let i=0;i<inpuString.length;i++)
        {
        
               if(inpuString[i]==="*"|| inpuString[i]==="/"|| inpuString[i]==='+' || inpuString[i]==='-')
            {
                let top_of_stack_index:number=operators_stack.length-1
                let topOfOperandStackIndex:number = operands_stack.length-1
                let size_of_stack=operators_stack.length
                let precedence_rank_current_topStack=precdence_order[operators_stack[top_of_stack_index]]
                let precendence_incoming_operator=precdence_order[inpuString[i]]
                let firstOperand=operands_stack[topOfOperandStackIndex]
                let secondOperand=operands_stack[topOfOperandStackIndex-1]
                if(size_of_stack>0)
                {
                    console.log(`current stack: ${operators_stack}`)
                    console.log(`current size of the stack: ${size_of_stack}`)
                    console.log(`Top of the operator stack ${operators_stack[top_of_stack_index]}`)
                    console.log(`Priority ${precdence_order[inpuString[i]]}`)
                    console.log(`Priority2:  ${precdence_order[operators_stack[top_of_stack_index]]}`)

                    if(precedence_rank_current_topStack<precendence_incoming_operator){
                        let priority_operator=operators_stack.pop()
                        let result=operator_interpration(priority_operator, operands_stack.pop(), operands_stack.pop())
                        operands_stack.push(result)

                        console.log(`Popping ${priority_operator}`)
                        console.log(`Result operand ${result}`)
                        console.log(operands_stack)
                    }             
                }
                operators_stack.push(inpuString[i])

              

             

            }

            if(inpuString[i]!='*'&&inpuString[i]!='/'&&inpuString[i]!='+' &&inpuString[i]!='-')
            {
                operands_stack.push(inpuString[i])
                console.log(`Pushed : ${inpuString[i]} on operands stack`)
                
            }
            
            
        }
        while (operators_stack.length > 0) {
            let priority_operator = operators_stack.pop();
            let result = operator_interpration(priority_operator, operands_stack.pop(), operands_stack.pop());
            operands_stack.push(result);
            console.log(result)
        }

  


        console.log(operands_stack)
        console.log(operators_stack)
        return operands_stack
    }



    const operator_interpration = (operator: any, number1: any, number2: any) => {
        const integerRepresentationOne = parseInt(number1);
        const integerRepresentationTwo = parseInt(number2);
        let result: number = 0;
    
        switch (operator) {
            case '*':
                result = integerRepresentationOne * integerRepresentationTwo;
                break;
            case '/':
                result = integerRepresentationTwo / integerRepresentationOne;
                break;
            
            case '+':
                result = integerRepresentationOne + integerRepresentationTwo;
                break;
            case '-':
                if(integerRepresentationOne < integerRepresentationTwo)
                {
                    result =  integerRepresentationTwo-integerRepresentationOne; 
                }
                else
                {
                    result = integerRepresentationOne - integerRepresentationTwo; 

                }
                break;

                // When we have 3 , 81,1 and operators +,- if we read number1=1 and number2=81 and substract in that order we will get -80
                // So for substraction we need to
              
        }
    
        console.log(`operator: ${operator}, number1: ${number1}, number2: ${number2}, result: ${result}`);
        setResultString(String(result))
        return String(result);
    };
    
    
      
        



    const handleEqualsClick = () => {
        doCalculation(inpuString); // Use inputString from state
      };

  
    const clearResult =()=>{
        setInputString("")
        setResultString("")

    }




    const displayResult=(e:any)=>{
        setResultString(e.target.value)
    }


  return (
    <div className='relative'>
        <div className='absolute left-1/2 top-1/2'>
            <h2 className=' text-teal-300'>Answer</h2>
            <h1 className='text-teal-300 ' >{inpuString}</h1>
            <h1 className='text-teal-300 '>{resultString}</h1>
        </div>
  
    <div className='relative  left-48 top-32 w-fit '>

        <div className='bg-white w-fit'>
            <button className='size-32 border-2 border-gray-800  ' value='1' onClick={handleInput}>1</button>
            <button className='size-32 border-2 border-gray-800' value='2' onClick={handleInput}>2</button>
            <button className='size-32 border-2 border-gray-800' value='3' onClick={handleInput}>3</button>
            <button className='size-32 border-2 border-gray-800' value='/' onClick={handleInput}>/</button>
        </div>
        
        <div className='bg-white w-fit'>
        <button className='size-32 border-2 border-gray-800' value='4' onClick={handleInput}>4</button>
        <button className='size-32 border-2 border-gray-800' value='5' onClick={handleInput}>5</button>
        <button className='size-32 border-2 border-gray-800' value='6' onClick={handleInput}>6</button>
        <button className='size-32 border-2 border-gray-800' value='-' onClick={handleInput}>-</button>


        </div>
        
        <div className='bg-white w-fit'>
        <button className='size-32 border-2 border-gray-800' value='7' onClick={handleInput}>7</button>
        <button className='size-32 border-2 border-gray-800' value='8' onClick={handleInput}>8</button>
        <button className='size-32 border-2 border-gray-800' value='9' onClick={handleInput}>9</button>
        <button className='size-32 border-2 border-gray-800 w-500' value='+' onClick={handleInput}>+</button>
        
        </div>
        <div className='bg-white w-fit'>
            <button className='size-32 border-2 border-gray-800 ' value='0' onClick={handleInput}>0</button>
            <button className='size-32 border-2 border-gray-800' value='.' onClick={handleInput}>.</button>
            <button className='size-32 border-2 border-gray-800' value='=' onClick={handleEqualsClick}>=</button>
            <button className='size-32 border-2 border-gray-800' value='*' onClick={handleInput}>*</button>
            <button className='size-32 border-2 border-gray-800 bg-white ' value='Clear' onClick={clearResult}>Clear</button>

        </div>
       

   
        
       
    </div>
    



    </div>
   
    
    
  )
}

export default Calculator