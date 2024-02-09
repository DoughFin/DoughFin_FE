import React, { useState, useRef, useEffect } from 'react'
import './Budget.css'
import BasicPie from './BasicPie'
import './budgetSelectModal.css'
import DropDownIcon from '../../assets/icons/dropdown-icon.svg'
import EllipsePurple from '../../assets/icons/Ellipse-purple.svg'
import EllipseBlue from '../../assets/icons/Ellipse-blue.svg'
import PlusIcon from '../../assets/icons/plus-icon.svg'
import { useGetBudgetsByParams } from "../apollo-client/queries/getBudgetsByParams";

const Budget = ({ email }) => {
    const [month, setMonth] = useState(getCurrentMonth());
    const [category, setCategory] = useState("travel");
    const { loading, error, budgetData } = useGetBudgetsByParams(month, category, email);
    // State to manage dropdown visibility
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [dropDownStyle, setDropdownStyle] = useState({}); // State to hold modal's dynamic style
    // references
    const dropdownRef = useRef(null); // Ref for the dropdown icon to position the modal
    const modalRef = useRef(null); // Add a ref for the modal
    // debugger;
    const pctRemaining = budgetData?.pctRemaining || 'Loading...';
    const amount = budgetData?.amount || 'Loading...';
    const amountRemaining = budgetData?.amountRemaining || 'Loading...';

    // Handler functions for updating state
    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
        setIsDropdownVisible(false); // Hide the modal
    };
    // Handler to toggle dropdown visibility
    const toggleDropdownVisibility = () => {
        setIsDropdownVisible(!isDropdownVisible);

        if (dropdownRef.current) {
            const { bottom, right } = dropdownRef.current.getBoundingClientRect();
            const rightOffset = window.innerWidth - right; // Calculate the right offset from the viewport

            setDropdownStyle({
                position: 'absolute',
                top: `${bottom}px`,
                right: `${rightOffset}px`,
                // Adjustments might be needed based on actual layout and styling
            });
        }
    };
    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };
    // Utility function to get current month, implementation depends on your needs
    function getCurrentMonth() {
        // Implementation for current month; e.g., using Date object
        return new Date().getMonth() + 1; // Adjust based on how months are indexed in your app
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };

        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

    return (
    <aside className='budget'>
      <header className='budget-header'>
        <h2>{category}</h2>
          <div ref={dropdownRef} onClick={toggleDropdownVisibility}>
              <img className='budget-dropdown-button' src={DropDownIcon} alt='dropdown icon'  />
          </div>
          {/* Conditionally render select dropdown */}
          {isDropdownVisible && (
              <div ref={modalRef} className="select-modal" style={dropDownStyle}>
                  {/* Modal content with options */}
                  <div onClick={() => handleCategoryChange('travel')}>travel</div>
                  <div onClick={() => handleCategoryChange('rent')}>rent</div>
                  <div onClick={() => handleCategoryChange('groceries')}>groceries</div>
                  {/* Add more options as needed */}
              </div>
          )}
      </header>
        <summary className='budget-pie-chart'>
            <BasicPie/>
        </summary>
        <section className='budget-percentage-breakdown'>
            <div className='percentage-container'>
                <div className='percentage-description'>
                    <img src={EllipsePurple} alt='purple ellipse'/>
                    <p>budget remaining</p>
                </div>
                <p className='percentage'>${pctRemaining}%</p>
            </div>
            <div className='percentage-container'>
          <div className='percentage-description'>
            <img src={EllipseBlue} alt='purple ellipse' />
            <p>budget used</p>
          </div>
          <p className='percentage'>{1.0 - pctRemaining}%</p>
        </div>
      </section>
      <section className='budget-details-container'>
        <div className='budget-details'>
          <h3 className='budget-details-h3'>budgeted amount</h3>
          <div className='budget-details-flex'>
            <p className='budget-details-amount'>${amount}</p>
          </div>
        </div>
        <div className='budget-details'>
          <h3 className='budget-details-h3'>remaining budget</h3>
          <div className='budget-details-flex'>
            <p className='budget-details-amount'>${amountRemaining}</p>
          </div>
        </div>
      </section>
      <section className='budget-categories-container'>
        <div className='budget-categories'>
          <h3 className='budget-categories-h3'>Add New Category</h3>
          <img className='budget-categories-add-button' src={PlusIcon} alt='dropdown icon' />
        </div>
      </section>
    </aside>
    )
    }
    export default Budget