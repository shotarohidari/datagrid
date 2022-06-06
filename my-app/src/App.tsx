import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import DataEditor, { GridCell, GridCellKind, GridColumn, Item } from '@glideapps/glide-data-grid';

const columns: GridColumn[] = [
  { title: "First Name", width: 100 },
  { title: "Last Name", width: 100 },
];
function getData([col, row]: Item): GridCell {
  //@ts-ignore
  const person = {firstName: "John", lastName: "Lenon"};

  if (col === 0) {
      return {
          kind: GridCellKind.Text,
          data: person.firstName,
          allowOverlay: false,
          displayData: person.firstName
      };
  } else if (col === 1) {
      return {
          kind: GridCellKind.Text,
          data: person.lastName,
          allowOverlay: false,
          displayData: person.lastName
      };
  } else {
      throw new Error();
  }
}
function App() {
  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch("https://stopcovid19.metro.tokyo.lg.jp/data/130001_tokyo_covid19_positive_cases_by_day_of_confirmation.csv");
      // const res = await fetch("https://api.github.com/users/octocat/orgs");
      const data =  await res.text();
      console.log(data);
      // const reader = new FileReader();
      // reader.readAsText(data);
      // reader.onload = (e:any) => {
      //   const content = e.target.result // ファイルの中身が取れます。
      //   console.log({content});
      // }
    }
    fetchData();
  })
  return (
    <div className="App">
      <DataEditor getCellContent={getData} columns={columns} rows={100} />
    </div>
  );
}

export default App;
