
import axios from 'axios';


const url = 'http://localhost:3000/api/ask-openai';

interface data{
    data: {
        args: args; 
        companyHistory:string;
      };
}
interface args{
    companyHistory:string,
    symbol:string,
}

interface Completion {
    completion: {
      choices: Choices[]; 
    };
  }
  
  interface Choices {
    message: string;
    other: string;
  }
  

export const OpenAiCall = async (AI_query:string[]):Promise<data> => {
    const data = {
        query: AI_query,
      };


const response:data =  await axios.post(url, data)

if(!response ){
    console.log('Response:', response);
}

return response 

}