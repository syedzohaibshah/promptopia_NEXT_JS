
import { connectToDB } from '@utils/database';

const databaseName = 'test'; // Replace 'test' with the name of the database you want to access

import Prompt from '@model/prompt';



export const GET = async (request,{params})=>{

    try{

        await connectToDB(databaseName);
        const prompt=await Prompt.findById(params.id).populate('creator');
          if(!prompt) return new Response("Prompt not found",{status:404})
        return new Response(JSON.stringify(prompt),{
            status:200})
    }catch(error){


        return new Response("Failed to fetch all Prompts",{status:500})
    }

}


export const PATCH= async(request,{params})=>{

    const {prompt,tag}=await request.json();

    try{

        await connectToDB(databaseName);

        const existingPrompt= await Prompt.findById(params.id);
         if(!existingPrompt) return new Response("Prompt not found",{status:400})
   
            existingPrompt.prompt=prompt;
            existingPrompt.tag=tag;
            await existingPrompt.save();


            return new Response (JSON.stringify(existingPrompt),{status:200})

    }
    catch(error){
return new Response ("Failed to update prompt ",{status:500})


    }



}

export const DELETE =async (request ,{params})=>{


    try{

        await connectToDB(databaseName);
        const prompt=await Prompt.findByIdAndRemove(params.id);
        

        return new Response("Prmpt Deleted Suceesfully",{
            status:200})

    }
catch(error){


  return new Response("Failed to delete prompt",{status:500})

            
}
}