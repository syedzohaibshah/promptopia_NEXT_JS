import { connectToDB } from '@utils/database';

const databaseName = 'test'; // Replace 'test' with the name of the database you want to access



import Prompt from '@model/prompt';



export const GET = async (request,{params})=>{

    try{

        await connectToDB(databaseName);
        const prompts=await Prompt.find({
            creator: params.id
        }).populate('creator');

        return new Response(JSON.stringify(prompts),{
            status:200})
    }catch(error){


        return new Response("Failed to fetch all Prompts",{status:500})
    }

}


