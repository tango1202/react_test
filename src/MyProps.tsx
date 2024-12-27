// #1. 속성의 인터페이스 입니다.
interface IProps {
  id: number;
  name: string;
}

// #2. 속성은 함수의 인자로 전달 받습니다.
const User = (props: IProps) => {
  const { id, name } = props; // #3. 구조 분해
  // id = 100; // #4. 속성은 수정할 수 있으나 하지 마세요.
  return (
    <div>
      id = {id} name = {name}
    </div>
  );
};

// #3-1. 함수 인자 선언시 바로 구조 분해할 수 있습니다.
// const User = ({id, name}: IProps) => {
//   return (
//     <div>
//       id = {id} name = {name}
//     </div>
//   );
// };

const MyProps = () => {
  // #5. User를 사용하려면 id와 name을 전달해야 합니다.
  return <User id={0} name={'Lee'} />;
};
export default MyProps;
