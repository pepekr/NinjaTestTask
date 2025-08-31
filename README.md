# NinjaTestTask
This project is a full-stack application with a React frontend and a Node.js/Express backend, optimized for efficient handling of images and information. Images are stored in AWS S3 and loaded only when necessary, ensuring a responsive client experience even with large datasets.

Features

Optimized data handling – Image requests are separated from general data requests to improve performance. Only essential information is loaded initially, while images are fetched on demand.

Cloud storage for scalability – Images are stored in AWS S3 to reduce client load and allow the application to scale efficiently.

Lazy-loading images – Images are fetched only when displayed, minimizing memory usage and improving responsiveness.

Predictable ordering – A createdAt field is used for images and objects to ensure consistent sorting and predictable display order.

Environment Variables
Frontend (.env)

VITE_BACKEND_API_URL=http://example

Backend (.env)

DATABASE_URL=postgresql://postgres:password@localhost:5432/dbname

AWS_ACCESS_KEY=your_s3_access_key

AWS_SECRET_ACCESS_KEY=your_s3_secret_key

AWS_BUCKET_NAME=your_bucket_name

AWS_REGION=eu-north-1

FRONTEND_URL=http://example


Running the Project

To run both frontend and backend concurrently:
cd server npm run dev
cd client npm run dev

This will start the backend server and the frontend development server.
