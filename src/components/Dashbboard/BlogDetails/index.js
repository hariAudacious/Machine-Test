import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.scss";
import Cookies from "js-cookie";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allBikeData, setAllBikeData] = useState([]);
  const cookieChecker = Cookies.get("Poc-User-Data");
  useEffect(() => {
    if (!cookieChecker) {
      navigate("/")
    }
    getData()
  }, [])
  const getData = async () => {
    const { data } = await axios.get(
      `http://localhost:3333/bikes/${id}`
    );
    setAllBikeData(data)
  }
  const handleClick = () => {
    navigate("/dashboard/list")
  }
  return (
    <div>
      <table id={styles["customers"]}>
        <tr>
          <td>1.</td>
          <td>Bike Name</td>
          <td>{allBikeData.bikeName}</td>
        </tr>
        <tr>
          <td>2.</td>
          <td>Company Name</td>
          <td>{allBikeData.companyName}</td>
        </tr>
        <tr>
          <td>3.</td>
          <td>Colors</td>
          <td>{allBikeData.colors}</td>
        </tr>
        <tr>
          <td>4.</td>
          <td>Mileage</td>
          <td>{allBikeData.mileage}</td>
        </tr>
        <tr>
          <td>5.</td>
          <td>Market Price</td>
          <td>{allBikeData.marketPrice}</td>
        </tr>
        <tr>
          <td>6.</td>
          <td>Weight</td>
          <td>{allBikeData.weight}</td>
        </tr>
        <tr>
          <td>7.</td>
          <td>Launching year</td>
          <td>{allBikeData.launchingYear}</td>
        </tr>
      </table>
      <button class={styles.button_64} onClick={handleClick}><span class="text"> Back To Home</span></button>
    </div>
  )
}
export default BlogDetails;