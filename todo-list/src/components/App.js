import React from 'react'
import Header from '../containers/Header'
import MainSection from '../containers/MainSection'
import { useParams } from "react-router";

const App = () => {
  let {filter} = useParams([]);
  return (
    <div>
      <Header/>
      <MainSection
        filter={filter}
      />
    </div>
  )
}

export default App
