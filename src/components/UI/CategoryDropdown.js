import React from 'react';
import { Form } from 'react-bootstrap';

const CategoryDropdown = ({ category, setCategory }) => {
  return (
    <Form.Group controlId="category">
      <Form.Label>Category</Form.Label>
      <Form.Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select a category</option>
        <option value="أجهزة تعقب">أجهزة تعقب</option>
        <option value="لوازم كهربائية">لوازم كهربائية</option>
        <option value="متنوعة">متنوعة</option>
      </Form.Select>
    </Form.Group>
  );
};

export default CategoryDropdown;
