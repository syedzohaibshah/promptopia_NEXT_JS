

import Feed from '@components/Feed';
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
    <h1 className =" head_text text-center ">
      Discover & Share 
      <br className="max-md:hidden"/>
      <span className="orange_gradient text-center">AI-Powered Prompts</span>
    </h1>
    <p className="desc text-center">Lorem Ipsum is simply dummy text of the
     printing and typesetting industry. Lorem 
     Ipsum has been the industry's standard 
     dummy text ever since the 1500s, when
      an unknown printer.</p>

{/* Feed */}
<Feed/>
    </section>
  )
}
export default Home;