const MyButton = () => {
  function onClick() {
    alert('버튼을 클릭했습니다.');
  }

  return <button onClick={onClick}>클릭해 주세요.</button>;
};
export default MyButton;
