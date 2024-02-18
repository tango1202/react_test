function plus(a: number, b: number) {
  return a + b;
}
function minus(a: number, b: number) {
  return a - b;
}

describe('테스트입니다', () => {
  it('plus() 테스트', () => {
    expect(plus(1, 2)).toBe(3);
  });
  it('minus() 테스트', () => {
    expect(minus(1, 2)).toBe(-1);
  });
});

// 타입스크립트의 cannot be compiled under '--isolatedModules' 에러 회피용
export {};
