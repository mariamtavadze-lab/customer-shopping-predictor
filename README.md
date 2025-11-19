Customer Shopping Behavior Prediction 🛍️

Overview

This project analyzes customer shopping behavior data to predict the category of their next purchase (Clothing, Footwear, Accessories, or Outerwear). It consists of a Machine Learning model built with Python and an interactive Dashboard built with React.

Project Structure

1. The Machine Learning Model (customer_prediction_model.py)

Goal: Classify purchase categories based on Demographics (Age, Gender, Location) and Context (Season, Previous Purchases).

Algorithm: Random Forest Classifier.

Accuracy: ~[Insert Accuracy Here]% based on test data.

Libraries: pandas, scikit-learn, numpy.

2. The Interactive Dashboard (customer_prediction_app.jsx)

A React-based web interface that simulates the model's logic.

Allows users to input customer data via sliders and dropdowns.

Visualizes confidence intervals for predicted categories.

3. Data Inspection (data_inspection.py)

A utility script used to perform initial Exploratory Data Analysis (EDA).

Data Source

The dataset contains information on 3,900 customers, including:

Demographics: Age, Gender, Location.

Purchase History: Item Purchased, Category, Purchase Amount.

Context: Season, Subscription Status, Payment Method.

How to Run

Python Model

Install dependencies:

pip install pandas numpy scikit-learn


Place shopping_behavior_updated (1).csv in the root directory.

Run the script:

python customer_prediction_model.py


React Dashboard

This is a React component. To run it:

Set up a React environment (e.g., Vite or Create React App).

Install lucide-react and tailwindcss.

Import this component into your main App.js.