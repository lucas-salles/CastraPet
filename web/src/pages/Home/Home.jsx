import React, { useContext } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Helper/Loading";
import g_c from '../../images/g&c/g_c.jpg'
import Gato4 from '../../images/g&c/gato4.jpg'

import { UserContext } from "../../UserContext";

import "./home.css";

const Home = () => {
  const { loading } = useContext(UserContext);

  if (loading) return <Loading />;

  return (
    <>
      <Header titulo="Página Inicial" />

      <div id="page-home" className="container">
        <h1>Home</h1>
      </div>
      <div className="banner">
        <div>
          <img src={g_c}/>
        </div>
        <div>
        <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Nunc id dui urna. 
              Morbi purus elit, ornare eu nisi et, volutpat ornare mauris. 
              Aliquam tempus turpis felis. In tristique consectetur rhoncus. 
              Curabitur posuere vitae risus et mollis. 
              Integer aliquam sed nulla eu aliquam. Aliquam erat volutpat. 
              Suspendisse potenti.

              Sed accumsan erat non est porttitor auctor. 
              Morbi consequat, risus condimentum volutpat pulvinar, sem nisi porta arcu, nec tincidunt augue eros ut tellus. 
              Cras molestie volutpat nisl ut tincidunt. Sed eget sagittis leo. 
              Duis id suscipit urna. Nunc posuere erat et urna fringilla pellentesque. 
              Fusce sed ornare purus. Aenean at augue vehicula, feugiat justo ut, ultrices tortor. 
              Nulla dignissim pellentesque ligula. 
              Suspendisse eu auctor ante. Nam pretium turpis sit amet nulla viverra, non ultrices nunc dignissim.
            </p>
        </div>
      </div>
      <div className="fotos">
        <div>
          <img src={Gato4}/>
        </div>
        <div>
          <img src={Gato4}/>
        </div>
        <div>
          <img src={Gato4}/>
        </div>
      </div>
    </>
  );
};

export default Home;
