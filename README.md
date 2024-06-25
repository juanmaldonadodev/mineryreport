
### Project Structure and Estimation
I am going to estimate in hours because it is a small project. If it were not, I would use T-shirt sizes.

In this case, the estimates could be:

-   S (Small effort): 2 hours
-   M (Medium effort): 3 hours
-   L (Large effort): 4 hours

1.  **Project Initialization (2 hours)**
    -   Set up a new Node.js project with Express.
	    - We use Node.js and express because it allows me to cover the requirement: *Every endpoint must respond with a JSON object and a status code, following the REST principles.*
    -   Install required dependencies (Express, Sequelize, PostgreSQL/MySQL).
    -   Configure Sequelize and connect to the database. **Add pool feature to handle multiple requests.** helping us to cover requirement:
*Concurrency: the API must be able to handle multiple requests simultaneously.*

-   It takes just 2 hours if the developer already knows how to install the dependencies and has experience with Sequelize
- We are not going to implement load balancer or Horizontal scaling by now because is not required until we understand the number of request that we receive.

 
2.  **Database Models creation  (2 hours)**
    -   Create models for Warehouse, Product, and Delivery.
    - We would not save routes as it seems not required
    - We should take into account that:
	    - Take in mind that each product is only available on a subset of warehouses, and the route must respect this constraint.
    - Warehouse table
	    - id : string 
	    - name : string 
	    - lat : float64
	    - lon : float64
    -  Product table
	    - id : string
	    - name : string
	    - warehouse_ids : []string, a list of the ids of the warehouses that contains this product
    - Delivery table
	    - product_ids: [] string  List  of  all  product  IDs
	    - lat: float64  Latitude  of  the  delivery  location
	    - lon: float64  Longitude  of  the  delivery  location
	    - delivery_date: string  Delivery  date
	    - warehouse_id: [] string  List  of  all  warehouse  IDs  associated  to  the  products  ids

3.  **Warehouse and Product Endpoints (2 hours)**
    -   Implement Warehouse Create and Read endpoints.
    -   Implement Product Create and Read endpoints.
    - Errors to handle: Error to save to database
    - Return response code 200 if everything is correct
    - Return response code 400 if error appears
    - Add unit test to test correct behavior and error for both endpoints
    
4.  **Delivery Endpoints (3 hours)**
    -   Implement Delivery endpoint
	    - In Params:
		    - product_ids, lat, lon, delivery_dat
	    - Steps to implement
		    - Find warehouses that contain all the required products
		    - Save the information in database
		    - Return error if the product is not available in the warehouses 
	     - Add unit test to test correct behavior and error for both endpoints
    - **Use Transactions for Critical Operations:** For operations that must be atomic, such as creating deliveries and ensuring the warehouse constraint, use transactions.
    - 
5.  **Route Calculation (4 hours)**
    - Implement Create Route endpoint.
	    - in params
		    - delivery_ids
	    - return
		    - route : A list of waypoints (latitude and longitude) that represents the optimal route to deliver all products. Those waypoints correspond to delivery locations and warehouses. 
		    - distance : Total distance of the route in km
    -  To calculate route. Implement route calculation logic.
	    - Group deliveries by warehouse
		    - Here we use the ids of the warehouses saved on database.
	    - Calculate waypoints based on the grouped deliveries
	    - Take into account delivery location as previous waypoint before return to the warehouse where the user should start the route
    -   
6.  **Write load Testing to test multiple requests (2 hours)**
    -   Test Creation of deliveries and routes at the same time

