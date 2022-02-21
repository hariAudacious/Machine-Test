import React, { useEffect, useState } from 'react';
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const BlogList = () => {
  const navigate = useNavigate()
  const [allBikeData, setAllBikeData] = useState([])
  const cookieChecker = Cookies.get("Poc-User-Data")
  useEffect(() => {
    getData()
    if (!cookieChecker) {
      navigate("/")
    }
  }, [])
  const getData = async () => {
    const { data } = await axios.get(
      `http://localhost:3333/bikes`
    );
    setAllBikeData(data)
  }
  const handleClick = () => {
    Cookies.remove('Poc-User-Data')
    navigate("/login")
  }
  return (<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">POC</span>
        <button className="btn btn-danger" onClick={handleClick} type="submit">Logout</button>
      </div>
    </nav>
    <div className='container'>
      <div className='row'>
        {allBikeData.map(({ bikeName, about, path, id }) => (
          <div className={`col-sm-4 ${styles.cardslist}`} key={bikeName}>
            <div className="card">
              <img src={path} className="card-img-top" alt="First Image of my card" />
              <div className="card-body">
                <h5 className="card-title">{bikeName}</h5>
                <p className={`card-text ${styles.details}`} >{about}</p>
                <Link to={`/dashboard/details/${id}`}><p className="btn btn-primary">More Info....</p></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>)
}
export default BlogList