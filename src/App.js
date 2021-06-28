import Header from './components/header/Header';
import SideComp from './components/sidebar/SideComp';
import BlogDts from './components/blogs/BlogDts';

function App() {
  return (
    <div className="">
      <div><Header /></div>
      <div className="HmCvr0">
        <div className="it_fl HmLft_sd"><SideComp /></div>
        <div className="it_fl HmRgt_sd"><BlogDts /></div>
      </div>
    </div>
  )
}

export default App;
