import React, { useState, useRef, useEffect, useMemo } from 'react'
import './Budget.css'
import BasicPie from './BasicPie'
import './budgetSelectModal.css'
import DropDownIcon from '../../assets/icons/dropdown-icon.svg'
import EllipsePurple from '../../assets/icons/Ellipse-purple.svg'
import EllipseBlue from '../../assets/icons/Ellipse-blue.svg'
import PlusIcon from '../../assets/icons/plus-icon.svg'
import { useGetBudgetsByParams } from "../apollo-client/queries/getBudgetsByParams";
import { useGetBudgetCategories } from "../apollo-client/queries/getBudgetCategories";

const Budget = () => {
    const email = "moneybaggins@bigbanktakelilbank.doge";
    const { loading: loadingCategories, error: errorCategories, budgetCategoriesData } = useGetBudgetCategories(email);
    console.log("Fetched budgetCategoriesData:", budgetCategoriesData);
    const categories = loadingCategories || errorCategories ? [] : budgetCategoriesData || [];

    const [category, setCategory] = useState();
    const [month, setMonth] = useState(getCurrentMonth());
    const { loading, error, budgetsData } = useGetBudgetsByParams(month, category, email);
    // debugger;
    if (error) {
        console.error("Error fetching data:", error);
    }
    console.log("Fetched budgetData:", budgetsData);
    const pctRemaining = Math.round(budgetsData?.budgets[0]?.pctRemaining) || 'Loading...';
    const amount = budgetsData?.budgets[0]?.amount || 'Loading...';
    const amountRemaining = Math.round(budgetsData?.budgets[0]?.amountRemaining) || 'Loading...';

    // State to manage dropdown visibility
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [dropDownStyle, setDropdownStyle] = useState({}); // State to hold modal's dynamic style
    // references
    const dropdownRef = useRef(null); // Ref for the dropdown icon to position the modal
    const modalRef = useRef(null); // Add a ref for the modal

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
        const date = new Date();
        const year = date.getFullYear(); // Get current year
        let month = date.getMonth() + 1; // Get current month (0-11, hence +1)
        month = month < 10 ? `0${month}` : month; // Ensure month is in two digits
        return `${year}-${month}`; // Concatenate to get "YYYY-MM" format
    }

    useEffect(() => {
        if (categories.length > 0) {
            setCategory(categories[0]);
        }
    }, [categories]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // This effect does not depend on `categories`

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
                  {/* Dynamically generated modal content with options */}
                  {categories.length > 0 ? (
                      categories.map((category, index) => (
                        <div key={index} onClick={() => handleCategoryChange(category)}>{category}</div>
                        ))
                  ) : (
                      <div>No categories found.</div> // Or handle the empty state differently
                  )}
              </div>
          )}
      </header>
        <summary className='budget-pie-chart'>
            <BasicPie
                data={[
                    { id: 0, value: (100 - pctRemaining) },
                    { id: 1, value: pctRemaining },
                ]}
            />
        </summary>
        <section className='budget-percentage-breakdown'>
            <div className='percentage-container'>
                <div className='percentage-description'>
                    <img src={EllipsePurple} alt='purple ellipse'/>
                    <p>budget remaining</p>
                </div>
                <p className='percentage'>{pctRemaining}%</p>
            </div>
            <div className='percentage-container'>
          <div className='percentage-description'>
            <img src={EllipseBlue} alt='purple ellipse' />
            <p>budget used</p>
          </div>
          <p className='percentage'>{100 - pctRemaining}%</p>
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