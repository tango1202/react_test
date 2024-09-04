import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from "react-router-dom";

// id 목록을 표시합니다.
// localhost:3000/list
const List = () => {
  return (
    <div>
      <li>
        <Link to='/desc/id-01'>{'id-01'}</Link>
      </li>
      <li>
        <Link to='/desc/id-02'>{'id-02'}</Link>
      </li>
    </div>
  );
};

// url로 전달된 :id 값을 읽고 그값을 출력합니다.
// localhost:3000/desc/XXXX
const Desc = () => {
  const {id} = useParams();
  return (
    <div>
      { id && 
        <div>{`${id}를 선택하셨습니다.`}</div> 
      }
    </div>
  );
};

// about 내용을 표시합니다.
// localhost:300/about
const About = () => {
  return (
    <div>{'About Page입니다.'}</div>
  );
};

// 홈, 목록, About을 표시하고 클릭시 해당 컴포넌트를 보여줍니다.
// 홈(localhost:3000)
// 목록(localhost:3000/list) 
// About(localhost:3000/about) 
const MyRouter = () => {
 
  return (
    <BrowserRouter>
      <div>
        <Link to ='/'><button>{'홈'}</button></Link>
        <Link to ='/list'><button>{'목록'}</button></Link>
        <Link to ='/about'><button>{'About'}</button></Link>
      </div>
      <Routes>
        {/* #1. 정의하지 않으면, No routes matched location 경고 발생 */}
        {/* http://localhost:3000 */}
        <Route path='/' element={<Navigate replace to={"/"} />}/> 

        {/* http://localhost:3000/List */}
        <Route path='/list' element={<List />}/>

        {/* #2 */}
        {/* http://localhost:3000/Desc/id-01 */}
        {/* http://localhost:3000/Desc/id-02 */}
        <Route path='/desc/:id' element={<Desc />}/>

        {/* http://localhost:3000/about */}
        <Route path='/about' element={<About/>}/>
      </Routes>
    </BrowserRouter>
  );
};
export default MyRouter;
