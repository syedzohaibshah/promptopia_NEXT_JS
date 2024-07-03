'use client';

import { useChat } from 'ai/react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import CopyToClipboard from './copy-to-clipboard';
import { SendHorizontalIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const ref = useRef(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const isSignedIn = true; // Placeholder for the actual sign-in status
  const isLoading = false; // Placeholder for loading state
  const isLoaded = true; // Placeholder for loaded state

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  return (
    <section className='py-12 text-zinc-700 w-full'>
      <div className='container mx-auto max-w-4xl px-4'>
        {/* Credits section */}
        <div className='flex items-center justify-between px-1'>
          <h1 className='logo-text text-4xl  font-bold'>Promtify Bot</h1>
        </div>

        {/* Chat area */}
        <div className='mt-6 w-full'>
          <ScrollArea className='mb-4 h-[400px] rounded-md border p-4 bg-gray-50' ref={ref}>
            {messages.map((m) => (
              <div key={m.id} className='mr-6 whitespace-pre-wrap md:mr-12'>
                {m.role === 'user' && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='text-sm'>U</AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5'>
                      <p className='font-semibold'>You</p>
                      <div className='mt-1.5 text-sm text-zinc-500'>{m.content}</div>
                    </div>
                  </div>
                )}

                {m.role === 'assistant' && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='bg-emerald-500 text-white'>AI</AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5 w-full'>
                      <div className='flex justify-between'>
                        <p className='font-semibold'>Bot</p>
                        <CopyToClipboard message={m} className='-mt-1' />
                      </div>
                      <div className='mt-2 text-sm text-zinc-500'>{m.content}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>

          <form onSubmit={handleSubmit} className='relative'>
            <Input
              name='message'
              value={input}
              onChange={handleInputChange}
              placeholder={isSignedIn ? 'Ask me anything...' : 'Sign in to start...'}
              className='pr-12 w-full placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500'
            />
            <Button
              size='icon'
              type='submit'
              variant='secondary'
              disabled={isLoading || !isLoaded}
              className='absolute right-1 top-1 h-8 w-10'
            >
              <SendHorizontalIcon className='h-5 w-5 text-emerald-500' />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
