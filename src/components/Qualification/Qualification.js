import React from "react";
import './qualification.scss';
import AboutImg from '../../assets/images/about.jpg';

export const Qualification = () => {
  return(
    <section className="qualification section" id="qualification">
      <h2 className="section__title">Qualification</h2>
      <span className="section__subtitle">My personal journey</span>
      
      <div className="qualification__container container">
        <div className="qualification__tabs">
            <div className="qualification__button button--flex">
                <i className="uil uil-graduation-cap"></i>
            </div>
        </div>
      </div>
    </section>
 
  );
}

export default Qualification;