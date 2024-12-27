const MyUserList = () => {
  // 데이터 입니다.
  const users = [
    { id: 0, name: 'Kim' },
    { id: 1, name: 'Lee' },
    { id: 2, name: 'Park' },
  ];

  // 데이터로 마크업을 만듭니다.
  // 동적으로 생성되는 목록형 마크업은 꼭 유일한 값으로 구분되는 key 속성이 있어야 합니다.
  const listItems = users.map((user) => {
    return <li key={user.id}>{user.name}</li>;
  });

  return <ul>{listItems}</ul>;
};
export default MyUserList;
