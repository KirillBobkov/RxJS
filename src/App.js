import logo from './logo.svg';
import './App.css';
import { interval, from } from 'rxjs';
import { filter, map, take, delay, mergeMap} from 'rxjs/operators'
import { useEffect, useState } from 'react';

const people = [
  {  name: 'Ivan', age: 22, id: 'Ivan' },
  {  name: 'Nadya', age: 15, id: 'Nadya' },
  {  name: 'Sergey', age: 76, id: 'Sergey' },
  {  name: 'Danila', age: 24, id: 'Danila' },
  {  name: 'Igor', age: 29, id: 'Igor' },
  {  name: 'Masha', age: 56, id: 'Masha' },
  {  name: 'Kirill', age: 23, id: 'Kirill' },
]

const numbersObservable = from(people);
const squaredNumbers = numbersObservable.pipe(
  mergeMap(value => {
    console.log('mergeMap', value);
    return from([value]).pipe(delay(100 * value.age))
  }),
  map(value => {
    console.log(value)
    return { ...value, age: value.age * 2 };
  })
)

function App() {
  const [currentNumber, setCurrentNumber] = useState(0)

  useEffect(() => {
   const subscription = squaredNumbers.subscribe(res => {
     console.log(res)
     setCurrentNumber(res)
    })

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
       {JSON.stringify(currentNumber)}
    </div>
  );
}

export default App;
