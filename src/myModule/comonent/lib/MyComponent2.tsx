import {IMyData} from './MyData';

interface IProps {
  data:IMyData;
};
const MyComponent2 = (props:IProps) => {
  return <div>{`MyComponent2입니다. name = ${props.data.name}, addr = ${props.data.addr}`}</div>;
};

export {MyComponent2};