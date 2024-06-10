import Prompt from "@model/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from 'next/server';

export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();
    // In API route
 console.log('Received data:', { userId, prompt, tag });


       if (!userId) {
        console.error('Error: Missing userId');
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    if (!prompt) {
        console.error('Error: Missing prompt');
        return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    if (!tag) {
        console.error('Error: Missing tag');
        return NextResponse.json({ error: 'Missing tag' }, { status: 400 });
    }
// console.log('Creating prompt with data:', promptData);


    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}