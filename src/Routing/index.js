import React from 'react'
import { Routes,Route } from 'react-router-dom'
import BlogDetails from '../components/Dashbboard/BlogDetails'
import BlogList from '../components/Dashbboard/BlogList'
import Login from '../components/Login'
import Signup from '../components/Signup'
const MachineTest = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard/list" element={<BlogList/>}/>
      <Route path="/dashboard/details/:id" element={<BlogDetails/>}/>
    </Routes>
    </>
  )
}
export default MachineTest