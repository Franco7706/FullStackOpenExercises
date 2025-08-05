import styled from 'styled-components'

export const NavBar = styled.div`
  background: #f8f9fa; /* A very light gray, common for navbars */
  border-bottom: 1px solid #e2e6ea; /* A subtle border to separate it from the content */
  color: #333; /* Darker text for contrast */
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
`

export const FullPage = styled.div`
  padding: 2rem 2rem 2rem 2rem
`

export const Hover = styled.span`
  &:hover {
    color: #007bff; /* A nice blue for hover effect */
  }
`

export const Button = styled.button`
  /* Core styles for all buttons */
  padding: 0.5rem 1.25rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none; /* In case you use it on an anchor tag */
  display: inline-block; /* Allows for padding on anchors */

  /* Default button colors */
  background-color: #e0e0e0;
  color: #333;

  &:hover {
    background-color: #d5d5d5;
  }
`

export const Input = styled.input`
  /* Core styles for all inputs */
  width: 50%; /* Makes the input fill its container */
  margin: 0rem 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1;
  color: #495057;
  background-color: #ffffff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    color: #495057;
    background-color: #f0ffff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

`

export const ListDiv = styled.div`
  background-color: #ffffff; /* White background */
  border-radius: 10px; /* Rounded corners */
  padding: 20px; /* Optional: adds some space inside the container */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: adds a subtle shadow */
  margin: 10px 0 10px 0
`

export const ListItem = styled.div`
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
`
export const StyledTable = styled.table`
  width: 100%; /* Make the table take full width of its container */
  border-collapse: collapse; /* Collapse borders to avoid double lines */
  font-family: Arial, sans-serif; /* Example font */
  color: #333; /* Darker text for readability */

  th,
  td {
    padding: 12px 15px; /* Padding inside cells */
    text-align: left; /* Align text to the left */
    border: 1px solid #e0e0e0; /* Soft, light gray border */
  }

  th {
    background-color: #f8f8f8; /* Slightly different background for headers */
    font-weight: bold;
    color: #555;
  }

  tr:nth-child(even) {
    background-color: #fcfcfc; /* Subtle stripe for readability on even rows */
  }

  tr:hover {
    background-color: #f0f0f0; /* Light hover effect on rows */
  }
`
