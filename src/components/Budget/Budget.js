import React, { useState } from 'react';
import axios from 'axios';
import './Budget.css';
import BasicPie from './BasicPie';
import DropDownIcon from '../../assets/icons/dropdown-icon.svg';
import EllipsePurple from '../../assets/icons/Ellipse-purple.svg';
import EllipseBlue from '../../assets/icons/Ellipse-blue.svg';
import PlusIcon from '../../assets/icons/plus-icon.svg';
import { TailSpin } from 'react-loader-spinner';

export default function Budget() {
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/graphql');
      const response = res.data;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  if (loading) {
    return <TailSpin color="white" radius="3px" />;
  }

  return (
    <aside className="budget">
      <header className="budget-header">
        <h2>Budget</h2>
        <img
          className="budget-dropdown-button"
          src={DropDownIcon}
          alt="dropdown icon"
        />
      </header>
      <summary className="budget-pie-chart">
        <BasicPie />
      </summary>
      <section className="budget-percentage-breakdown">
        <div className="percentage-container">
          <div className="percentage-description">
            <img src={EllipsePurple} alt="purple ellipse" />
            <p>Daily payment</p>
          </div>
          <p className="percentage">25%</p>
        </div>
        <div className="percentage-container">
          <div className="percentage-description">
            <img src={EllipseBlue} alt="purple ellipse" />
            <p>Hobby</p>
          </div>
          <p className="percentage">15%</p>
        </div>
      </section>
      <section className="budget-details-container">
        <div className="budget-details">
          <h3 className="budget-details-h3">Set Budget</h3>
          <div className="budget-details-flex">
            <p className="budget-details-amount">$200</p>
          </div>
        </div>
        <div className="budget-details">
          <h3 className="budget-details-h3">Remaining Budget</h3>
          <div className="budget-details-flex">
            <p className="budget-details-amount">$200</p>
          </div>
        </div>
      </section>
      <section className="budget-categories-container">
        <div className="budget-categories">
          <h3 className="budget-categories-h3">Add New Category</h3>
          <img
            className="budget-categories-add-button"
            src={PlusIcon}
            alt="dropdown icon"
          />
        </div>
      </section>
    </aside>
  );
}
