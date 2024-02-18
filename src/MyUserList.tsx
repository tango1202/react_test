const MyUserList = () => {
  // 데이터 입니다.
  const users = [
    { id: 0, name: 'Kim' },
    { id: 1, name: 'Lee' },
    { id: 2, name: 'Park' },
  ];

  // 데이터로 마크업을 만듭니다.
  const listItems = users.map((user) => {
    return <li key={user.id}>{user.name}</li>;
  });
  
  return <ul>{listItems}</ul>;
};
export default MyUserList;
